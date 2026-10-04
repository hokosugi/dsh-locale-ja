/**
 * 日本語辞書の抜けと誤りを点検する。
 *
 *  - `data/en-dictionaries.json` (tools/extract-dictionaries.mjs の出力) を正解とし、
 *    名前空間の存在・キーの存在・プレースホルダ ({name}) の一致を検証する。
 *  - 未訳キーは英語にフォールバックするので「抜け」自体は正常だが、どの程度
 *    訳せているかを名前空間ごとに出し、次に訳すべき場所を示す。
 *  - `--strict` を付けると未訳を 1 件でもエラーにする (カバレッジ 100% を保つため、
 *    `npm run check` からはこちらを使う。DSH を更新して新キーが増えた時点で止まる)。
 *
 * 使い方:
 *   node tools/audit.mjs                 概要
 *   node tools/audit.mjs --missing <ns>   その名前空間の未訳キーを列挙
 *   node tools/audit.mjs --all            全名前空間の一覧
 *   node tools/audit.mjs --strict         未訳があれば失敗する
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const REFERENCE = join(root, 'data', 'en-dictionaries.json')
const LOCALES_DIR = join(root, 'src', 'locales')

const args = process.argv.slice(2)
const flagOf = (name) => {
  const index = args.indexOf(name)
  return index >= 0 ? (args[index + 1] ?? true) : undefined
}

if (!existsSync(REFERENCE)) {
  console.error(`参照辞書がない: ${REFERENCE}\n先に \`npm run extract\` を実行すること。`)
  process.exit(1)
}
const reference = JSON.parse(readFileSync(REFERENCE, 'utf8'))

/** src/locales/*.ja.json を読む。 */
const translated = {}
for (const file of readdirSync(LOCALES_DIR).filter((name) => name.endsWith('.ja.json')).sort()) {
  translated[file.slice(0, -'.ja.json'.length)] = JSON.parse(readFileSync(join(LOCALES_DIR, file), 'utf8'))
}

/** 文字列から `{name}` 形式のプレースホルダ名を集める。 */
const placeholdersOf = (value) => new Set([...String(value).matchAll(/\{(\w+)\}/g)].map((match) => match[1]))

/** 2 つの集合が等しいか。 */
const sameSet = (a, b) => a.size === b.size && [...a].every((value) => b.has(value))

/** 日本語らしい文字を含むか。 */
const japaneseOf = (value) => /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(value)

/**
 * 幅の狭い固定ガターに入るキーと、その上限 (全角文字何文字ぶんか)。
 *
 * 実例: 軌跡のタイムライン左のレーン名は幅 44px 固定・`white-space: nowrap` なしの
 * ガターに入る。英語と中国語は 1〜2 文字 (Input / 模型) なので収まるが、日本語で
 * 「モデル」のように 3 文字にすると 1 文字ずつ折り返して行が重なり、表示が壊れる。
 * 中国語の訳語と同じ長さに抑えるのが安全。
 */
const NARROW_KEYS = {
  trajectory: { 'column.input': 2, 'column.model': 2, 'column.tools': 2 },
}

/**
 * プリセットカードの見出しに並ぶバッジのキーと、その上限 (全角文字何文字ぶんか)。
 *
 * 実例: 設定 → 一般 → Agent プリセットのカードは `minmax(268px, 1fr)` で並び、
 * 見出しは [名前] [バッジ] [id] の 1 行に収まる。名前 (`cardName`) は縮められるが
 * バッジ (`Tag`) は `white-space: nowrap` で縮まないため、長いバッジは名前を
 * 押し出し、「標準モード」が 1 文字しか見えなくなる (2026-10-01 に修正)。
 *
 * 幅 268px のカードでの目安: 本文 236px − id (最大 35% ≒ 83px) − 隙間 12px = 名前と
 * バッジに 141px。名前「標準モード」が 15px で 75px、隙間 6px、バッジの左右の余白が
 * 17px なので、バッジの文字は 43px ≒ 全角 3.9 文字まで。名前を隠さない上限を 4 とする。
 */
const CARD_HEAD_KEYS = {
  'settings.agentPreset': { inUse: 4 },
}

/**
 * 用語の統一。短い UI ラベルは、同じ英語なら同じ日本語にする。
 *
 * 値が英語ラベルと完全一致したときだけ検査するので、文中に埋め込まれた語
 * (例: "Refresh current page") は対象外。文脈で意図的に訳し分けている語は
 * ここに入れない — `Inactive` (停止 / 非アクティブ / 終了)、`Model`
 * (軌跡のガターだけ「生成」)、`Once` (表示は「1 回のみ」・選択肢は「1 回」)、
 * `Ready` (開始可能 / 準備完了)、`Pending` (待機中 / 未着手)、
 * `Compact` (圧縮 / コンパクト)、`Stopped` (停止 / 停止しました)。
 */
const GLOSSARY = {
  Reload: '再読み込み',
  Refresh: '更新',
  Retry: '再試行',
  Cancel: 'キャンセル',
  Close: '閉じる',
  Delete: '削除',
  Uninstall: 'アンインストール',
  Copy: 'コピー',
  Copied: 'コピーしました',
  Collapse: '折りたたむ',
  Expand: '展開する',
  Approve: '承認',
  Decline: '拒否',
  Reject: '拒否',
  'Allow once': '1 回だけ許可',
  Preview: 'プレビュー',
  Archive: 'アーカイブ',
  Unarchive: 'アーカイブを解除',
  Pin: 'ピン留め',
  Unpin: 'ピン留めを解除',
  Running: '実行中',
  Failed: '失敗',
  Completed: '完了',
  Cancelled: 'キャンセル済み',
  Interrupted: '中断',
  Enabled: '有効',
  Rename: '名前を変更',
  Search: '検索',
  Clear: 'クリア',
  Loading: '読み込み中',
  Save: '保存',
  Edit: '編集',
  'New folder': '新しいフォルダー',
  'New session': '新しいセッション',
  'New Session': '新しいセッション',
}

/**
 * 全角 1 文字を 1、それ以外を 0.5 として数えた「表示幅」。
 * @param value - 辞書の値。
 * @returns 全角文字換算の長さ。
 */
function displayWidth(value) {
  let width = 0
  for (const char of String(value)) width += /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\uFF00-\uFF60\u3000-\u303F]/u.test(char) ? 1 : 0.5
  return width
}

/**
 * 複数行の値の「形」。`###` や `>` を含む値は Markdown として描画されるため、
 * 段落・見出し・引用の数が変わると見た目が崩れる。
 * @param value - 辞書の値。
 * @returns 形を表す文字列。単一行なら undefined。
 */
function multilineShape(value) {
  if (typeof value !== 'string' || !value.includes('\n')) return undefined
  return [
    `段落${value.split(/\n{2,}/).length}`,
    `見出し${(value.match(/^#{1,6} /gm) ?? []).length}`,
    `引用${(value.match(/^> /gm) ?? []).length}`,
    `行${value.split('\n').length}`,
  ].join('/')
}

/**
 * カバレッジをパーセントで表す。1 件残っただけで「100%」と出ると誤解を招くため、
 * 小数第 2 位まで見る (2420/2421 → 99.96%)。
 * @param ja - 訳済みキー数。
 * @param en - 全体のキー数。
 * @returns パーセント表記。
 */
function coverage(ja, en) {
  if (en === 0) return '100'
  return String(Math.round((ja / en) * 10000) / 100)
}

// ---- 指定名前空間の未訳キーを列挙するモード -------------------------------
const missingTarget = flagOf('--missing')
if (missingTarget !== undefined) {
  const ns = String(missingTarget)
  const en = reference.namespaces[ns]?.en
  if (en === undefined) {
    console.error(`抽出済みの一覧に名前空間 "${ns}" がない。`)
    process.exit(1)
  }
  const ja = translated[ns] ?? {}
  const missing = Object.keys(en).filter((key) => !(key in ja))
  console.log(`${ns}: ${Object.keys(ja).length} / ${Object.keys(en).length} 件訳済み`)
  for (const key of missing) console.log(`  ${key}\n    en: ${JSON.stringify(en[key])}`)
  process.exit(0)
}

// ---- 全名前空間の点検 -----------------------------------------------------
const errors = []
const rows = []
let totalEn = 0
let totalJa = 0

for (const [ns, locales] of Object.entries(reference.namespaces)) {
  const en = locales.en ?? {}
  const ja = translated[ns] ?? {}
  totalEn += Object.keys(en).length
  totalJa += Object.keys(ja).length

  const unknown = Object.keys(ja).filter((key) => !(key in en))
  const mismatched = []
  const identical = []
  const structure = []
  const glossary = []
  for (const [key, value] of Object.entries(ja)) {
    if (!(key in en)) continue
    // 用語の統一: 短い UI ラベル (英語と完全一致する値) は同じ日本語にする。
    const expected = GLOSSARY[en[key]]
    if (expected !== undefined && value !== expected) {
      glossary.push(`${key}: ja=${JSON.stringify(value)} 期待=${JSON.stringify(expected)}`)
    }
    if (!sameSet(placeholdersOf(value), placeholdersOf(en[key]))) {
      mismatched.push(`${key}: ja=${JSON.stringify(value)} en=${JSON.stringify(en[key])}`)
      continue
    }
    // 複数行の値は Markdown として描画される。段落・見出し・引用の数が変わると
    // 表示が崩れる (TSV を手で直すときに実際に起きやすい)。
    const jaShape = multilineShape(value)
    const enShape = multilineShape(en[key])
    if (jaShape !== enShape) {
      structure.push(`${key}: ja=${jaShape ?? '単一行'} en=${enShape ?? '単一行'}`)
      continue
    }
    if (value === en[key] && japaneseOf(value)) {
      // 日本語のはずの値が英語と同一 (訳し忘れ・コピペの疑い)
      identical.push(key)
    }
  }
  if (unknown.length > 0) errors.push(`名前空間 "${ns}" に存在しないキー: ${unknown.join(', ')}`)
  for (const item of mismatched) errors.push(`プレースホルダ不一致 ${ns} / ${item}`)
  for (const item of structure) errors.push(`複数行の構造が不一致 ${ns} / ${item}`)
  for (const item of glossary) errors.push(`用語が統一されていない ${ns} / ${item}`)
  for (const [key, limit] of Object.entries(NARROW_KEYS[ns] ?? {})) {
    const value = ja[key]
    if (value === undefined) continue
    const width = displayWidth(value)
    if (width > limit) {
      errors.push(
        `幅の狭いラベルが長すぎる ${ns} / ${key}: ${JSON.stringify(value)} (${width} > 上限 ${limit}) — 折り返して表示が崩れる`,
      )
    }
  }
  for (const [key, limit] of Object.entries(CARD_HEAD_KEYS[ns] ?? {})) {
    const value = ja[key]
    if (value === undefined) continue
    const width = displayWidth(value)
    if (width > limit) {
      errors.push(
        `カード見出しのバッジが長すぎる ${ns} / ${key}: ${JSON.stringify(value)} (${width} > 上限 ${limit}) — プリセット名が隠れる`,
      )
    }
  }

  rows.push({
    ns,
    en: Object.keys(en).length,
    ja: Object.keys(ja).length,
    shipped: translated[ns] !== undefined,
    identical,
  })
}

// ---- 出力 -----------------------------------------------------------------
const shipped = rows.filter((row) => row.shipped).sort((a, b) => b.en - a.en)
const rest = rows.filter((row) => !row.shipped).sort((a, b) => b.en - a.en)

console.log('このパックが対象にしている名前空間')
console.log('  名前空間                          訳済み / 全体   カバレッジ')
let shippedEn = 0
let shippedJa = 0
for (const row of shipped) {
  shippedEn += row.en
  shippedJa += row.ja
  const percent = row.en === 0 ? 100 : Math.round((row.ja / row.en) * 1000) / 10
  console.log(
    `  ${row.ns.padEnd(32)} ${String(row.ja).padStart(4)} / ${String(row.en).padStart(4)}   ${String(percent).padStart(5)}%`,
  )
}
console.log(
  `  ${'合計'.padEnd(30)} ${String(shippedJa).padStart(4)} / ${String(shippedEn).padStart(4)}   ${String(Math.round((shippedJa / shippedEn) * 1000) / 10).padStart(5)}%`,
)

if (args.includes('--all')) {
  console.log('\n未対象の名前空間 (en キー数の多い順)')
  for (const row of rest) {
    console.log(`  ${String(row.en).padStart(5)}  ${row.ns}`)
  }
} else {
  const untranslated = rest.reduce((total, row) => total + row.en, 0)
  console.log(
    `\n未対象の名前空間: ${rest.length} 件 / ${untranslated} キー (\`--all\` で一覧、\`--missing <名前空間>\` で原文)`,
  )
  console.log('  ' + rest.slice(0, 12).map((row) => `${row.ns}(${row.en})`).join(', '))
}

console.log(`\n全体: ${totalJa} / ${totalEn} キー (${coverage(totalJa, totalEn)}%)`)

const identicalKeys = shipped.flatMap((row) => row.identical.map((key) => `${row.ns} / ${key}`))
if (identicalKeys.length > 0) {
  console.log(`\n英語と同一のままの訳語 (意図的なら問題ない): ${identicalKeys.length} 件`)
  for (const item of identicalKeys) console.log(`  ${item}`)
}

// ---- strict: 未訳を許さない -------------------------------------------------
// DSH 本体を更新して新しいキーが増えると、ここで止まる。訳を足すまで `npm run check` は
// 成功しないので、英語のまま表示される箇所が黙って混ざらない。
if (args.includes('--strict') && totalJa < totalEn) {
  const gaps = rows
    .filter((row) => !row.shipped || row.ja < row.en)
    .sort((a, b) => b.en - b.ja - (a.en - a.ja))
    .map((row) => `${row.ns} (${row.ja}/${row.en})`)
  errors.push(
    `未訳が ${totalEn - totalJa} キーあります (${totalJa} / ${totalEn} = ${coverage(totalJa, totalEn)}%)。` +
      `\`npm run audit -- --missing <名前空間>\` で原文を出して訳を足してください: ` +
      `${gaps.slice(0, 8).join(', ')}${gaps.length > 8 ? ` ほか ${gaps.length - 8} 名前空間` : ''}`,
  )
}

if (errors.length > 0) {
  console.error(`\n問題 ${errors.length} 件:`)
  for (const item of errors) console.error(`  ✗ ${item}`)
  process.exit(1)
}
console.log('\n問題なし (存在しないキー・プレースホルダ不一致は検出されなかった)')
