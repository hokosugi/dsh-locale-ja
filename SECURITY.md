# セキュリティと個人情報

## 脆弱性の報告

公開の Issue には書かず、GitHub の
[Security タブ → Report a vulnerability](https://github.com/hokosugi/dsh-locale-ja/security/advisories/new)
から **private vulnerability report** として送ってください。メールアドレスは公開していません。

## 個人情報・秘密情報を入れない

このリポジトリと npm 配布物には、個人が特定できる情報や秘密情報を含めません。次の方法で
「入り込んだら気づく・公開前に止まる」ようにしています。

| 仕組み | 内容 |
| --- | --- |
| `npm run scan` | 追跡ファイルを点検 (ホームディレクトリの絶対パス / メールアドレス / トークン・秘密鍵らしき文字列 / 実行環境のユーザー名)。`.personal-terms` に独自の語を足せます |
| `prepublishOnly` | `npm publish` の直前に `npm run check` と `npm run scan -- --identity` を実行し、**通らない版は公開できない**ようにしています |
| GitHub Actions ([ci.yml](.github/workflows/ci.yml)) | push / PR ごとに `npm run scan` と `npm run check` を実行 |
| GitHub の secret scanning / push protection | 秘密情報を含む push を GitHub 側で拒否 |
| `files` (`package.json`) | 配布物を `lib` / `src` / `tools` / `data` / `docs` / README / CHECKLIST / LICENSE / cordis.patch.yml に限定 |
| 行単位の除外 | パターンの説明など、意図的に書く行には `personal-info-allow` と書く |
| `.gitignore` | `.env` 系・鍵ファイル・手元だけの `.personal-terms` を除外 |
| コミットのメール | GitHub の noreply (`<ユーザー名>@users.noreply.github.com`) を使う |
| 絶対パスを書かない | `$HOME` / `os.homedir()` を使い、DSH の場所は [tools/dsh-modules.mjs](tools/dsh-modules.mjs) が自動探索 |

## もし漏れて公開してしまったら

1. **秘密情報なら、まず無効化・ローテーションする。** 公開を取り消しても、取得された可能性は消えません。
2. npm: **先に修正版を publish** し、そのあと `npm unpublish <pkg>@<漏れた版>`。
   (逆順にするとパッケージごと消えて名前が 24 時間ロックされます。`package@version` は再利用できません)
3. git 履歴: `git filter-branch` などで書き換えて `git push --force`。
   ただし GitHub 側のキャッシュや他者の clone に残りうるため、完全消去の保証はありません。
4. 再発防止: `npm run scan` の検出パターンを足すか、`.personal-terms` に語を追加する。

## 対応するバージョン

最新版のみを対象にします。
