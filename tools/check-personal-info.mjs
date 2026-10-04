/**
 * 公開物に個人情報・秘密情報が混ざっていないかを点検する。
 *
 * 方針: 「このリポジトリに入れてよい情報」だけを許す。よくある漏れ方を 4 種類のパターンで拾い、
 * さらに「実行しているマシンのユーザー名・ホームディレクトリ名」も語として検索する
 * (特定の名前をコードに書かないため、語は実行時に作る)。
 *
 * 独自の語 (人名・社内パス・固有 ID など) を足したいときは、リポジトリに含めない
 * `.personal-terms` に 1 行ずつ書く (gitignore 済み)。
 *
 * 使い方:
 *   node tools/check-personal-info.mjs               追跡 + 未追跡ファイルを点検 (既定)
 *   node tools/check-personal-info.mjs --all         gitignore されたファイルも点検
 *   node tools/check-personal-info.mjs --history     git 履歴の中身も点検 (警告のみ)
 *   node tools/check-personal-info.mjs --identity    コミットのメール設定を点検 (noreply 以外はエラー)
 *   node tools/check-personal-info.mjs --strict-history  履歴の検出もエラーにする
 *
 * 終了コード: 0 = 問題なし / 1 = 問題あり (もしくは --identity の設定不備) / 2 = 実行できない。
 *
 * パターンそのものを説明したい行 (ドキュメントなど) には personal-info-allow と書くと除外される。
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { homedir, userInfo } from 'node:os'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const args = process.argv.slice(2)
const flag = (name) => args.includes(name)

/** この語を含む行は点検対象から外す (パターンの説明を書くための逃げ道)。 */
const ALLOW_MARKER = 'personal-info-allow'

/** 走査から外すディレクトリと拡張子。 */
const SKIP_DIRS = new Set(['.git', 'node_modules', '.cache', 'dist'])
const SKIP_EXTENSIONS = new Set(['.tgz', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2', '.zip'])

/** 検出パターン。regex は「コード中にそのままの文字列が現れない」ように書く (自己検出を避けるため)。 */
const PATTERNS = [
  {
    id: 'home-path',
    label: 'ホームディレクトリの絶対パス',
    regex: new RegExp(String.raw`(?<![\w.-])/(?:${'Users'}|${'home'})/[A-Za-z0-9._-]+`, 'g'),
    grep: String.raw`/(${'Users'}|${'home'})/[A-Za-z0-9._-]+`,
  },
  {
    id: 'windows-home',
    label: 'Windows のユーザーフォルダ',
    regex: new RegExp(String.raw`[A-Za-z]:[\\/]{1,2}${'Users'}[\\/][A-Za-z0-9._-]+`, 'g'),
    grep: String.raw`[A-Za-z]:[\\/]{1,2}${'Users'}[\\/][A-Za-z0-9._-]+`,
  },
  {
    id: 'email',
    label: 'メールアドレス',
    regex: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,
    grep: String.raw`[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}`,
    allow: [/@users\.noreply\.github\.com$/, /@example\.(com|org|net)$/],
  },
  {
    id: 'token',
    label: 'トークン・秘密鍵らしき文字列',
    regex: new RegExp(
      [
        String.raw`\bgh[pousr]_[A-Za-z0-9]{30,}`,
        String.raw`\bgithub_pat_[A-Za-z0-9_]{20,}`,
        String.raw`\bnpm_[A-Za-z0-9]{30,}`,
        String.raw`\bsk-(?:ant-)?[A-Za-z0-9_-]{20,}`,
        String.raw`\bAKIA[0-9A-Z]{16}\b`,
        String.raw`\bxox[baprs]-[A-Za-z0-9-]{10,}`,
        String.raw`\bAIza[0-9A-Za-z_-]{30,}`,
        String.raw`-{5}BEGIN [A-Z ]*PRIVATE KEY-{5}`,
        String.raw`(?:password|passwd|secret|api[_-]?key|access[_-]?token)\s*[:=]\s*['"][^'"]{8,}['"]`,
      ].join('|'),
      'gi',
    ),
    grep: [
      String.raw`gh[pousr]_[A-Za-z0-9]{30,}`,
      String.raw`github_pat_[A-Za-z0-9_]{20,}`,
      String.raw`npm_[A-Za-z0-9]{30,}`,
      String.raw`sk-(ant-)?[A-Za-z0-9_-]{20,}`,
      String.raw`AKIA[0-9A-Z]{16}`,
      String.raw`xox[baprs]-[A-Za-z0-9-]{10,}`,
      String.raw`AIza[0-9A-Za-z_-]{30,}`,
      String.raw`-{5}BEGIN [A-Z ]*PRIVATE KEY-{5}`,
    ].join('|'),
  },
]

/**
 * 走査対象のファイル一覧を作る。既定は「追跡 + 未追跡 (gitignore は除く)」で、
 * コミット前の新しいファイルも点検できる。
 * @param {boolean} includeIgnored - gitignore されたファイルも含めるか。
 * @returns {string[]} リポジトリからの相対パス。
 */
function listFiles(includeIgnored) {
  const options = ['-z', '--cached', '--others']
  if (!includeIgnored) options.push('--exclude-standard')
  const files = execFileSync('git', ['-C', root, 'ls-files', ...options], { encoding: 'utf8' })
    .split('\0')
    .filter((item) => item !== '')
  return [...new Set(files)].filter((rel) => {
    if (rel === '.personal-terms') return false // 語の一覧そのものは点検対象外
    if (rel.split('/').some((part) => SKIP_DIRS.has(part))) return false
    return !SKIP_EXTENSIONS.has(extname(rel).toLowerCase())
  })
}

/**
 * 走査する語 (実行環境から作る + .personal-terms)。
 * @returns {string[]} 4 文字以上の語。
 */
function machineTerms() {
  const terms = new Set()
  const add = (value) => {
    if (typeof value === 'string' && value.length >= 4) terms.add(value)
  }
  add(userInfo().username)
  add(basename(homedir()))
  const file = join(root, '.personal-terms')
  if (existsSync(file)) {
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      const term = line.trim()
      if (term !== '' && !term.startsWith('#')) add(term)
    }
  }
  return [...terms]
}

const findings = []
const files = listFiles(flag('--all'))
const terms = machineTerms()

for (const rel of files) {
  const full = join(root, rel)
  let text
  try {
    if (!statSync(full).isFile()) continue
    text = readFileSync(full, 'utf8')
  } catch {
    continue
  }
  if (text.includes('\0')) continue // バイナリは対象外

  text.split('\n').forEach((line, index) => {
    if (line.includes(ALLOW_MARKER)) return // パターンの説明など、意図的に書いている行
    const at = `${rel}:${index + 1}`
    for (const pattern of PATTERNS) {
      pattern.regex.lastIndex = 0
      for (const match of line.matchAll(pattern.regex)) {
        const value = match[0]
        if (pattern.allow?.some((allow) => allow.test(value))) continue
        findings.push({ at, kind: pattern.label, value })
      }
    }
    for (const term of terms) {
      if (line.toLowerCase().includes(term.toLowerCase())) {
        findings.push({ at, kind: `実行環境の語「${term}」`, value: line.trim().slice(0, 120) })
      }
    }
  })
}

/** git のコマンドを実行する (失敗したら空文字)。 */
function git(...commandArgs) {
  try {
    return execFileSync('git', ['-C', root, ...commandArgs], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return ''
  }
}

/** 履歴の中身を点検する (既定では警告のみ)。 */
function scanHistory() {
  const commits = git('rev-list', '--all').split('\n').filter((item) => item !== '')
  if (commits.length === 0) return []
  const seen = new Set()
  for (const pattern of PATTERNS) {
    if (pattern.grep === undefined) continue
    const out = git('grep', '-I', '-n', '-i', '-E', pattern.grep, ...commits)
    for (const line of out.split('\n')) {
      if (line === '' || line.includes(ALLOW_MARKER)) continue
      if (pattern.allow?.some((allow) => allow.test(line))) continue
      const commit = line.slice(0, line.indexOf(':'))
      if (seen.has(`${pattern.id}:${commit}`)) continue
      seen.add(`${pattern.id}:${commit}`)
      findings.push({ at: `履歴 ${commit.slice(0, 7)}`, kind: `${pattern.label} (履歴)`, value: line.replace(/^[0-9a-f]+:/, '') })
    }
  }
  return findings
}

/** コミットのメール設定を点検する。 */
function checkIdentity() {
  const noreply = /@users\.noreply\.github\.com$/
  const configured = git('config', 'user.email')
  const lines = []
  let failed = false

  if (configured === '') {
    lines.push('⚠️  git config user.email が未設定です。noreply を設定してください:')
    lines.push('    git config user.email "<あなたのユーザー名>@users.noreply.github.com"')
    failed = true
  } else if (!noreply.test(configured)) {
    lines.push(`⚠️  コミットに使うメールアドレスが GitHub の noreply ではありません: ${configured}`)
    lines.push('    git config user.email "<あなたのユーザー名>@users.noreply.github.com"')
    failed = true
  }

  const history = git('log', '--all', '--format=%ae%n%ce')
    .split('\n')
    .filter((item) => item !== '')
  const exposed = [...new Set(history)].filter((email) => !noreply.test(email))
  if (exposed.length > 0) {
    lines.push(`⚠️  過去のコミットに noreply 以外のメールが入っています (履歴の書き換えが必要): ${exposed.join(', ')}`)
  }

  for (const line of lines) console.log(line)
  return failed
}

console.log(`点検対象: ${files.length} ファイル${flag('--all') ? ' (未追跡を含む)' : ''}`)
if (terms.length > 0) console.log(`実行環境から作った語: ${terms.map((term) => `「${term}」`).join(' ')}`)
console.log('')

if (flag('--history')) scanHistory()

const identityFailed = flag('--identity') ? checkIdentity() : false

if (findings.length === 0) {
  console.log('✅ 個人情報・秘密情報らしきものは見つかりませんでした')
  process.exit(identityFailed ? 1 : 0)
}

const historyOnly = findings.every((item) => item.kind.endsWith('(履歴)'))
for (const item of findings) {
  console.log(`❌ ${item.at}: [${item.kind}] ${item.value}`)
}
console.log('')
console.log(`検出: ${findings.length} 件`)
if (historyOnly && !flag('--strict-history')) {
  console.log('(履歴のみの検出です。履歴の書き換えは `git filter-branch` などを使用してください)')
  process.exit(identityFailed ? 1 : 0)
}
process.exit(1)
