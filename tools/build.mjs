/**
 * src/ から lib/client.js (DSH のクライアントバンドル) を生成する。
 *
 * DSH のブラウザ側モジュール機構は Node の解決を使わない。各プラグインの
 * `lib/client.js` は `window.__ModuleLoader__.load({ id, factory })` を呼ぶだけの
 * スクリプトで、factory は遅延実行される CommonJS 風の関数である。ここでは
 * バンドラを入れず、次の 3 つを連結してその形式を作る:
 *
 *   1. `src/locales/*.ja.json` を 1 つの `JA_DICTS` オブジェクトリテラルにする
 *   2. `src/client/plugin.js` から `export ` を外して factory 本体に展開する
 *   3. factory の末尾で createPlugin を呼び、exports に apply/inject を載せる
 *
 * 生成後はその場で VM 上で実行し、意図した登録が行われることを検証する。
 *
 * 使い方: node tools/build.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const LOCALES_DIR = join(root, 'src', 'locales')
const PLUGIN_SOURCE = join(root, 'src', 'client', 'plugin.js')
const REFERENCE = join(root, 'data', 'en-dictionaries.json')
const OUTPUT = join(root, 'lib', 'client.js')

/** 生成物の先頭に置く注意書き。 */
const BANNER = `/**
 * このファイルは tools/build.mjs が生成する。直接編集しないこと。
 * 編集するのは src/client/plugin.js と src/locales/*.ja.json。
 */`

const problems = []
const note = (message) => {
  problems.push(message)
  console.error(`  ✗ ${message}`)
}

/**
 * src/locales の `<namespace>.ja.json` をすべて読む。
 * @returns 名前空間 → 日本語辞書。
 */
function readDictionaries() {
  const dictionaries = {}
  const files = readdirSync(LOCALES_DIR)
    .filter((name) => name.endsWith('.ja.json'))
    .sort()
  for (const file of files) {
    const ns = file.slice(0, -'.ja.json'.length)
    const raw = readFileSync(join(LOCALES_DIR, file), 'utf8')
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch (error) {
      note(`${file}: JSON として読めない (${error.message})`)
      continue
    }
    const bad = Object.entries(parsed).filter(([, value]) => typeof value !== 'string')
    if (bad.length > 0) note(`${file}: 値が文字列でないキーがある (${bad.map(([k]) => k).join(', ')})`)
    dictionaries[ns] = parsed
  }
  if (Object.keys(dictionaries).length === 0) note('src/locales に *.ja.json が 1 つもない')
  return dictionaries
}

/**
 * 抽出済みの英語辞書と突き合わせて、名前空間とキーの誤りを見つける。
 * @param dictionaries - 検証する日本語辞書。
 */
function validateAgainstReference(dictionaries) {
  if (!existsSync(REFERENCE)) {
    console.warn(`  ! 参照辞書がないためキー検証を省略 (${REFERENCE})`)
    console.warn('    `npm run extract` で生成できる。')
    return
  }
  const reference = JSON.parse(readFileSync(REFERENCE, 'utf8'))
  for (const [ns, dict] of Object.entries(dictionaries)) {
    const known = reference.namespaces[ns]?.en
    if (known === undefined) {
      note(`名前空間 "${ns}" は抽出済みの一覧にない (綴り違いの可能性)`)
      continue
    }
    const unknown = Object.keys(dict).filter((key) => !(key in known))
    if (unknown.length > 0) {
      note(`名前空間 "${ns}" に存在しないキーがある: ${unknown.join(', ')}`)
    }
  }
}

/**
 * `export ` を外して factory 本体に展開できる形にする。
 * @param source - src/client/plugin.js の中身。
 * @returns 展開後のソース。
 */
function stripExports(source) {
  if (/^\s*export\s+default/m.test(source)) {
    throw new Error('plugin.js で `export default` は使えない (named export のみ)')
  }
  if (/^\s*import\s/m.test(source)) {
    throw new Error('plugin.js で `import` は使えない (バンドラを持たないため)')
  }
  return source.replace(/^export\s+(?=(const|let|var|function|class)\s)/gm, '')
}

/**
 * 生成したバンドルを VM で実行し、登録内容がソースの意図と一致するか確かめる。
 * @param code - 生成した lib/client.js。
 * @param packageName - 期待するモジュール id。
 * @param dictionaries - 期待する日本語辞書。
 */
function verifyBundle(code, packageName, dictionaries) {
  let row = null
  const sandbox = { console: { log() {}, warn() {}, error() {}, info() {} } }
  sandbox.window = sandbox
  sandbox.self = sandbox
  sandbox.globalThis = sandbox
  sandbox.window.__ModuleLoader__ = { load(captured) { row = captured } }

  vm.runInNewContext(code, sandbox, { filename: OUTPUT, timeout: 5000 })
  if (row === null) throw new Error('__ModuleLoader__.load が呼ばれていない')
  if (row.id !== packageName) throw new Error(`モジュール id が違う: ${row.id} !== ${packageName}`)

  const React = { createElement: (...args) => ({ args }), memo: (x) => x }
  const exports = row.factory((spec) => {
    if (spec === 'react') return React
    throw new Error(`想定外の require: ${spec}`)
  })

  const languages = []
  const registrations = []
  const slots = []
  const ctx = {
    effect: (fn) => fn(),
    locale: {
      addLanguage: (input) => {
        languages.push(input)
        return () => {}
      },
      register: (ns, locale, dict) => {
        registrations.push({ ns, locale, dict })
        return () => {}
      },
    },
    slots: {
      inject: (name, callback) => {
        callback()
        slots.push(name)
        return () => {}
      },
      register: (options, component) => {
        slots.push(options.id)
        if (typeof component !== 'function') throw new Error('設定行のコンポーネントが関数でない')
        return () => {}
      },
    },
  }

  if (typeof exports.apply !== 'function') throw new Error('exports.apply がない')
  if (!Array.isArray(exports.inject)) throw new Error('exports.inject がない')
  exports.apply(ctx)

  const language = languages.find((entry) => entry.id === 'ja')
  if (language === undefined) throw new Error('言語 "ja" が追加されていない')
  if (language.label !== '日本語') throw new Error(`言語ラベルが違う: ${language.label}`)
  if (language.fallback !== 'en') throw new Error(`フォールバックが違う: ${language.fallback}`)

  for (const [ns, expected] of Object.entries(dictionaries)) {
    const found = registrations.find((entry) => entry.ns === ns && entry.locale === 'ja')
    if (found === undefined) throw new Error(`名前空間 "${ns}" の日本語辞書が登録されていない`)
    const actual = JSON.stringify(found.dict)
    if (actual !== JSON.stringify(expected)) throw new Error(`名前空間 "${ns}" の辞書がソースと一致しない`)
  }
  for (const locale of ['en', 'zh', 'ja']) {
    const found = registrations.find((entry) => entry.ns === 'localeJa' && entry.locale === locale)
    if (found === undefined) throw new Error(`自前の名前空間 "localeJa" の ${locale} 辞書が登録されていない`)
  }

  return {
    languages: languages.length,
    namespaces: registrations.length,
    keys: registrations.reduce((total, entry) => total + Object.keys(entry.dict).length, 0),
    slots,
  }
}

/** メイン。 */
function main() {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  console.log(`パッケージ: ${pkg.name}`)

  const dictionaries = readDictionaries()
  console.log(`名前空間: ${Object.keys(dictionaries).length}`)
  validateAgainstReference(dictionaries)

  const pluginSource = stripExports(readFileSync(PLUGIN_SOURCE, 'utf8'))
  const dictLiteral = JSON.stringify(dictionaries, null, 2)

  const code = [
    BANNER,
    '',
    `window.__ModuleLoader__.load({`,
    `\tid: ${JSON.stringify(pkg.name)},`,
    `\tfactory: (require) => {`,
    `\t\tvar module = { exports: {} };`,
    `\t\tvar exports = module.exports;`,
    `\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });`,
    '',
    `\t\tconst React = require("react");`,
    `\t\tconst h = React.createElement;`,
    `\t\tconst JA_DICTS = ${dictLiteral.replace(/\n/g, '\n\t\t')};`,
    '',
    pluginSource
      .split('\n')
      .map((line) => (line.length === 0 ? '' : `\t\t${line}`))
      .join('\n'),
    '',
    `\t\tconst plugin = createPlugin({ React, h, dictionaries: JA_DICTS });`,
    `\t\texports.apply = plugin.apply;`,
    `\t\texports.inject = plugin.inject;`,
    `\t\treturn module.exports;`,
    `\t}`,
    `});`,
    '',
  ].join('\n')

  console.log('生成したバンドルを検証中…')
  const summary = verifyBundle(code, pkg.name, dictionaries)
  console.log(
    `  ✓ 言語 ${summary.languages} / 名前空間 ${summary.namespaces} / 訳語 ${summary.keys} 件 / スロット ${summary.slots.join(', ')}`,
  )

  if (problems.length > 0) {
    console.error(`\n検証で ${problems.length} 件の問題が見つかったため出力を中止した。`)
    process.exit(1)
  }

  mkdirSync(dirname(OUTPUT), { recursive: true })
  writeFileSync(OUTPUT, code)
  console.log(`\n出力: ${OUTPUT}`)
}

main()
