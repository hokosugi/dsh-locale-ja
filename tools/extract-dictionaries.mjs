/**
 * 既存の DSH クライアントプラグインから、英語(en)辞書を実物のバンドルから抽出する。
 *
 * 各パッケージの lib/client.js は window.__ModuleLoader__.load({ id, factory }) を
 * 呼ぶだけのスクリプトなので、VM 上にローダを用意し、factory を materialize して
 * exports.apply(ctx) をスタブ ctx で実行する。そのとき locale.register(ns, ...) に
 * 渡された内容をすべて記録する。
 *
 * 使い方:
 *   node tools/extract-dictionaries.mjs [--dsh-modules <path>] [--out <path>] [--allow-partial]
 *
 * 抽出できた名前空間が 0 件、または既存の記録より極端に少ないときは、場所の指定ミスや
 * 抽出の失敗を疑って**エラーで止まる** (空の辞書を書くと、DSH が消えたのか辞書が空に
 * なったのか区別できなくなる)。意図的に減らすときは `--allow-partial` を付ける。
 *
 * `--dsh-modules` を省略したときは、npm のグローバルルートと npx キャッシュから
 * `@deepseek-ai` のパッケージ群を自動で探す (環境変数 `DSH_MODULES_ROOT` でも指定できる)。
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { webcrypto } from 'node:crypto'
import vm from 'node:vm'
import { findDshModules } from './dsh-modules.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const argOf = (name, fallback) => {
  const i = args.indexOf(name)
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : fallback
}

const modules = findDshModules({ explicit: argOf('--dsh-modules', process.env.DSH_MODULES_ROOT) })
const MODULES_ROOT = modules.path
const OUT = argOf('--out', join(here, '..', 'data', 'en-dictionaries.json'))

/**
 * materialize 時に require される名前をすべて受け止めるスタブ。
 * バンドラの CJS interop (`__toESM`) は own property を列挙してコピーするため、
 * プロキシだけでは `react.memo` のような分割 import が undefined になる。
 * そのため react 系は own property を持つ実体として別途用意する。
 */
function makeStub(name, thenable = true) {
  const target = function stub() {}
  return new Proxy(target, {
    get(t, prop) {
      if (prop === '__esModule') return true
      if (prop === Symbol.toStringTag) return 'Module'
      // サービス呼び出しの戻り値は「await できる」必要がある。ただし解決値は
      // 非 thenable にして、await が無限に thenable を辿らないようにする。
      if (prop === 'then') {
        if (!thenable) return undefined
        return (resolve) => {
          try {
            resolve(makeStub(`${name}#resolved`, false))
          } catch {
            /* スタブなので失敗しない */
          }
        }
      }
      if (prop === 'catch') return () => makeStub(`${name}#caught`, false)
      if (prop === 'finally') return (fn) => (typeof fn === 'function' ? fn() : undefined)
      if (prop === Symbol.iterator) return undefined
      if (typeof prop === 'symbol') return undefined
      if (!(prop in t)) t[prop] = makeStub(`${name}.${String(prop)}`)
      return t[prop]
    },
    apply() {
      return makeStub(`${name}()`)
    },
    construct() {
      return makeStub(`${name}#new`)
    },
  })
}

/** React の API 面。own property なので __toESM のコピーに耐える。 */
const REACT_API = [
  'createElement', 'cloneElement', 'isValidElement', 'createContext', 'createRef',
  'forwardRef', 'memo', 'lazy', 'Fragment', 'StrictMode', 'Suspense', 'Children',
  'useState', 'useReducer', 'useEffect', 'useLayoutEffect',
  'useInsertionEffect', 'useMemo', 'useCallback', 'useRef', 'useContext', 'useId',
  'useSyncExternalStore', 'useTransition', 'useDeferredValue', 'useImperativeHandle',
  'useDebugValue', 'useOptimistic', 'startTransition', 'unstable_batchedUpdates',
]
/**
 * React のクラス面。`class X extends React.Component` を書いているバンドルがあり、
 * アロー関数は `extends` の親になれないため (実行すると materialize が失敗する)、
 * ここだけは本物のクラスとして用意する。
 */
class StubComponent {
  constructor(props) {
    this.props = props ?? {}
  }
  setState() {}
  forceUpdate() {}
  render() {
    return null
  }
}
class StubPureComponent extends StubComponent {}
StubComponent.prototype.isReactComponent = {}
function makeReactStub() {
  const api = { __esModule: true, Component: StubComponent, PureComponent: StubPureComponent }
  // アロー関数は `extends` の親になれないので、通常の関数にして呼び出しも継承も受ける。
  for (const key of REACT_API) if (!(key in api)) api[key] = function reactStub() {}
  api.Fragment = Symbol('Fragment')
  api.version = '18.3.1'
  api.default = api
  return api
}
function makeJsxStub() {
  const jsx = () => ({})
  return { __esModule: true, jsx, jsxs: jsx, jsxDEV: jsx, Fragment: Symbol('Fragment') }
}
function makeReactDomStub() {
  const api = { __esModule: true }
  for (const key of ['createPortal', 'flushSync', 'createRoot', 'hydrateRoot', 'unmountComponentAtNode', 'findDOMNode', 'render']) {
    api[key] = (...callArgs) => void callArgs
  }
  api.default = api
  return api
}

/** サービス面のスタブ。プロパティアクセスで関数を返し、呼ぶとスタブを返す。 */
function makeServiceStub(name) {
  return makeStub(name)
}

/**
 * settings/configForms のホスト (永続スコープ) スタブ。
 * `getSnapshot()` / `subscribe()` / `set()` を持つ実体にしておかないと、
 * 一部プラグインが apply の途中で undefined 参照で落ちる。
 */
function makeConfigHost() {
  return {
    getSnapshot: () => ({ value: undefined, revision: 0 }),
    subscribe: () => () => {},
    set: () => {},
    update: () => {},
    get: () => undefined,
    describe: () => makeConfigHost(),
    whileServed: (_schema, fn) => (typeof fn === 'function' ? fn(makeConfigHost()) : undefined),
  }
}

/**
 * 1 パッケージを読み込み、locale.register / addLanguage の呼び出しを記録する。
 * @returns {{registrations: Array, languages: Array, error: string|null}}
 */
function harvest(pkgDir, pkgName) {
  const entry = join(pkgDir, 'lib', 'client.js')
  if (!existsSync(entry)) return { registrations: [], languages: [], error: 'no lib/client.js' }

  const registrations = []
  const languages = []
  let captured = null

  class EventSourceStub {
    constructor() {}
    addEventListener() {}
    removeEventListener() {}
    close() {}
  }

  const sandbox = {
    console: { log() {}, warn() {}, error() {}, info() {}, debug() {}, trace() {} },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    queueMicrotask,
    Promise,
    Object,
    Array,
    Map,
    Set,
    WeakMap,
    WeakSet,
    JSON,
    Math,
    Date,
    Symbol,
    Error,
    TypeError,
    RangeError,
    String,
    Number,
    Boolean,
    RegExp,
    Intl,
    AbortController,
    AbortSignal,
    TextEncoder,
    TextDecoder,
    structuredClone,
    performance,
    crypto: webcrypto,
    EventSource: EventSourceStub,
    EventTarget,
    Event,
    CustomEvent,
    requestAnimationFrame: (fn) => setTimeout(fn, 0),
    cancelAnimationFrame: clearTimeout,
    getComputedStyle: () => ({ getPropertyValue: () => '' }),
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    document: undefined,
    navigator: undefined,
    window: undefined,
    globalThis: undefined,
  }
  sandbox.window = sandbox
  sandbox.self = sandbox
  sandbox.globalThis = sandbox
  sandbox.location = { href: 'http://localhost/', origin: 'http://localhost', pathname: '/', search: '' }
  sandbox.window.__ModuleLoader__ = {
    load(row) {
      captured = row
    },
  }

  try {
    vm.runInNewContext(readFileSync(entry, 'utf8'), sandbox, { filename: entry, timeout: 10_000 })
  } catch (error) {
    return { registrations, languages, error: `load failed: ${error.message}` }
  }
  if (captured === null || typeof captured.factory !== 'function') {
    return { registrations, languages, error: 'no __ModuleLoader__.load row captured' }
  }

  const reactStub = makeReactStub()
  const jsxStub = makeJsxStub()
  const reactDomStub = makeReactDomStub()
  const requireStub = (spec) => {
    if (spec === 'react') return reactStub
    if (spec === 'react/jsx-runtime' || spec === 'react/jsx-dev-runtime') return jsxStub
    if (spec === 'react-dom' || spec === 'react-dom/client') return reactDomStub
    return makeStub(spec)
  }

  let exports
  try {
    exports = captured.factory(requireStub)
  } catch (error) {
    return { registrations, languages, error: `materialize failed: ${error.message}` }
  }

  const record = {
    register(ns, localeOrDicts, dict) {
      if (typeof localeOrDicts === 'string') {
        registrations.push({ ns, locale: localeOrDicts, dict })
        return () => {}
      }
      for (const [locale, entries] of Object.entries(localeOrDicts ?? {})) {
        registrations.push({ ns, locale, dict: entries })
      }
      return () => {}
    },
    addLanguage(input) {
      languages.push(input)
      return () => {}
    },
    bind: () => (key) => key,
    resolveText: (text) => (typeof text === 'string' ? text : text?.en),
    getLocale: () => ({ active: 'en', locales: [], revision: 0 }),
    subscribe: () => () => {},
    setLocale: () => {},
  }

  const noop = () => () => {}
  const slots = makeStub('ctx.slots')
  slots.inject = () => () => {}
  slots.register = () => () => {}
  slots.entriesOfSlot = () => []
  slots.listSubTree = () => []
  slots.installLocale = () => {}
  slots.getLocale = () => ({ active: 'en', locales: [], revision: 0 })
  slots.subscribeLocale = () => () => {}

  const base = {
    locale: record,
    slots,
    effect: (fn) => {
      if (typeof fn !== 'function') return undefined
      let result
      try {
        result = fn()
      } catch {
        return undefined
      }
      // ジェネレータで書かれた効果は、登録を拾うために最後まで進める
      if (result && typeof result.next === 'function') {
        try {
          for (let step = 0; step < 200; step += 1) {
            const next = result.next()
            if (next.done) break
          }
        } catch {
          /* 途中で失敗しても、そこまでの登録は活かす */
        }
        return undefined
      }
      return result
    },
    on: () => noop(),
    once: () => noop(),
    provide: () => noop(),
    inject: (deps, cb) => (typeof cb === 'function' ? cb(base) : noop()),
    set: () => noop(),
    get: () => makeServiceStub('ctx.get()'),
    config: {},
    configForms: Object.assign(makeServiceStub('ctx.configForms'), {
      get: () => makeConfigHost(),
      describe: () => makeConfigHost(),
      whileServed: (_schema, fn) => (typeof fn === 'function' ? fn(makeConfigHost()) : undefined),
    }),
    remote: makeServiceStub('ctx.remote'),
    logger: { debug() {}, info() {}, warn() {}, error() {} },
    fiber: { uid: 1, dispose: noop(), runtime: { isolate: {} } },
  }
  const ctx = new Proxy(base, {
    get(target, prop) {
      if (prop in target) return target[prop]
      if (typeof prop === 'symbol') return undefined
      const stub = makeStub(`ctx.${String(prop)}`)
      target[prop] = stub
      return stub
    },
  })

  try {
    const result = exports?.apply?.(ctx, {})
    if (result && typeof result.then === 'function') result.catch(() => {})
  } catch (error) {
    return {
      registrations,
      languages,
      error: `apply failed after ${registrations.length} registrations: ${error.message}`,
    }
  }

  return { registrations, languages, error: null }
}

/**
 * 実行時 apply が途中で落ちて回収できなかった名前空間を、バンドル内の
 * 辞書リテラル (`const zh = { … }` / `const en = { … }`) から直接読む。
 * 対象は「Web の設定画面に出るのに apply が完走しない」名前空間だけに限る。
 */
const STATIC_FALLBACKS = [
  { package: 'dsh-client-ui-permission-presets', ns: 'settings.permission', zhConst: 'zh', enConst: 'en' },
  // ロケール本体は自前の LocaleRuntime インスタンスに登録するため、ctx スタブでは拾えない
  { package: 'dsh-client-locale', ns: 'common', zhConst: 'zh$1', enConst: 'en$1' },
  { package: 'dsh-client-locale', ns: 'settings.locale', zhConst: 'zh', enConst: 'en', after: '//#region lib/types/locales/settings.js' },
]

/**
 * バンドル中の `const <name> = { … }` を波括弧対応で切り出して評価する。
 * @param code - バンドルのソース。
 * @param name - 変数名。
 * @param after - この文字列より後ろから探す (同名 const の取り違え防止)。
 * @returns 評価したオブジェクト、見つからなければ null。
 */
function readConstObject(code, name, after) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = new RegExp(`const ${escaped} = \\{`).exec(after === undefined ? code : code.slice(code.indexOf(after)))
  if (match === null) return null
  const offset = after === undefined ? 0 : code.indexOf(after)
  const start = offset + match.index + match[0].length - 1
  let depth = 0
  let quote = null
  let index = start
  for (; index < code.length; index += 1) {
    const ch = code[index]
    if (quote !== null) {
      if (ch === '\\') index += 1
      else if (ch === quote) quote = null
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') quote = ch
    else if (ch === '{') depth += 1
    else if (ch === '}') {
      depth -= 1
      if (depth === 0) {
        index += 1
        break
      }
    }
  }
  try {
    return vm.runInNewContext(`(${code.slice(start, index)})`, {})
  } catch {
    return null
  }
}

/** メイン: モジュールルート配下の全パッケージを走査する。 */
function main() {
  // 非同期 apply の後始末が落ちても抽出を止めない
  process.on('unhandledRejection', () => {})
  process.on('uncaughtException', () => {})
  const names = readdirSync(MODULES_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()

  /** ns -> locale -> key -> text */
  const byNamespace = {}
  const byPackage = {}
  const languages = {}
  const problems = []

  for (const name of names) {
    const dir = join(MODULES_ROOT, name)
    if (!existsSync(join(dir, 'lib', 'client.js'))) continue
    const { registrations, languages: langs, error } = harvest(dir, name)
    if (error) problems.push({ package: name, error })
    for (const lang of langs) languages[`${name}:${lang.id}`] = lang
    if (registrations.length === 0) continue
    byPackage[name] = registrations.map((r) => ({ ns: r.ns, locale: r.locale }))
    for (const { ns, locale, dict } of registrations) {
      byNamespace[ns] ??= {}
      byNamespace[ns][locale] = typeof dict === 'object' && dict !== null ? dict : {}
    }
  }

  // apply が完走しないパッケージの辞書を、字句解析による直接読み取りで補完する
  for (const fallback of STATIC_FALLBACKS) {
    const entry = join(MODULES_ROOT, fallback.package, 'lib', 'client.js')
    if (!existsSync(entry)) continue
    const code = readFileSync(entry, 'utf8')
    const zh = readConstObject(code, fallback.zhConst, fallback.after)
    const en = readConstObject(code, fallback.enConst, fallback.after)
    if (en === null) continue
    byNamespace[fallback.ns] ??= {}
    if (zh !== null) byNamespace[fallback.ns].zh = zh
    byNamespace[fallback.ns].en = en
    byPackage[fallback.package] = [
      ...(byPackage[fallback.package] ?? []),
      { ns: fallback.ns, locale: 'en', source: 'static' },
    ]
  }

  // 抽出の失敗を「DSH の文言が変わった」と取り違えないための歯止め
  const namespaceCount = Object.keys(byNamespace).length
  const previousCount = existsSync(OUT)
    ? Object.keys(JSON.parse(readFileSync(OUT, 'utf8')).namespaces ?? {}).length
    : 0
  // ここは throw ではなく process.exit で止める: main() は抽出中の非同期例外を握りつぶす
  // ハンドラ (uncaughtException) を付けているため、throw は無言で消えてしまう。
  if (namespaceCount === 0) {
    console.error(
      [
        `名前空間を 1 つも抽出できませんでした: ${MODULES_ROOT}`,
        '  DSH の場所が正しいか確認してください (--dsh-modules / DSH_MODULES_ROOT)。',
        '  グローバルインストール (-g) は依存が dsh/node_modules にネストするため、',
        '  クライアントバンドルが見えません。プロジェクト内に入れてください。',
      ].join('\n'),
    )
    process.exit(1)
  }
  if (!args.includes('--allow-partial') && previousCount > 0 && namespaceCount < previousCount / 2) {
    console.error(
      [
        `抽出できた名前空間が ${namespaceCount} 件で、既存の記録 (${previousCount} 件) より極端に少ないです: ${MODULES_ROOT}`,
        '  場所の指定ミスや抽出の失敗を疑ってください (意図的に減らすなら --allow-partial)。',
      ].join('\n'),
    )
    process.exit(1)
  }

  const report = {
    // 実行したマシンのパスを持たせない (公開物と CI で差分にならないよう、見つけ方だけを記録する)
    generatedFrom: modules.kind,
    packageCount: Object.keys(byPackage).length,
    namespaces: byNamespace,
    languages,
    problems,
  }
  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`)

  const rows = Object.entries(byNamespace)
    .map(([ns, locales]) => ({
      ns,
      en: Object.keys(locales.en ?? {}).length,
      zh: Object.keys(locales.zh ?? {}).length,
      ja: Object.keys(locales.ja ?? {}).length,
    }))
    .sort((a, b) => b.en - a.en)
  const total = rows.reduce((sum, row) => sum + row.en, 0)
  console.log(`パッケージ: ${report.packageCount} / 名前空間: ${rows.length} / en キー合計: ${total}`)
  console.log('--- 名前空間別 en キー数 ---')
  for (const row of rows) {
    console.log(`${String(row.en).padStart(5)}  zh=${String(row.zh).padStart(4)}  ${row.ns}`)
  }
  if (problems.length > 0) {
    console.log(`--- 完全には実行できなかったパッケージ (${problems.length}) / 登録は部分採用 ---`)
    for (const p of problems) console.log(`${basename(p.package)}: ${p.error}`)
  }
  console.log(`\n出力: ${OUT}`)
}

main()
