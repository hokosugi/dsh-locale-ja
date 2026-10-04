# dsh-locale-ja — DSH Web GUI 日本語ロケールパック

**Japanese locale pack for the [DSH](https://github.com/deepseek-ai/deepseek-harness) Web GUI.**
It adds a `日本語` language and translates the whole shipped dictionary
(56 namespaces / 2421 strings = 100%). No runtime dependencies; `lib/client.js` ships prebuilt.
Distributed from [GitHub](https://github.com/hokosugi/dsh-locale-ja) (MIT); not published to npm.

```sh
dsh plugin --profile web add github:hokosugi/dsh-locale-ja    # GitHub から (推奨)
dsh plugin --profile web add /path/to/dsh-locale-ja           # ローカルのディレクトリから
dsh web                                                       # 再起動で反映
```

DSH (DeepSeek Harness) の Web GUI に **言語「日本語」を追加**するクライアントプラグインです。
共通 UI・設定画面・会話画面・左サイドバー (ワークスペース / セッション)・右パネル (ターミナル /
ブラウザー / ファイル / ドキュメントプレビュー / 成果物 / ジョブ / サブエージェント)・質問パネル・
計画・ゴール・自動化タスク・プラグイン管理・モデル選択・フィードバックまで、DSH が持つ
辞書の文言をすべて日本語にします。

- 設定 → 一般 → 言語 に「日本語」が並び、選ぶと即座に切り替わります。
- 日本語の訳語が無いキーは英語にフォールバックするので、**未訳の場所があっても表示は壊れません**。
- 対象は 56 名前空間 **2421 キー = 抽出した全文言** (カバレッジ 100%、訳語キーの誤りは 0 件)。
- 依存パッケージはありません (`npm install` 不要)。`lib/client.js` はビルド済みで同梱しています。
- 英語原文と日本語訳の**対照一覧 (TSV) を出力して手で直せる**ようにしてあります → [対照一覧で見直す](#対照一覧で見直す)

抽出済みの辞書はすべて訳してあるので、英語が混ざるのは DSH 本体が更新されて新しいキーが
増えたときだけです。検出は `npm run extract` → `npm run audit` で行います (→ [翻訳を足す](#翻訳を足す直す))。

---

## 動作の仕組み

DSH のロケール機構 (`@deepseek-ai/dsh-client-locale`) は、**外部プラグインから言語を追加できる**
設計になっています。このパックはそれを利用しているだけで、DSH 本体には手を入れません。

```js
// 言語そのものを追加する (fallback は登録済みの 'en' を指す必要がある)
ctx.locale.addLanguage({ id: 'ja', label: '日本語', fallback: 'en' })

// 名前空間ごとに日本語辞書を足す。register は (名前空間, 言語) の組で一意なので、
// 他パッケージが所有する名前空間でも「ja」だけなら自由に追加できる。
ctx.locale.register('common', 'ja', { cancel: 'キャンセル', close: '閉じる' })
```

補足:

- 訳語の検索は「名前空間 → 共通名前空間 (`common`) → キー文字列そのもの」の順に落ちます。
  言語側のチェーンは `ja → en` です。
- 言語一覧への反映は自動です。`addLanguage` がカタログを更新し、設定画面の言語行が
  そのスナップショットを描画します。
- 言語の並び順はカタログへの登録順で、順序を指定する API はありません
  (組み込みの 中文 / English の後ろに並びます)。

### クライアントバンドルの形式

ブラウザ側のモジュール機構は Node のモジュール解決を使いません。各プラグインの
`lib/client.js` は次の形のスクリプトで、`factory` は必要になった時点で遅延実行されます。

```js
window.__ModuleLoader__.load({
  id: 'dsh-locale-ja', // パッケージ名と一致させる
  factory: (require) => {
    const React = require('react') // プラットフォームのモジュール表から供給される
    return { inject: ['locale', 'slots'], apply(ctx) { /* … */ } }
  },
})
```

そのため tsdown などのビルド環境は不要で、`tools/build.mjs` が
`src/client/plugin.js` と `src/locales/*.ja.json` からこの形式を直接生成します。

---

## ファイル構成

| パス | 役割 |
| --- | --- |
| `CHECKLIST.md` | インストール後の目視確認チェックリスト (画面ごとの期待値) |
| `LICENSE` | MIT |
| `docs/` | 上流 (DSH 本体) へ伝えるための記録。例: `docs/upstream-agent-preset-card-header.md` |
| `package.json` | `dsh.bundle.patch` と `dsh.client.platform: web` を宣言 |
| `cordis.patch.yml` | プラグインのローダー行を 1 つ挿入するバンドル層 |
| `lib/index.js` | ホスト (Node) 側。ローダーに行を持たせるためだけの空プラグイン |
| `lib/client.js` | **生成物**。ブラウザ側バンドル (手で編集しない) |
| `src/client/plugin.js` | ブラウザ側プラグインの本体 (編集するのはここ) |
| `src/locales/<名前空間>.ja.json` | 名前空間ごとの日本語辞書 (編集するのはここ) |
| `tools/build.mjs` | バンドル生成 + VM 上での自己検証 |
| `tools/audit.mjs` | 訳抜け・存在しないキー・プレースホルダ不一致・複数行の構造不一致・幅の狭いラベルとカード見出しのバッジの長さ・用語の統一を点検 (`--strict` で未訳もエラー) |
| `tools/verify-locale.mjs` | **実物の** `LocaleRuntime` に対する結合検証 |
| `tools/review.mjs` | 対照一覧 (編集用 TSV / 閲覧用 Markdown) の出力と再取り込み |
| `tools/extract-dictionaries.mjs` | インストール済みプラグインから英語辞書を抽出 (監査の基準データ)。場所は `--dsh-modules` / `DSH_MODULES_ROOT` / 自動探索 |
| `tools/drift-report.mjs` | DSH 側の辞書が変わったかを、直前のコミットと比べて報告 (`npm run drift`) |
| `.github/workflows/dsh-drift.yml` | 毎日 1 回 DSH の辞書を再抽出して差分を確認し、変化があれば Issue を作って失敗する |
| `data/en-dictionaries.json` | 抽出結果 (56 名前空間 / 2421 キー) |
| `review/ja.md` | 索引。カバレッジ・要確認の一覧と各名前空間へのリンク |
| `review/<名前空間>.md` | 閲覧用。長文は Markdown として展開して表示 |
| `review/ja.tsv` | 編集用の対照一覧 (全 2421 行)。`ja` 列を直して取り込む |
| `review/<名前空間>.tsv` | 編集用 (名前空間ごと) |

---

## インストール

プロファイルは `~/.dsh/profiles/web` です。**GUI を再起動するまで反映されません。**

### 方法 A: `dsh plugin` を使う (推奨)

```sh
# pnpm が必要 (未導入なら: npm install -g pnpm / corepack enable pnpm)

# GitHub から (インストール画面が受け付けるのは パッケージ名 / GitHub のアドレス / ローカルディレクトリ の 3 つ)
dsh plugin --profile web add github:hokosugi/dsh-locale-ja

# 手元のディレクトリから (開発時)
dsh plugin --profile web add /path/to/dsh-locale-ja
```

このコマンドはプロファイル側で pnpm を実行し、`dsh.bundle` を宣言しているパッケージを
`dsh.profile.bundles` に自動で追加します。`cordis.patch.yml` を手で編集する必要はありません。

### 方法 B: pnpm を使わない手動導入

プロファイルの `node_modules` にリンクを張り、ローダー行を 1 つ足すだけです。

```sh
mkdir -p ~/.dsh/profiles/web/node_modules
ln -sfn /path/to/dsh-locale-ja ~/.dsh/profiles/web/node_modules/dsh-locale-ja
```

`~/.dsh/profiles/web/cordis.patch.yml` の末尾に追記します (既存の内容は残す):

```yaml
- insert:
    - id: dsh-locale-ja
      name: dsh-locale-ja
```

### 反映

```sh
dsh web   # 実行中の GUI を再起動する
```

ブラウザ側のバンドルはホストのモジュールグラフに載って配信されるため、
**新しいローダー行の追加はホストの再起動が必要**です (辞書の書き換えだけなら
`lib/client.js` の再生成 + ページ再読み込みで足ります)。

> 補足: `~/.dsh/profiles/web` はこのセッションのワークスペース外なので、
> エージェント権限 (`workspace-write`) のままでは書き換えできません。
> 上記コマンドをご自身で実行するか、承認を許可してください。

---

## 動作確認

1. `dsh web` で起動し、ブラウザで `http://127.0.0.1:3080` を開く。
2. ブラウザの言語が日本語なら、**起動時点で自動的に日本語**になります
   (`navigator.languages` が `ja` に一致するため)。
3. 設定 → 一般 → 言語 で「日本語」を選ぶ。以降は `$DSH_HOME` の設定に保存され、
   別のブラウザでも維持されます。
4. 同じ画面の一番下に「日本語ロケールパック」の行が出ます (このパック自身の表示)。

インストールせずに手元で確かめる場合:

```sh
cd dsh-locale-ja      # このパックのディレクトリ
npm run check         # ビルド + 監査 (--strict) + 実物ランタイムでの検証 (62 項目)
```

`npm run check` は `@deepseek-ai/dsh-client-locale` の **実際の `LocaleRuntime`** を
使い、次を検証します。

- 日本語ブラウザで `ja` が自動選択され、言語一覧のラベルが「日本語」になる
- `common` / `settings.*` / `conversation` / `chat` / `trajectory` と、`job` / `subagent` /
  `deliverables` / `sidebar*` / `question` / `model` / `feedback` / `pluginManager` / `cordis` /
  `plan` / `goal` / `open-in-app` / `workspace` / `schedule.*` など、訳した名前空間の訳語が返る
- プレースホルダ `{...}` が置換される (1 個の場合と複数の場合の両方)
- 訳していない名前空間は英語へ、どの辞書にも無いキーはキー自身へフォールバックする
- `en` / `zh` / `ja` の切り替えで訳語が入れ替わる
- 未登録の言語 ID は拒否される
- 言語の破棄 (プラグイン無効化に相当) で一覧から消える

---

## アンインストール / 戻し方

```sh
# 方法 A で入れた場合
dsh plugin --profile web remove dsh-locale-ja

# 方法 B で入れた場合
rm ~/.dsh/profiles/web/node_modules/dsh-locale-ja
# 併せて cordis.patch.yml から dsh-locale-ja の insert 行を削除
```

その後 `dsh web` を再起動します。言語の選択が「日本語」のまま残っていても、
定義が無い言語は英語に落ちるだけで壊れません (設定 → 一般 → 言語 で選び直せます)。

---

## ワークスペースを iCloud の外へ移す

macOS で「iCloud Drive → デスクトップと書類フォルダ」を有効にしていると、`~/Documents` 配下は
自動的に iCloud に同期されます。DSH 自身の状態 (`~/.dsh`: セッション・添付・認証情報) は
同期されませんが、**作業ディレクトリを `~/Documents` に置いていると、その中身が同期対象**に
なります (同期の遅延・コンフリクト、ストレージ最適化でファイルが読めなくなる等の影響が出ます)。

`docs/move-out-of-icloud.sh` が、ワークスペースを `~/dev/deepseek-harness` などへ移して
プラグインのリンクを張り直します。

```sh
cp /path/to/dsh-locale-ja/docs/move-out-of-icloud.sh /tmp/
bash /tmp/move-out-of-icloud.sh          # 移動先は ~/dev/deepseek-harness
bash /tmp/move-out-of-icloud.sh ~/work   # 親ディレクトリを指定する場合
```

スクリプトは「コピー → 内容の一致確認 → 確認のうえ元を削除 → プラグインの再リンク → 検証」の
順に進み、途中で失敗しても元のフォルダは残ります。実行後は `dsh web` を再起動し、新しい
ワークスペースでセッションを作り直してください (言語設定 `ja` は `$DSH_HOME` 側なので維持されます)。

---
## 配布 (publish)

**配布は GitHub のみです。npm には公開していません。**

- GitHub: [hokosugi/dsh-locale-ja](https://github.com/hokosugi/dsh-locale-ja) — ソースと対照一覧
  (`review/`)。`dsh plugin --profile web add github:hokosugi/dsh-locale-ja` で入ります。
- npm: 2026-10-04 に `dsh-locale-ja@1.0.0` を公開しましたが、配布物に個人の絶対パスが
  含まれていたため**取り下げました**。`1.0.0` という版番号は再利用できず、全版を取り下げたので
  **24 時間は同名で再公開できません** (再開するなら `1.0.1` 以降)。

`files` に `src` / `tools` / `data` を含めているので、受け取った人は `npm run check` で
再検証・再ビルドできます (`review/` は生成物なので配布物には入れていません。`npm run review` で
再生成できます)。`data/en-dictionaries.json` (抽出済みの英語辞書) は同梱しているので、
DSH を更新したときの差分確認もそのまま行えます。

### 版を上げて配布するとき (GitHub)

1. 訳語やコードを直して `npm run check` を通す
2. 版を上げて、タグと一緒に push する
   ```sh
   npm version patch        # 例: 1.0.1 (minor / major も可。タグも自動で付きます)
   git push && git push --tags
   ```
   GitHub からのインストールは既定ブランチを見るので、push した時点で最新になります。

### npm にも出す場合 (任意)

- `npm publish` の直前に `prepublishOnly` が `npm run check` と `npm run scan -- --identity` を
  実行します (**通らない版は公開できません**)。2FA はブラウザー + Touch ID で承認します。
- **同じ版は再公開できません。** 必ず `npm version` で上げてから。
- いったん全版を取り下げているため、同名で publish できるようになるまで **24 時間**かかります。
- npm のキャッシュが root 所有で `EPERM` になるときは `--cache /tmp/npm-cache-ja` を付けます。

### 名前を変える場合

`package.json` の `name` を変えるときは、次の 3 か所を**同じ名前**に揃えてください
(ローダー行の `id` / `name` はパッケージ名と一致している必要があります)。

- `package.json` の `name`
- `cordis.patch.yml` の `insert[].id` と `insert[].name`
- インストール先プロファイルの `node_modules/<名前>` のリンク名

---

## 個人情報・秘密情報を混ぜない

公開リポジトリと npm 配布物に、手元の環境や個人が特定できる情報を残さないための決まりごとです。
詳しくは [SECURITY.md](SECURITY.md) にあります。

### 守ること

- **絶対パスを書かない。** `/Users/<名前>/...` や `C:\Users\<名前>\...` の代わりに `$HOME` / `os.homedir()` を使います。
  DSH の場所は [tools/dsh-modules.mjs](tools/dsh-modules.mjs) の `findDshModules()` が自動で探すので、
  パスを埋め込む必要はありません。
- **コミットのメールアドレスは GitHub の noreply にする。**
  ```sh
  git config user.email "<GitHub のユーザー名>@users.noreply.github.com"
  ```
- **手元だけの語は `.personal-terms` に書く** (gitignore 済み)。人名・社内パス・固有 ID など、
  点検で拾いたい語を 1 行ずつ書きます。
- **秘密情報は置かない。** トークン・鍵・`.env` は入れません (`.gitignore` で除外済み)。
- 配布物は `package.json` の `files` で絞ります (現在: `lib` / `src` / `tools` / `data` / `docs` /
  README / CHECKLIST / LICENSE / cordis.patch.yml)。

### 点検する

```sh
npm run scan                # 追跡ファイルを点検 (個人パス・メール・秘密情報 + 実行環境のユーザー名)
npm run scan -- --all       # 未追跡ファイルも点検
npm run scan -- --history   # git 履歴の中身も点検 (既定では警告のみ)
npm run scan -- --identity  # コミットのメール設定も点検 (noreply 以外はエラー)
```

- パターンそのものを説明したい行（この節のように）には `personal-info-allow` と書くと点検から除外されます。
- `npm publish` の直前に `prepublishOnly` が **`npm run check` と `npm run scan -- --identity` を
  自動実行**するので、点検を通らない版は公開できません。
- GitHub Actions ([.github/workflows/ci.yml](.github/workflows/ci.yml)) も push / PR ごとに
  `npm run scan` と `npm run check` を実行します。
- リポジトリ側では GitHub の **secret scanning / push protection** を有効にしてあります
  (秘密情報を含む push は GitHub が拒否します)。

### もし混ざって公開してしまったら

1. 秘密情報なら**まず無効化・ローテーション** (公開を取り消しても、取得された可能性は消えません)。
2. npm: **先に修正版を publish** → そのあと `npm unpublish <pkg>@<漏れた版>`。
   逆順だとパッケージごと消えて**名前が 24 時間ロック**されます (`package@version` は再利用できません)。
3. git 履歴: `git filter-branch` などで書き換えて `git push --force`
   (GitHub 側のキャッシュや他者の clone には残りえます)。
4. 再発防止に `npm run scan` のパターンを足すか、`.personal-terms` に語を追加します。

## DSH が更新されたとき

このパックは DSH の**辞書のキー**に依存しています。DSH が変わったときに何が起きるかは、
変化の種類で分かれます。

| DSH 側の変化 | `npm run check` | やること |
| --- | --- | --- |
| キーが**増えた** | **失敗する** (監査 `--strict` が未訳をエラーにする) | `npm run audit -- --missing <名前空間>` で原文を見て訳を足す |
| キーが**消えた / 名前が変わった** | **失敗する** (`存在しないキー` エラー) | そのキーを辞書から消す (または名前を合わせる) |
| **英語の文面だけ**変わった (キーは同じ) | 通ってしまう | `npm run drift` の差分を見て、訳語が古くなっていないか見直す |
| プラグインの**画面レイアウト**が変わった | 通ってしまう | [CHECKLIST.md](CHECKLIST.md) の目視確認をもう一度 |
| プラグイン **API (slot / locale)** が変わった | **失敗する** (実物 `LocaleRuntime` の検証) | 失敗メッセージに従って `src/client/plugin.js` を直す |

つまり「全部やり直し」ではなく、**失敗した所だけ足す・消す・直す**で済みます。英語の文面だけの
変更とレイアウトの変更は自動では検知できないので、下の通知と目視で拾います。

### 更新に気づく方法

1. **毎日 1 回の自動チェック (このリポジトリに設定済み)**
   [`.github/workflows/dsh-drift.yml`](.github/workflows/dsh-drift.yml) が、GitHub のランナーで
   最新の DSH を入れて辞書を再抽出し、コミット済みの `data/en-dictionaries.json` と比べます。
   差分があれば **Issue を作り、ワークフローを失敗させます** (失敗は GitHub から通知が届き、
   直って成功に戻ったときも通知されます)。手動で走らせるなら GitHub → Actions →
   `DSH drift` → Run workflow。
   先行版 (`alpha`) まで早く見たい場合は、ワークフローの `npm install -g @deepseek-ai/dsh` を
   `@deepseek-ai/dsh@alpha` に変えます。

   ローカルで同じ確認をするときは:

   ```sh
   npm run extract     # 最新の DSH から辞書を再抽出
   npm run drift       # 直前のコミットとの差分を表示 (--fail-on-change で CI 向け)
   ```

2. **DSH のリリースを見る (早めの予告)**
   [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) を
   **Watch → Releases** にすると、新しいタグ (`dsh-v0.2.1-alpha.1` など) が出たときに通知が来ます。
   RSS なら <https://github.com/deepseek-ai/deepseek-harness/releases.atom>。
   リポジトリのタグは npm の `latest` より**先行**することがあるので、早めに気づけます
   (例: タグは `dsh-v0.2.1-alpha.1` まで出ていますが、npm の `latest` は `0.2.0-rc.2` のまま)。

### 訳を足す手順 (いつも同じ)

```sh
npm run extract      # 1. 最新の DSH から英語辞書を再抽出
npm run drift        # 2. 何が変わったかを見る (任意)
npm run audit        # 3. 未訳・存在しないキーを確認
npm run review       # 4. 対照一覧を更新 → review/ja.tsv の ja 列を直して review:apply
npm run check        # 5. ビルド + 監査 (--strict) + 実物ランタイム検証
```

訳を足したら [CHECKLIST.md](CHECKLIST.md) の目視確認も一度通し、`npm version patch` で
[公開](README.md#公開-publish) します。

`npm run check` の監査は `--strict` なので、**訳していないキーが 1 つでもあると失敗します**
(どの名前空間に何キー残っているかをエラーに表示します)。

## 対照一覧で見直す

英語原文と日本語訳を並べた一覧を出力し、**手で直して取り込めます**。用途別に 2 種類あります。

| 種類 | ファイル | 用途 |
| --- | --- | --- |
| 編集用 (TSV) | `review/ja.tsv` / `review/<名前空間>.tsv` | `ja` 列を直して取り込む。表計算ソフトでも編集可 |
| 閲覧用 (Markdown) | `review/ja.md` / `review/<名前空間>.md` | 目で追って確認する。長文は実際の見え方で展開 |

```sh
npm run review                      # TSV と Markdown をまとめて出力
npm run review:apply                # review/ja.tsv の ja 列を辞書へ反映

node tools/review.mjs export --only chat,conversation   # 対象を絞って出力
node tools/review.mjs export --with-zh                  # 参考として中国語列を足す
node tools/review.mjs import review/chat.tsv            # 個別ファイルだけ反映
```

### 閲覧用 Markdown の構成

- `review/ja.md` — 索引。カバレッジ、**要確認の一覧**、名前空間ごとのリンク。
- `review/<名前空間>.md` — 本文。キーごとに `確認` / `キー` / `英語` / `日本語` の表
  (`- [ ]` は未確認、`- [!]` は要確認)。
- **複数行の文言は表に押し込まず展開**します。`settings.agentPreset` のガイド文のように
  `###` や `>` を含む値は、実際に描画される形 (引用ブロック) で表示し、英語原文は
  `<details>` に折りたたんで併記します。

```
### `guideStandardExplanation`

**日本語訳** — UI では次のように描画されます

> ### 仕組み
>
> Agent はツールを直接呼び出して、……

<details><summary>英語原文</summary>

（英語原文を markdown コードブロックで折りたたみ）

</details>
```

`review/*.md` は**閲覧専用**です。ここを直しても反映されません (反映は TSV か JSON から)。

### TSV の列

| 列 | 意味 |
| --- | --- |
| `namespace` | 名前空間 (ファイル名でもある) |
| `key` | 辞書キー |
| `en` | 英語原文 (基準データから取得) |
| `ja` | **日本語訳。ここを直す** |
| `status` | `ok` / `missing` (未訳) / `empty` (空) / `identical` (英語と同一) / `placeholder-mismatch` / `unknown-key` |

改行は `\n`、タブは `\t` として 1 行 1 レコードに収めてあり、取り込み時に元へ戻ります
(`settings.agentPreset` の長文も 1 行で入ります)。**セル内で Enter は押さないでください**
(段落を分けるときは `\n\n` と書く)。押してしまった場合も取り込みは安全に失敗します。

### 取り込み時の検証

`review:apply` は書き込む前に全行を検証し、**1 件でも問題があれば 1 バイトも書かずに中止**します。

- 存在しない名前空間・キー → エラー
- プレースホルダ (`{count}` など) が英語原文と不一致 → エラー
- 空の訳語 (英語原文が空でないのに空) → エラー
- 英語原文が基準データと違う / 訳語が英語と同一 → 警告のみ

既定は**マージ**です。TSV に書かれている行だけを追加・更新し、書かれていないキーは触りません
(一部の行だけの一覧を取り込んで残りを消す事故を防ぐため)。TSV を正としてキーを削除したい
ときだけ `--prune` を付けます。

```sh
node tools/review.mjs import --prune    # TSV に無いキーは削除する
```

直したあとは `npm run check` でビルドと検証まで通してください。

---

## 翻訳を足す・直す

```sh
cd dsh-locale-ja      # このパックのディレクトリ

npm run extract                    # インストール済み DSH から英語辞書を再抽出 (更新時)
npm run drift                      # DSH 側の差分を表示 (更新時)
npm run audit                      # カバレッジ一覧と誤り検出 (未訳は許容)
npm run audit:strict               # 未訳もエラーにする (--strict)
npm run audit -- --all             # 未対象の名前空間も一覧
npm run audit -- --missing chat    # 未訳キーと英語原文を列挙

# 例: 未対象の pluginManager を訳す
#   1) npm run audit -- --missing pluginManager で原文を出す
#   2) src/locales/pluginManager.ja.json を作る (ファイル名 = 名前空間)
#      …あるいは npm run review で TSV を出し、ja 列を書いて npm run review:apply
npm run check                      # ビルド + 監査 (--strict) + 実物ランタイムでの検証
```

`npm run build` は次を守ります。

- `src/locales/*.ja.json` のファイル名 = 名前空間名。抽出済みの一覧に無い名前空間は**エラー**。
- 存在しないキー (綴り間違い) は**エラー**。未訳キーは許容 (英語にフォールバック)。
- 生成したバンドルを VM で実行し、`addLanguage` の内容と全辞書の登録がソースと
  一致することを確認してから書き出す。

インストールして画面を見ながら直すときは、`src/` の変更を監視して自動再ビルドします
(ブラウザーは再読み込みすれば新しい `lib/client.js` を拾います)。

```sh
npm run dev      # src/ を監視して lib/client.js を再生成し続ける
```

DSH を更新して文言が変わった場合は、基準データを作り直します。

```sh
npm run extract     # インストール済みプラグインから英語辞書を再抽出
npm run audit       # 差分 (新キー・消えたキー) を確認
```

`tools/extract-dictionaries.mjs` は各パッケージの `lib/client.js` を VM 上で
materialize し、スタブ `ctx` で `apply()` を走らせて `locale.register` の引数を
そのまま記録します (実行時と同じ経路で辞書を集めるため、原文の取り違えが起きません)。

---

## 用語の統一

短い UI ラベルは、同じ英語なら同じ日本語にします。`tools/audit.mjs` の `GLOSSARY` が
**英語と完全一致する値**だけを検査するので、文中に埋め込まれた語 (`Refresh current page` など) は
対象外です。`Reload` → 再読み込み / `Refresh` → 更新 / `Retry` → 再試行 / `Collapse` → 折りたたむ /
`Running` → 実行中 / `Failed` → 失敗 / `Completed` → 完了 / `Cancelled` → キャンセル済み など。
語の一覧は `tools/audit.mjs` にあり、揺れると `npm run audit` がエラーにします。

**文脈で意図的に訳し分けている語**は検査対象から外しています。触る前に理由を確認してください。

| 英語 | 訳し分け | 理由 |
| --- | --- | --- |
| `Model` | モデル / 生成 | 軌跡タイムライン左のガターは幅 44px で「モデル」が折り返すため「生成」 |
| `Once` | 1 回のみ / 1 回 | 頻度の表示は「1 回のみ」、選択肢のラベルは「1 回」 |
| `Inactive` | 停止 / 非アクティブ / 終了 | チームメンバーは「停止」、セッション詳細は「非アクティブ」、自動化タスクは「終了」 |
| `Ready` | 開始可能 / 準備完了 | 共有タスクは「開始可能」、プラグインと実行カードは「準備完了」 |
| `Pending` | 待機中 / 未着手 | タスクの状態は「待機中」、ToDo は「未着手」 |
| `Compact` | 圧縮 / コンパクト | `/compact` コマンドは「圧縮」、表示密度の設定は「コンパクト」 |
| `Stopped` | 停止 / 停止しました | ツール行の状態は「停止」、メッセージは「停止しました」 |
| `Inspect` | 呼び出しを確認 / 詳細を表示 | ツール呼び出しは「呼び出しを確認」、Cordis の実行カードは「詳細を表示」 |
| `{count} background jobs` | バックグラウンドジョブ {count} 件 / {count} 件のジョブ | ヘッダーのバッジは幅が厳しいので短縮 (ポップオーバー側は長い方) |
| `{y}-{m}-{d}` | `{y}-{m}-{d}` / `{y}年{m}月{d}日` | チャットの時刻は詰まった場所に出るため ISO のまま、ホバーカードは年月日 |

## 既知の制約

- **幅の狭い固定枠のラベルは 2 文字まで。** 軌跡タイムライン左のレーン名は幅 44px のガターに
  `white-space: nowrap` なしで入るため、日本語は 1 文字ずつ折り返して行が重なり表示が壊れます
  (2026-10-01 に「モデル / ツール」→「生成 / 実行」へ修正)。`npm run audit` が長さを検査します。
- **Agent プリセットのカード見出しは 1 行に詰め込まれます。** 見出しは [名前] [バッジ] [id] が
  同じ行に並び、バッジ (`Tag`) は `white-space: nowrap` で縮まないため、バッジが長いと
  プリセット名のほうが押し出されて「標準モード」が 1 文字しか見えなくなります
  (2026-10-01 に既定バッジを「新しいタスクの既定」→「既定」へ短縮)。同じキー (`inUse`) は
  カードの `title` / `aria-label` にも使うため、短くしても意味が通る語を選んでいます。
  これは DSH 本体側のレイアウトの問題で、パックでは直せません (CSS モジュールのクラス名が
  ハッシュなので上書きは次の更新で壊れます)。**上流への報告文と修正案 (`.cardIdentity` に
  `flex-wrap: wrap` を足す) は [docs/upstream-agent-preset-card-header.md](docs/upstream-agent-preset-card-header.md)**。
  長いカスタムプリセット名 (全角 9 文字以上) は今も切れます。
- **ジョブ一覧の件数バッジはセッションのヘッダー (タイトルの横) に並びます。** 実行中の件数は
  「{count} 件のジョブが実行中」のように、同じ行のプリセット名を押し出さない長さにしています
  (`background` はバッジでは省き、ポップオーバーの見出しと `aria-label` で補っています)。
  折り返しや省略の指定がないため、長くするとヘッダーが崩れます。
- **右パネルまわりの語彙は揃えています。** `sidebarRight` / `sidebarFiles` / `sidebarTerminal` で
  ペイン / 分割 / スタート / 全画面表示 / 再読み込み / 自動更新 / 先にセッションを選択してください、
  に統一しました。同じ英語 (`Reload` / `Auto refresh` / `Select a session first` /
  `Two panes is the limit`) は `sidebarBrowser` / `sidebarDocumentPreview` にもあるので、
  それらを訳すときも同じ語を使ってください。
- **サブエージェントの期間・トークンは幅 10px のメトリクス欄に入ります。** 折り返しなしの
  右寄せなので、「約 {months} か月」のような単位でも収まる語を選んでいます。
- **プラグイン管理は npm の語彙に寄せています。** レジストリ / コンポーネント / 有効化・無効化 /
  アンインストール / インストール元、と統一しました (`Registry` は「インストール元」ではなく
  「レジストリ」で、公式 npm レジストリ / 中国本土のミラー と並べています)。
- **コマンドの別名 (`command.token.*`) は英語のままにしています。** これは入力する別名として
  コマンド解決に使われ、別名表 (`TOKEN_ALIASES`) は zh / en しか登録しないため、日本語にすると
  メニューの表示と実際に打てる名前が食い違います。
- **言語の並び順は変えられません。** カタログ登録順で、組み込みの 中文 / English の後ろです。
- **プラグイン名や説明文は対象外です。** それらは名前空間辞書ではなく
  `locale.resolveText` / `LocalizedText` という別系統で解決されます。
- **`ja` を登録できるのは 1 パックだけです。** 同じ名前空間に 2 つ目の `ja` を登録すると
  `register` が例外を投げます。このパックはそれを捕まえて警告を出すだけで、
  残りの辞書は有効なままにします。
- **登録時に取り込まれた文字列は言語を切り替えても変わりません。** スロットの描画経路に
  乗らないテキスト (コマンド登録時の説明文など) は、その言語で登録されたままになります。
  これは DSH 側の既知の制約です。
- 対象は Web GUI です。デスクトップ専用の設定画面 (`settings.account` など) はクライアント側に
  辞書を持たないため、そもそも抽出対象に入りません。
- **抽出はバンドルを VM で実行するため、React のクラスを継承しているバンドルで失敗することがあります。**
  `class X extends React.Component` を書いているパッケージは、スタブを実クラスにしないと
  `materialize failed` になり、その名前空間の辞書が丸ごと抜けます (2026-10-02 に `workspace` が
  これで抜けていたのを修正)。`npm run extract` の最後に出る「完全には実行できなかったパッケージ」を
  必ず確認してください。

## 今後の拡張候補

**未対象はありません** (`data/en-dictionaries.json` の 56 名前空間 / 2421 キー = 100%)。

DSH 本体が更新されたときの進め方は [DSH が更新されたとき](#dsh-が更新されたとき) にまとめて
あります (何が失敗するか / 通知の受け取り方 / 訳を足す手順)。現状のカバレッジは
`npm run audit -- --all` で確認できます (全体 2421 / 2421 キー = 100%)。
