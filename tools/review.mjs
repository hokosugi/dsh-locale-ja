/**
 * 英語原文と日本語訳の対照一覧 (TSV) を出力・再取り込みする。
 *
 * 一覧は表計算ソフトで開いて `ja` 列を直せる形にしてあり、直した TSV を
 * `import` すると src/locales/*.ja.json に書き戻る。取り込み時には
 * 「存在しない名前空間・キー」「プレースホルダ ({name}) の不一致」
 * 「空の訳語」を検証し、1 件でも問題があれば書き込まずに中止する。
 *
 * 使い方:
 *   node tools/review.mjs export                     # review/ja.tsv を出力
 *   node tools/review.mjs export --split             # 名前空間ごとの TSV も出力
 *   node tools/review.mjs export --only chat,conversation
 *   node tools/review.mjs export --with-zh           # 参考として中国語列を足す
 *   node tools/review.mjs import                     # review/ja.tsv を反映
 *   node tools/review.mjs import review/chat.tsv     # 個別ファイルを反映
 *
 * セルのエスケープ: 改行は `\n`、タブは `\t`、バックスラッシュは `\\` として
 * 1 行 1 レコードに収める (取り込み時に元へ戻す)。
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const REFERENCE = join(root, 'data', 'en-dictionaries.json')
const LOCALES_DIR = join(root, 'src', 'locales')
const REVIEW_DIR = join(root, 'review')
const DEFAULT_TSV = join(REVIEW_DIR, 'ja.tsv')

const args = process.argv.slice(2)
const command = args[0] ?? 'export'
const flagOf = (name) => {
  const index = args.indexOf(name)
  return index >= 0 ? (args[index + 1] ?? true) : undefined
}

if (!existsSync(REFERENCE)) {
  console.error(`参照辞書がない: ${REFERENCE}\n先に \`npm run extract\` を実行すること。`)
  process.exit(1)
}
const reference = JSON.parse(readFileSync(REFERENCE, 'utf8'))

/** `{name}` 形式のプレースホルダ名を集める。 */
const placeholdersOf = (value) => new Set([...String(value).matchAll(/\{(\w+)\}/g)].map((m) => m[1]))
const sameSet = (a, b) => a.size === b.size && [...a].every((value) => b.has(value))
const japaneseOf = (value) => /\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}/u.test(value)

/** TSV セルへ落とす。 */
const escapeCell = (value) =>
  String(value).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')

/** TSV セルから戻す。 */
const unescapeCell = (value) =>
  value.replace(/\\(.)/g, (match, ch) => {
    if (ch === 'n') return '\n'
    if (ch === 'r') return '\r'
    if (ch === 't') return '\t'
    if (ch === '\\') return '\\'
    return match
  })

/** パックが持つ辞書を読む (ファイル名 = 名前空間)。 */
function readShipped() {
  const shipped = {}
  for (const file of readdirSync(LOCALES_DIR).filter((name) => name.endsWith('.ja.json')).sort()) {
    shipped[file.slice(0, -'.ja.json'.length)] = JSON.parse(readFileSync(join(LOCALES_DIR, file), 'utf8'))
  }
  return shipped
}

/**
 * 1 件の状態を判定する。
 * @param en - 英語原文。
 * @param ja - 日本語訳 (未訳なら undefined)。
 * @param knownKey - 英語辞書にキーが存在するか。
 * @returns 状態ラベル。
 */
function statusOf(en, ja, knownKey) {
  if (!knownKey) return 'unknown-key'
  if (ja === undefined) return 'missing'
  // 原文が空のキーは、訳語も空であることが正しい
  if (ja.trim() === '') return en.trim() === '' ? 'ok' : 'empty'
  if (!sameSet(placeholdersOf(ja), placeholdersOf(en))) return 'placeholder-mismatch'
  if (ja === en && japaneseOf(ja)) return 'identical'
  return 'ok'
}

/**
 * TSV を組み立てる。
 * @param options - 出力対象と列。
 * @returns TSV 文字列。
 */
function buildTsv(options) {
  const shipped = readShipped()
  const withZh = options.withZh
  const only = options.only
  const namespaces = Object.keys(reference.namespaces)
    .filter((ns) => (only === undefined ? shipped[ns] !== undefined : only.includes(ns)))
    .sort((a, b) => Object.keys(reference.namespaces[b].en).length - Object.keys(reference.namespaces[a].en).length)

  const header = ['namespace', 'key', 'en', 'ja', 'status']
  if (withZh) header.push('zh')
  const lines = [header.join('\t')]
  const counts = {}

  for (const ns of namespaces) {
    const en = reference.namespaces[ns].en
    const zh = reference.namespaces[ns].zh ?? {}
    const ja = shipped[ns] ?? {}
    for (const key of Object.keys(en)) {
      const status = statusOf(en[key], ja[key], true)
      counts[status] = (counts[status] ?? 0) + 1
      const row = [ns, key, escapeCell(en[key]), ja[key] === undefined ? '' : escapeCell(ja[key]), status]
      if (withZh) row.push(escapeCell(zh[key] ?? ''))
      lines.push(row.join('\t'))
    }
  }
  return { tsv: `${lines.join('\n')}\n`, counts, namespaces }
}

/** Markdown の表セルに収める (改行は呼び出し側で除外済み)。 */
const mdCell = (value) => String(value).replace(/\|/g, '\\|')

/**
 * 名前空間 1 つぶんの読み物 Markdown を作る。
 *
 * 複数行の値 (`###` や `>` を含み Markdown として描画されるもの) は、表に押し込まず
 * 展開して表示する。日本語訳は実際の見た目に近い形で、英語原文は折りたたんで載せる。
 * @param ns - 名前空間。
 * @param shipped - 読み込み済みの辞書 (名前空間 → 辞書)。
 * @returns Markdown 文字列。
 */
function buildNamespaceMarkdown(ns, shipped) {
  const en = reference.namespaces[ns].en
  const ja = shipped[ns] ?? {}
  const longForm = []
  const table = []
  const attention = []

  for (const key of Object.keys(en)) {
    const value = ja[key]
    const status = statusOf(en[key], value, true)
    if (status !== 'ok') attention.push({ key, status, en: en[key], ja: value })
    if (en[key].includes('\n') || (value ?? '').includes('\n')) longForm.push({ key, en: en[key], ja: value, status })
    else table.push({ key, en: en[key], ja: value, status })
  }

  const translated = Object.keys(en).filter((key) => ja[key] !== undefined).length
  const lines = [
    `# ${ns} — 日本語訳レビュー`,
    '',
    `訳済み **${translated} / ${Object.keys(en).length}** キー` +
      (attention.length === 0 ? ' / 要確認 0 件' : ` / **要確認 ${attention.length} 件**`),
    '',
    '<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->',
    '',
  ]

  if (attention.length > 0) {
    lines.push('## 要確認', '', '| キー | 状態 | 英語 | 日本語 |', '| --- | --- | --- | --- |')
    for (const item of attention) {
      lines.push(
        `| \`${item.key}\` | \`${item.status}\` | ${mdCell(item.en)} | ${item.ja === undefined ? '—' : mdCell(item.ja)} |`,
      )
    }
    lines.push('')
  }

  if (longForm.length > 0) {
    lines.push('## 複数行の文言 (Markdown として描画されるもの)', '')
    for (const item of longForm) {
      lines.push(`### \`${item.key}\``, '')
      lines.push('**日本語訳** — UI では次のように描画されます', '')
      // ブロック引用に入れると、訳文自身の `###` が見出しとして引用内に収まる
      const quoted = (item.ja ?? '（未訳）').split('\n').map((line) => (line === '' ? '>' : `> ${line}`))
      lines.push(...quoted, '')
      lines.push('<details><summary>英語原文</summary>', '', '```markdown', item.en, '```', '', '</details>', '')
    }
  }

  if (table.length > 0) {
    lines.push('## 一覧', '', '| 確認 | キー | 英語 | 日本語 |', '| --- | --- | --- | --- |')
    for (const item of table) {
      const mark = item.status === 'ok' ? '- [ ]' : '- [!]'
      lines.push(`| ${mark} | \`${item.key}\` | ${mdCell(item.en)} | ${item.ja === undefined ? '（未訳）' : mdCell(item.ja)} |`)
    }
    lines.push('')
    lines.push('確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。')
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * 索引 (dashboard) の Markdown を作る。
 * @param namespaces - 対象の名前空間 (キー数の多い順)。
 * @param shipped - 読み込み済みの辞書 (名前空間 → 辞書)。
 * @returns Markdown 文字列。
 */
function buildIndexMarkdown(namespaces, shipped) {
  const attention = []
  let totalKeys = 0
  let totalTranslated = 0

  for (const ns of namespaces) {
    const en = reference.namespaces[ns].en
    const ja = shipped[ns] ?? {}
    for (const key of Object.keys(en)) {
      totalKeys += 1
      if (ja[key] !== undefined) totalTranslated += 1
      const status = statusOf(en[key], ja[key], true)
      if (status !== 'ok') attention.push({ ns, key, status })
    }
  }

  const allKeys = Object.values(reference.namespaces).reduce((sum, item) => sum + Object.keys(item.en).length, 0)
  const lines = [
    '# 日本語訳レビュー — 索引',
    '',
    '生成物。編集するのは `src/locales/*.ja.json`、または `review/ja.tsv` の `ja` 列。',
    '',
    `- 対象: **${namespaces.length} 名前空間 / ${totalKeys} キー**`,
    `- 訳済み: **${totalTranslated} / ${totalKeys}** (${Math.round((totalTranslated / totalKeys) * 1000) / 10}%)`,
    `- 未訳 (英語のまま表示): ${allKeys - totalTranslated} キー — 訳していない名前空間は英語にフォールバックします`,
    `- 要確認: **${attention.length} 件**`,
    '',
  ]

  if (attention.length > 0) {
    lines.push('## 要確認', '', '| 名前空間 | キー | 状態 |', '| --- | --- | --- |')
    for (const item of attention.slice(0, 50)) lines.push(`| ${item.ns} | \`${item.key}\` | \`${item.status}\` |`)
    if (attention.length > 50) lines.push(`| … | 残り ${attention.length - 50} 件 | |`)
    lines.push('')
  }

  lines.push('## 名前空間', '', '| 名前空間 | 訳済み / 全体 | 読み物 | 編集用 |', '| --- | --- | --- | --- |')
  for (const ns of namespaces) {
    const en = reference.namespaces[ns].en
    const ja = shipped[ns] ?? {}
    const done = Object.keys(en).filter((key) => ja[key] !== undefined).length
    const percent = Math.round((done / Object.keys(en).length) * 1000) / 10
    lines.push(`| ${ns} | ${done} / ${Object.keys(en).length} (${percent}%) | [${ns}.md](./${ns}.md) | [${ns}.tsv](./${ns}.tsv) |`)
  }
  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push('## 手で直す手順')
  lines.push('')
  lines.push('1. `review/<名前空間>.tsv` の `ja` 列を直す（セル内で Enter は押さず、段落は `\\n\\n` と書く）')
  lines.push('2. `npm run review:apply` で辞書へ反映（問題があれば 1 バイトも書かずに中止）')
  lines.push('3. `npm run check` でビルド + 監査 + 実物ランタイム検証')
  lines.push('')
  lines.push('`review/*.md` は閲覧専用です。直しても反映されません。')
  lines.push('')

  return lines.join('\n')
}

/** 一覧を出力する。 */
function exportTsv() {
  const onlyRaw = flagOf('--only')
  const only = typeof onlyRaw === 'string' ? onlyRaw.split(',').map((s) => s.trim()).filter(Boolean) : undefined
  const out = typeof flagOf('--out') === 'string' ? flagOf('--out') : DEFAULT_TSV
  const { tsv, counts, namespaces } = buildTsv({ withZh: args.includes('--with-zh'), only })

  if (namespaces.length === 0) {
    console.error('出力対象の名前空間がない。--only の指定を確認すること。')
    process.exit(1)
  }

  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, tsv)
  const rows = Object.values(counts).reduce((total, count) => total + count, 0)
  console.log(`一覧を出力: ${out}`)
  console.log(`  ${namespaces.length} 名前空間 / ${rows} 行`)
  for (const [status, count] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${status}: ${count}`)
  }

  mkdirSync(REVIEW_DIR, { recursive: true })
  const shipped = readShipped()
  writeFileSync(join(REVIEW_DIR, 'ja.md'), buildIndexMarkdown(namespaces, shipped))
  for (const ns of namespaces) {
    writeFileSync(join(REVIEW_DIR, `${ns}.md`), buildNamespaceMarkdown(ns, shipped))
  }
  console.log(`  読み物 (Markdown): ${REVIEW_DIR}/ja.md と ${REVIEW_DIR}/<名前空間>.md`)

  if (args.includes('--split')) {
    for (const ns of namespaces) {
      const single = buildTsv({ withZh: args.includes('--with-zh'), only: [ns] })
      writeFileSync(join(REVIEW_DIR, `${ns}.tsv`), single.tsv)
    }
    console.log(`  編集用 (名前空間ごと): ${REVIEW_DIR}/<名前空間>.tsv`)
  }

  console.log('\n`ja` 列を直したら、次のどちらかで反映する:')
  console.log('  node tools/review.mjs import')
  console.log(`  node tools/review.mjs import ${out}`)
}

/**
 * TSV を読み、辞書へ反映する。
 * @param path - 反映する TSV。
 */
function importTsv(path) {
  if (!existsSync(path)) {
    console.error(`TSV がない: ${path}\n先に \`node tools/review.mjs export\` を実行すること。`)
    process.exit(1)
  }
  const text = readFileSync(path, 'utf8')
  const lines = text.split('\n').filter((line) => line.trim() !== '')
  if (lines.length < 2) {
    console.error('TSV にデータ行がない。')
    process.exit(1)
  }
  const header = lines[0].split('\t')
  const column = (name) => {
    const index = header.indexOf(name)
    if (index < 0) throw new Error(`TSV に "${name}" 列がない (ヘッダ: ${header.join(', ')})`)
    return index
  }
  const columns = { ns: column('namespace'), key: column('key'), en: column('en'), ja: column('ja') }

  /** ns -> key -> ja */
  const incoming = {}
  const errors = []
  const warnings = []
  let rowNumber = 0

  for (const line of lines.slice(1)) {
    rowNumber += 2 // ヘッダ分を足した行番号
    const cells = line.split('\t')
    const ns = cells[columns.ns]
    const key = cells[columns.key]
    const en = unescapeCell(cells[columns.en] ?? '')
    const ja = unescapeCell(cells[columns.ja] ?? '')
    if (ns === undefined || key === undefined) {
      errors.push(`${rowNumber} 行目: namespace か key が空`)
      continue
    }
    const known = reference.namespaces[ns]?.en
    if (known === undefined) {
      errors.push(`${rowNumber} 行目: 名前空間 "${ns}" は抽出済みの一覧にない`)
      continue
    }
    if (!(key in known)) {
      errors.push(`${rowNumber} 行目: 名前空間 "${ns}" にキー "${key}" はない`)
      continue
    }
    if (ja.trim() === '' && known[key].trim() !== '') {
      errors.push(`${rowNumber} 行目: "${ns} / ${key}" の日本語訳が空 (削除するなら行ごと消すこと)`)
      continue
    }
    if (!sameSet(placeholdersOf(ja), placeholdersOf(known[key]))) {
      const expected = [...placeholdersOf(known[key])].map((p) => `{${p}}`).join(' ')
      errors.push(
        `${rowNumber} 行目: "${ns} / ${key}" のプレースホルダが不一致 (英語: ${expected || 'なし'} / 日本語: ${ja})`,
      )
      continue
    }
    if (en !== known[key]) {
      warnings.push(`${rowNumber} 行目: "${ns} / ${key}" の英語原文が基準データと異なる (表示は現在の原文で確認すること)`)
    }
    if (ja === known[key] && japaneseOf(ja)) {
      warnings.push(`${rowNumber} 行目: "${ns} / ${key}" が英語と同一`)
    }
    incoming[ns] ??= {}
    incoming[ns][key] = ja
  }

  for (const warning of warnings) console.warn(`  ! ${warning}`)
  if (errors.length > 0) {
    console.error(`\n問題 ${errors.length} 件のため書き込まなかった:`)
    for (const error of errors) console.error(`  ✗ ${error}`)
    process.exit(1)
  }

  const shipped = readShipped()
  // 既定は「書かれている行だけを反映する」マージ。TSV に無いキーを消したいときだけ
  // --prune を使う (うっかり一部の行だけの一覧を取り込んで残りを消す事故を防ぐ)。
  const prune = args.includes('--prune')
  let written = 0
  for (const [ns, dict] of Object.entries(incoming)) {
    const previous = shipped[ns] ?? {}
    const merged = prune ? {} : { ...previous }
    for (const [key, value] of Object.entries(dict)) merged[key] = value

    // 出力順は基準データ (バンドル側の宣言順) にそろえて差分を安定させる
    const ordered = {}
    for (const key of Object.keys(reference.namespaces[ns].en)) if (key in merged) ordered[key] = merged[key]
    for (const key of Object.keys(merged)) if (!(key in ordered)) ordered[key] = merged[key]

    const added = Object.keys(ordered).filter((key) => !(key in previous)).length
    const removed = Object.keys(previous).filter((key) => !(key in ordered)).length
    const updated = Object.keys(ordered).filter((key) => key in previous && previous[key] !== ordered[key]).length
    const untouched = Object.keys(previous).filter((key) => key in ordered && previous[key] === ordered[key]).length

    if (added === 0 && removed === 0 && updated === 0) {
      console.log(`  ${ns}: 変更なし (${Object.keys(ordered).length} キー)`)
      continue
    }
    writeFileSync(join(LOCALES_DIR, `${ns}.ja.json`), `${JSON.stringify(ordered, null, 2)}\n`)
    written += 1
    console.log(
      `  ${ns}: 追加 ${added} / 更新 ${updated} / 削除 ${removed} / 据え置き ${untouched} (${Object.keys(ordered).length} キー)`,
    )
  }

  if (written === 0) {
    console.log('\n変更はなかった (ファイルは書き換えていない)。')
  } else {
    console.log(`\n${written} ファイルを更新: ${LOCALES_DIR}/<名前空間>.ja.json`)
    console.log('続けて `npm run check` を実行するとビルドと検証まで通る。')
  }
}

if (command === 'export') exportTsv()
else if (command === 'import') {
  const path = typeof args[1] === 'string' && !args[1].startsWith('--') ? args[1] : DEFAULT_TSV
  importTsv(path)
} else {
  console.error(`不明なコマンド: ${command}\n使い方: node tools/review.mjs export|import [path]`)
  console.error(`ヒント: ${basename(here)} から実行する`)
  process.exit(1)
}
