/**
 * DSH の `@deepseek-ai/*` パッケージ群を置いているディレクトリを探す (抽出と検証で共用)。
 *
 * 1. `--dsh-modules <path>` / 環境変数 `DSH_MODULES_ROOT`
 * 2. npm のグローバルルート (`npm root -g` + `/@deepseek-ai`)
 * 3. npx キャッシュ (`~/.npm/_npx/<hash>/node_modules/@deepseek-ai`) の新しい順
 *
 * 見つからないときは、探した場所を並べて例外を投げる。黙って空の辞書を書き出すと
 * 「DSH が消えた」のか「辞書が空になった」のか区別できなくなるため。
 */
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { homedir } from 'node:os'

/** 場所を指定する環境変数の名前。 */
export const MODULES_ROOT_ENV = 'DSH_MODULES_ROOT'

/**
 * DSH のパッケージ群を探す。
 * @param {{ explicit?: string }} [options] - `--dsh-modules` などで指定された場所。
 * @returns {{ path: string, kind: 'explicit'|'npm-global'|'npx-cache', tried: string[] }} 見つかった場所と、その見つけ方。
 */
export function findDshModules(options = {}) {
  const explicit = options.explicit
  if (explicit !== undefined && explicit !== '') {
    if (!existsSync(explicit)) throw new Error(`指定された場所が見つかりません: ${explicit}`)
    return { path: explicit, kind: 'explicit', tried: [explicit] }
  }

  const candidates = []
  try {
    const globalRoot = execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim()
    if (globalRoot !== '') {
      candidates.push({ path: join(globalRoot, '@deepseek-ai'), kind: 'npm-global' })
    }
  } catch {
    /* npm が無い環境では飛ばす */
  }

  const npxRoot = join(homedir(), '.npm', '_npx')
  if (existsSync(npxRoot)) {
    const runs = readdirSync(npxRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => join(npxRoot, entry.name))
      .sort((left, right) => statSync(right).mtimeMs - statSync(left).mtimeMs)
    for (const run of runs) {
      candidates.push({ path: join(run, 'node_modules', '@deepseek-ai'), kind: 'npx-cache' })
    }
  }

  const tried = []
  for (const candidate of candidates) {
    tried.push(candidate.path)
    if (existsSync(join(candidate.path, 'dsh', 'package.json'))) return { ...candidate, tried }
  }

  throw new Error(
    [
      'DSH の @deepseek-ai パッケージが見つかりませんでした。',
      '  次のどちらかで場所を指定してください:',
      '    node tools/extract-dictionaries.mjs --dsh-modules /path/to/node_modules/@deepseek-ai',
      `    ${MODULES_ROOT_ENV}=/path/to/node_modules/@deepseek-ai npm run check`,
      '  探した場所:',
      ...tried.map((item) => `    ${item}`),
    ].join('\n'),
  )
}
