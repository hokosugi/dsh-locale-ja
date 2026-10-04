/**
 * DSH 側の英語辞書が変わったかを報告する。
 *
 * `npm run extract` で `data/en-dictionaries.json` を作り直したあとに実行し、直前のコミット
 * (既定) または `--base` で指定したファイルと比べて「名前空間の増減 / キーの増減 / 英文の変更」を
 * 名前空間ごとにまとめる。
 *
 * `generatedFrom` は実行したマシンのパスなので比較しない (CI では必ず変わるため。ここを比べると
 * 毎回「差分あり」になってしまう)。
 *
 * 使い方:
 *   node tools/drift-report.mjs                    概要を表示
 *   node tools/drift-report.mjs --markdown         GitHub Issue に貼れる Markdown
 *   node tools/drift-report.mjs --base old.json    ファイルと比較
 *   node tools/drift-report.mjs --fail-on-change   差分があれば終了コード 1
 */
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const CURRENT = join(root, 'data', 'en-dictionaries.json')
const RELATIVE = 'data/en-dictionaries.json'

/** 一覧に出すキーの上限 (Issue が長くなりすぎないように)。 */
const LIMIT = 60

const args = process.argv.slice(2)
const flag = (name) => args.includes(name)
const valueOf = (name) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

/**
 * 比較の基準を読む。`--base` が無ければ git の HEAD から読む。
 * @returns 基準の JSON。
 */
function loadBase() {
  const explicit = valueOf('--base')
  if (explicit !== undefined) {
    if (!existsSync(explicit)) {
      console.error(`基準ファイルが見つかりません: ${explicit}`)
      process.exit(2)
    }
    return JSON.parse(readFileSync(explicit, 'utf8'))
  }
  try {
    return JSON.parse(
      execFileSync('git', ['-C', root, 'show', `HEAD:${RELATIVE}`], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }),
    )
  } catch {
    console.error(`git の HEAD に ${RELATIVE} がありません。--base <ファイル> で基準を指定してください。`)
    process.exit(2)
  }
}

/**
 * その名前空間の日本語辞書 (無ければ空オブジェクト)。
 * @param ns - 名前空間。
 * @returns 辞書。
 */
function loadJa(ns) {
  const file = join(root, 'src', 'locales', `${ns}.ja.json`)
  if (!existsSync(file)) return {}
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    return {}
  }
}

if (!existsSync(CURRENT)) {
  console.error(`先に \`npm run extract\` を実行してください (${RELATIVE} がありません)。`)
  process.exit(2)
}
const current = JSON.parse(readFileSync(CURRENT, 'utf8'))
const base = loadBase()
const now = current.namespaces ?? {}
const before = base.namespaces ?? {}

const addedNamespaces = Object.keys(now).filter((ns) => !(ns in before))
const removedNamespaces = Object.keys(before).filter((ns) => !(ns in now))

/** 名前空間ごとの差分。 */
const changes = []
for (const ns of Object.keys(now)) {
  if (!(ns in before)) continue
  const nowEn = now[ns]?.en ?? {}
  const beforeEn = before[ns]?.en ?? {}
  const added = Object.keys(nowEn).filter((key) => !(key in beforeEn))
  const removed = Object.keys(beforeEn).filter((key) => !(key in nowEn))
  const edited = Object.keys(nowEn).filter((key) => key in beforeEn && nowEn[key] !== beforeEn[key])
  if (added.length === 0 && removed.length === 0 && edited.length === 0) continue
  changes.push({ ns, added, removed, edited })
}

const sum = (pick) => changes.reduce((total, item) => total + pick(item).length, 0)
const totals = {
  added: sum((item) => item.added),
  removed: sum((item) => item.removed),
  edited: sum((item) => item.edited),
}
const untranslated = changes.reduce((total, item) => {
  const ja = loadJa(item.ns)
  return total + item.added.filter((key) => ja[key] === undefined).length
}, 0)
const orphaned = changes.reduce((total, item) => {
  const ja = loadJa(item.ns)
  return total + item.removed.filter((key) => ja[key] !== undefined).length
}, 0)
const changed = addedNamespaces.length > 0 || removedNamespaces.length > 0 || changes.length > 0

const summary = [
  `名前空間: 追加 ${addedNamespaces.length} / 削除 ${removedNamespaces.length}`,
  `キー: 追加 ${totals.added} / 削除 ${totals.removed} / 英文変更 ${totals.edited}`,
  `未訳 (訳を足す候補): ${untranslated}`,
  `訳語が余っている (削除が必要): ${orphaned}`,
]

if (!changed) {
  console.log('差分はありません (DSH 側の辞書はコミット済みの内容と同じです)')
  process.exit(0)
}

if (!flag('--markdown')) {
  console.log('DSH 側の辞書に差分があります')
  for (const item of summary) console.log(`  ${item}`)
  for (const item of changes) {
    const ja = loadJa(item.ns)
    const missing = item.added.filter((key) => ja[key] === undefined).length
    console.log(
      `  ${item.ns}: 追加 ${item.added.length} / 削除 ${item.removed.length} / 英文変更 ${item.edited.length} / 未訳 ${missing}`,
    )
  }
  for (const ns of addedNamespaces) console.log(`  ${ns}: 名前空間ごと追加 (${Object.keys(now[ns]?.en ?? {}).length} キー)`)
  for (const ns of removedNamespaces) console.log(`  ${ns}: 名前空間ごと削除`)
  if (flag('--fail-on-change')) process.exit(1)
  process.exit(0)
}

const lines = []
const push = (text = '') => lines.push(text)
push('## DSH 側の文言が更新されました')
push()
push('`npm run extract` の結果と、コミット済みの `data/en-dictionaries.json` の差分です。')
push()
for (const item of summary) push(`- ${item}`)
push()

if (addedNamespaces.length > 0) {
  push('### 追加された名前空間')
  push()
  for (const ns of addedNamespaces) {
    push(`- \`${ns}\` (${Object.keys(now[ns]?.en ?? {}).length} キー) — 辞書ファイルが無いので全部未訳`)
  }
  push()
}
if (removedNamespaces.length > 0) {
  push('### 辞書から消えた名前空間')
  push()
  for (const ns of removedNamespaces) push(`- \`${ns}\` — 訳語ファイルも不要になります`)
  push()
}
if (changes.length > 0) {
  push('### キーの増減・英文の変更')
  push()
  push('| 名前空間 | 追加 | 削除 | 英文変更 | 未訳 |')
  push('| --- | --- | --- | --- | --- |')
  for (const item of changes) {
    const ja = loadJa(item.ns)
    const missing = item.added.filter((key) => ja[key] === undefined).length
    push(`| \`${item.ns}\` | ${item.added.length} | ${item.removed.length} | ${item.edited.length} | ${missing} |`)
  }
  push()
  for (const item of changes) {
    const ja = loadJa(item.ns)
    const en = now[item.ns].en
    if (item.added.length > 0) {
      push('<details><summary>追加されたキー</summary>')
      push()
      for (const key of item.added.slice(0, LIMIT)) {
        const state = ja[key] === undefined ? '**未訳**' : '訳語あり (要確認)'
        push(`- \`${item.ns}/${key}\`: ${JSON.stringify(en[key])} — ${state}`)
      }
      if (item.added.length > LIMIT) push(`- …ほか ${item.added.length - LIMIT} 件`)
      push()
      push('</details>')
      push()
    }
    if (item.edited.length > 0) {
      push('<details><summary>英文が変わったキー (訳語の見直し)</summary>')
      push()
      for (const key of item.edited.slice(0, LIMIT)) push(`- \`${item.ns}/${key}\`: → ${JSON.stringify(en[key])}`)
      if (item.edited.length > LIMIT) push(`- …ほか ${item.edited.length - LIMIT} 件`)
      push()
      push('</details>')
      push()
    }
    if (item.removed.length > 0) {
      push('<details><summary>辞書から消えたキー (訳語が余っている)</summary>')
      push()
      for (const key of item.removed.slice(0, LIMIT)) push(`- \`${item.ns}/${key}\``)
      if (item.removed.length > LIMIT) push(`- …ほか ${item.removed.length - LIMIT} 件`)
      push()
      push('</details>')
      push()
    }
  }
}

push('### 次の手順')
push()
push('```sh')
push('npm run extract      # 1. 最新の DSH から英語辞書を再抽出 (この Issue のもと)')
push('npm run drift        # 2. 何が変わったかを確認')
push('npm run audit        # 3. 未訳・存在しないキーを確認')
push('npm run review       # 4. 対照一覧を更新し、review/ja.tsv の ja 列を直して review:apply')
push('npm run check        # 5. ビルド + 監査 (--strict) + 実物ランタイム検証')
push('```')
push()
push('英語の文面だけが変わったキーと、画面レイアウトの変化は自動では検知できません。')
push('訳を足したら [CHECKLIST.md](../blob/main/CHECKLIST.md) の目視確認も一度通してください。')

console.log(lines.join('\n'))
if (flag('--fail-on-change')) process.exit(1)
