/**
 * 実物のロケールランタイムに対して、生成したバンドルが期待どおり効くかを確認する。
 *
 * インストール済みの `@deepseek-ai/dsh-client-locale` のバンドルを VM 上に読み込み、
 * その `LocaleRuntime` をそのまま使って、このパックの登録と翻訳結果を検証する。
 * ブラウザを起動せずに「日本語が選ばれ、訳語が返り、無いキーは英語に落ちる」ところ
 * まで確かめられる。
 *
 * 使い方:
 *   node tools/verify-locale.mjs [--dsh-modules <path>]
 */
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import { findDshModules } from './dsh-modules.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

const args = process.argv.slice(2)
const argOf = (name, fallback) => {
  const index = args.indexOf(name)
  return index >= 0 && args[index + 1] !== undefined ? args[index + 1] : fallback
}

let MODULES_ROOT
try {
  MODULES_ROOT = findDshModules({ explicit: argOf('--dsh-modules', process.env.DSH_MODULES_ROOT) }).path
} catch (error) {
  console.warn(`DSH が見つからないため検証を省略します。\n${error.message}`)
  process.exit(0)
}

const LOCALE_BUNDLE = join(MODULES_ROOT, 'dsh-client-locale', 'lib', 'client.js')
const PACK_BUNDLE = join(root, 'lib', 'client.js')
const REFERENCE = join(root, 'data', 'en-dictionaries.json')

if (!existsSync(LOCALE_BUNDLE)) {
  console.warn(`ロケール本体が見つからないため検証を省略: ${LOCALE_BUNDLE}`)
  process.exit(0)
}
if (!existsSync(PACK_BUNDLE)) {
  console.error(`先に \`npm run build\` を実行すること (${PACK_BUNDLE} が無い)`)
  process.exit(1)
}

/** materialize 時の require をすべて受け止めるスタブ。 */
function makeStub(name) {
  const target = function stub() {}
  return new Proxy(target, {
    get(t, prop) {
      if (prop === '__esModule') return true
      if (prop === Symbol.toStringTag) return 'Module'
      if (prop === 'then') return undefined
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

/**
 * `window.__ModuleLoader__.load({ id, factory })` 形式のバンドルを読み、factory を materialize する。
 * @param path - バンドルのパス。
 * @returns バンドルの exports。
 */
function loadBundle(path) {
  let row = null
  const sandbox = { console }
  sandbox.window = sandbox
  sandbox.self = sandbox
  sandbox.globalThis = sandbox
  sandbox.window.__ModuleLoader__ = {
    load(captured) {
      row = captured
    },
  }
  vm.runInNewContext(readFileSync(path, 'utf8'), sandbox, { filename: path, timeout: 5000 })
  if (row === null) throw new Error(`${path}: __ModuleLoader__.load が呼ばれていない`)
  const jsx = () => ({})
  const react = { createElement: jsx, memo: (x) => x, Fragment: Symbol('Fragment') }
  return row.factory((spec) => {
    if (spec === 'react') return react
    if (spec === 'react/jsx-runtime' || spec === 'react/jsx-dev-runtime') {
      return { jsx, jsxs: jsx, Fragment: Symbol('Fragment') }
    }
    return makeStub(spec)
  })
}

const failures = []
const checks = []
/**
 * 1 件の期待値を確認する。
 * @param label - 表示名。
 * @param actual - 実際の値。
 * @param expected - 期待値。
 */
function check(label, actual, expected) {
  const ok = actual === expected
  checks.push({ label, actual, expected, ok })
  if (!ok) failures.push(`${label}: 実際=${JSON.stringify(actual)} 期待=${JSON.stringify(expected)}`)
}

const localeExports = loadBundle(LOCALE_BUNDLE)
if (typeof localeExports.LocaleRuntime !== 'function') {
  console.warn('この版の dsh-client-locale は LocaleRuntime を公開していないため検証を省略する。')
  process.exit(0)
}

// --- 1. 日本語ブラウザを装って、実物のランタイムを組み立てる --------------------
const emitted = []
const runtimeContext = {
  effect: (fn) => (typeof fn === 'function' ? fn() : undefined),
  emit: (event, payload) => emitted.push({ event, payload }),
  on: () => () => {},
  logger: { debug() {}, info() {}, warn() {}, error() {} },
}
const runtime = new localeExports.LocaleRuntime(runtimeContext, undefined, {
  languages: ['ja-JP', 'ja', 'en-US'],
  preference: null,
})

const reference = JSON.parse(readFileSync(REFERENCE, 'utf8'))
const registerFirstParty = (ns) => {
  const { en, zh } = reference.namespaces[ns]
  runtime.register(ns, { en, zh })
}
registerFirstParty('common')
registerFirstParty('settings.locale')
registerFirstParty('settings.models')
registerFirstParty('settings.pluginInventory')
registerFirstParty('conversation')
// このパックが訳していない名前空間の代わり。英語フォールバックの確認に使う。
// 実在の名前空間を選ぶと訳すたびに差し替えることになるため、検証用の名前空間を登録する。
runtime.register('verifyFallback', { en: { sample: 'English only' }, zh: { sample: '中文のみ' } })

check('パック適用前は英語', runtime.getLocale().active, 'en')
check('パック適用前の言語数', runtime.getLocale().locales.length, 2)

// --- 2. このパックを実物のランタイムに適用する --------------------------------
const packExports = loadBundle(PACK_BUNDLE)
const slots = []
const packContext = {
  effect: (fn) => fn(),
  locale: runtime,
  slots: {
    inject: (name, callback) => {
      callback()
      slots.push(name)
      return () => {}
    },
    register: (options) => {
      slots.push(options.id)
      return () => {}
    },
  },
}
packExports.apply(packContext)

const snapshot = runtime.getLocale()
check('日本語ブラウザでは ja が自動選択される', snapshot.active, 'ja')
check('言語一覧に ja が増える', snapshot.locales.length, 3)
check('言語ラベルは日本語表記', snapshot.locales.find((row) => row.id === 'ja')?.label, '日本語')
check('locale/change が発火している', emitted.length > 0, true)
check('設定行が登録される', slots.includes('locale-ja'), true)

// --- 3. 訳語が返るか ----------------------------------------------------------
const t = (ns, key, params) => runtime.bind(ns)(key, params)
check('common の訳語', t('common', 'cancel'), 'キャンセル')
check('common の記号系の訳語', t('common', 'close'), '閉じる')
check('settings の訳語', t('settings', 'trigger'), '設定')
check('settings.models の訳語', t('settings.models', 'nav'), 'モデル')
check('settings.theme の訳語', t('settings.theme', 'appearance.dark'), 'ダーク')
check('settings.permission の訳語', t('settings.permission', 'preset.readOnly'), '読み取りのみ')
check('conversation の訳語', t('conversation', 'input.send'), 'メッセージを送信')
check('conversation の日付単位', t('conversation', 'detail.days', { count: 3 }), '3 日')
check('chat の完了形', t('chat', 'message.stepProcess.done.read'), 'ファイルを読み取りました')
check('trajectory の訳語', t('trajectory', 'view.trajectory'), '軌跡')
check('job の訳語', t('job', 'status.running'), '実行中')
check('subagent の訳語', t('subagent', 'mode.oneShot'), '単発')
check('deliverables の訳語', t('deliverables', 'row.title'), 'ファイルを提示')
check('sidebarRight の訳語', t('sidebarRight', 'tab.guide.title'), 'スタート')
check('sidebarFiles の訳語', t('sidebarFiles', 'guide.title'), 'ワークスペースのファイル')
check('sidebarTerminal の訳語', t('sidebarTerminal', 'new'), '新しいターミナル')
check('question の訳語', t('question', 'action.next'), '次へ')
check('model の訳語', t('model', 'menu.model'), 'モデル')
check('feedback の訳語', t('feedback', 'category.other'), 'その他')
check('pluginManager の訳語', t('pluginManager', 'installRun'), 'インストール')
check('sidebarBrowser の訳語', t('sidebarBrowser', 'guide.title'), 'ブラウザー')
check('sidebarDocumentPreview の訳語', t('sidebarDocumentPreview', 'loadMore'), 'さらに読み込む')
check('sidebarCodePreview の訳語', t('sidebarCodePreview', 'title'), 'コード')
check('documentMarkdown の訳語', t('documentMarkdown', 'footnotes'), '脚注')
check('documentHtml の訳語', t('documentHtml', 'title'), 'HTML')
check('sidebarOffice の訳語', t('sidebarOffice', 'missingFontsTitle'), '不足しているフォント')
check('sidebarExcel の訳語', t('sidebarExcel', 'charts'), 'グラフ')
check('sidebarPdf の訳語', t('sidebarPdf', 'zoomFitWidth'), '幅に合わせる')
check('sidebarImage の訳語', t('sidebarImage', 'title'), '画像')
check('cordis の訳語', t('cordis', 'action.approve'), '許可')
check('plan の訳語', t('plan', 'chip.label'), '計画')
check('goal の訳語', t('goal', 'action.clear'), 'ゴールをクリア')
check('open-in-app の訳語', t('open-in-app', 'open.tooltip'), 'ローカルで開く')
check('approval の訳語', t('approval', 'allowOnce'), '1 回だけ許可')
check('sidebar の訳語', t('sidebar', 'panels.label'), 'グローバルパネル')
check('skill の訳語', t('skill', 'row.title'), 'スキル')
check('workflowRun の訳語', t('workflowRun', 'status.completed'), '完了')
check('directory-browser の訳語', t('directory-browser', 'browser.create'), '作成')
check('reference の訳語', t('reference', 'crumb.root'), 'ワークスペース')
check('session-log-download の訳語', t('session-log-download', 'menu.download'), 'セッションログをダウンロード')
check('workspace の訳語', t('workspace', 'section.workspaces'), 'ワークスペース')
check('agent-team の訳語', t('agent-team', 'tasks'), '共有タスク')
check('schedule.catalog の訳語', t('schedule.catalog', 'frequency.once'), '1 回のみ')
check('schedule.manager の訳語', t('schedule.manager', 'rule.save'), '変更を保存')
check(
  'プレースホルダの置換',
  t('settings.pluginInventory', 'metadataError', { error: 'E' }),
  'パッケージメタデータのエラー: E',
)
check(
  '複数プレースホルダの置換',
  t('conversation', 'detail.output.lines', { total: 9, begin: 1, end: 3 }),
  '9 行中 1–3 行',
)
check(
  '日本語に無い名前空間は英語へフォールバック',
  t('verifyFallback', 'sample'),
  'English only',
)
check('どの辞書にも無いキーはキー自身を表示', t('common', 'no.such.key'), 'no.such.key')
check('resolveText が ja を返す', runtime.resolveText({ en: 'Settings', ja: '設定' }), '設定')

// --- 4. 言語を切り替えると訳語も切り替わるか ----------------------------------
runtime.setLocale('en')
check('en に切り替えると英語', t('common', 'cancel'), 'Cancel')
runtime.setLocale('zh')
check('zh に切り替えると中国語', t('common', 'cancel'), '取消')
runtime.setLocale('ja')
check('ja に戻すと日本語', t('common', 'cancel'), 'キャンセル')
check('未知の言語は拒否される', (() => {
  try {
    runtime.setLocale('fr')
    return 'no-throw'
  } catch (error) {
    return error.message.includes('not registered') ? 'throws' : `unexpected: ${error.message}`
  }
})(), 'throws')

// --- 5. 後始末 (プラグイン無効化に相当) ---------------------------------------
const removeLanguage = runtime.addLanguage({ id: 'xx', label: 'Test', fallback: 'en' })
check('追加した言語が一覧に出る', runtime.getLocale().locales.length, 4)
removeLanguage()
check('破棄で言語が消える', runtime.getLocale().locales.length, 3)

// --- 結果 ---------------------------------------------------------------------
console.log('実物の LocaleRuntime に対する検証')
for (const item of checks) {
  console.log(`  ${item.ok ? '✓' : '✗'} ${item.label}`)
}
if (failures.length > 0) {
  console.error(`\n失敗 ${failures.length} 件:`)
  for (const failure of failures) console.error(`  ${failure}`)
  process.exit(1)
}
console.log(`\nすべて成功 (${checks.length} 項目)`)
