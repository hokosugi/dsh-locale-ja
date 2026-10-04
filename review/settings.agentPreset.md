# settings.agentPreset — 日本語訳レビュー

訳済み **41 / 41** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 複数行の文言 (Markdown として描画されるもの)

### `guideStandardExplanation`

**日本語訳** — UI では次のように描画されます

> ### 仕組み
>
> Agent はツールを直接呼び出して、ファイルの読み書き・検索・ターミナルコマンドの実行を行います。スキル、計画、ゴール、サブエージェント、ワークフロー、コンテキスト圧縮を利用できます。
>
> ### どんなときに選ぶか
>
> 日々のコーディング、ファイル作業、調査はここから始めるとよいでしょう。標準モードでもスクリプトを書いてファイルを一括処理できます。PTC が変えるのはツール呼び出しの組み立て方であり、一括処理に必須のものではありません。

<details><summary>英語原文</summary>

```markdown
### How it works

The agent calls tools directly to read and edit files, search, and run terminal commands. It includes Skills, planning, goals, subagents, workflows, and context compaction.

### When to choose it

Start here for everyday coding, file work, and research. Standard mode can also write scripts and process files in batches. PTC changes how tool calls are organized; it is not required for batch tasks.
```

</details>

### `guideStandardUsage`

**日本語訳** — UI では次のように描画されます

> ### バグを修正する
>
> > 検索フォームを続けて 2 回送信すると結果が消える原因を突き止めて修正し、関連するテストを実行してください。原因と変更内容も説明してください。
>
> 期待する成果: コードの変更、関連テストの結果、原因の説明。
>
> ### プロジェクトの記録を整理する
>
> > このプロジェクトの Markdown の記録を読み、合意済みの決定事項と未解決の論点を、参照元ファイルへのリンク付きでまとめてください。
>
> 期待する成果: 元の記録と突き合わせられる、出典付きの要約。

<details><summary>英語原文</summary>

```markdown
### Fix a bug

> Find out why submitting the search form twice makes the results disappear. Fix it and run the relevant tests. Explain the cause and what changed.

Expected output: a code change, the relevant test results, and an explanation of the cause.

### Organize project notes

> Read the Markdown notes in this project. Summarize the agreed decisions and open questions, with links to the source files.

Expected output: a summary with references that you can check against the original notes.
```

</details>

### `guidePtcExplanation`

**日本語訳** — UI では次のように描画されます

> ### ツールの呼び出され方
>
> PTC は Programmatic Tool Calling、つまりプログラムからツールを呼び出す方式です。この内蔵プリセットでは、Agent が run_code で TypeScript プログラムを書き、生成された SDK を通してツールを呼び出します。プログラムではループ、条件分岐、エラー処理、並行呼び出しを適切に使えます。
>
> ### モデルに届くもの
>
> ツールの結果はいったんプログラムに渡り、そこで絞り込みや合成ができます。モデルが受け取るのは、プログラムが出力または返した内容です。画像の結果は別途添付されます。プログラム内のツール呼び出しも記録され、ツールの権限設定に従います。
>
> ### 標準モードとの違い
>
> どちらのモードもコーディングや一括処理を扱えます。標準モードは個々のツールをそのままモデルに渡し、PTC はツール呼び出しをコードで組み立てます。現在の PTC プリセットでは workflow ツールが無効になっています。速度とトークン消費は、タスクと結果の扱い方によって変わります。

<details><summary>英語原文</summary>

```markdown
### How tools are called

PTC means Programmatic Tool Calling. In this built-in preset, the agent uses run_code to write a TypeScript program that calls tools through a generated SDK. The program can use loops, conditions, error handling, and concurrent calls where appropriate.

### What reaches the model

Tool results first reach the program, which can filter and combine them. The model receives what the program prints or returns; image results are attached separately. Nested tool calls are still recorded and remain subject to tool permissions.

### Compared with Standard mode

Both modes can handle coding and batch tasks. Standard mode exposes individual tools directly; PTC organizes tool calls in code. The current PTC preset leaves the workflow tool disabled. Speed and token use depend on the task and how the program handles its results.
```

</details>

### `guidePtcUsage`

**日本語訳** — UI では次のように描画されます

> ### 設定ファイルを一括で検査する
>
> > configs/ 配下の JSON をすべて検査し、schema.json と照らして不足している必須項目と不正な値を挙げてください。問題ごとに CSV の 1 行として保存してください。読めなかったファイルも報告に含め、残りの検査は続けてください。元のファイルは変更しないでください。
>
> 期待する成果: 問題の要約と CSV レポート。同じ検査を繰り返し実行し、個々の失敗に対処して結果を集約できます。
>
> ### エラーログを集計する
>
> > logs/ のログを解析し、サービスとエラー種別ごとに件数をまとめてください。出現回数の多い上位 10 グループと、それぞれ 1 件の例を示してください。完全な件数は CSV に保存してください。
>
> 期待する成果: 頻出エラーの要約と完全な件数表。中間データはプログラム側で集約してから、要約だけをモデルに渡せます。

<details><summary>英語原文</summary>

```markdown
### Check a set of configuration files

> Check all JSON files in configs/. List missing required fields and invalid values against schema.json. Save a CSV with one row per issue. Include unreadable files in the report and keep checking the rest. Leave the original files unchanged.

Expected output: an issue summary and a CSV report. The program can repeat the same checks, handle individual failures, and collect the results.

### Summarize error logs

> Analyze the log files in logs/. Group errors by service and error type. Show the ten most frequent groups and one example from each. Save the full counts to a CSV.

Expected output: the top error groups and a complete count table. Intermediate data can be aggregated in the program before the summary reaches the model.
```

</details>

### `guideMinimalExplanation`

**日本語訳** — UI では次のように描画されます

> ### 含まれるもの
>
> 永続シェルツールが 1 つと、固定のシステムプロンプトだけです。この内蔵プリセットはスキル、計画、コンテキスト圧縮、標準のランタイムコンテキストを読み込みません。
>
> ### どんなときに選ぶか
>
> 実験や比較の基準として使います。シェルコマンドを通してファイルを読み、スクリプトを実行することはできますが、長いタスクを管理するための組み込みの手段は少なくなります。ツールが少ないことが、初心者にとって簡単という意味ではありません。

<details><summary>英語原文</summary>

```markdown
### What is included

One persistent shell tool and a fixed system prompt. The built-in preset does not load Skills, planning, context compaction, or the standard runtime context.

### When to choose it

Use it as a baseline for experiments and comparisons. It can still read files and execute scripts through shell commands, but offers fewer built-in ways to manage a long task. Fewer tools does not necessarily make it easier for a beginner.
```

</details>

### `guideMinimalUsage`

**日本語訳** — UI では次のように描画されます

> ### 小さな修正での性能を比較する
>
> > このプロジェクトのテストを実行し、失敗の原因を特定して最小限の修正を加えてください。関連するテストをもう一度実行し、結果を報告してください。
>
> 同じ初期状態から、同じタスクを標準モードと最小モードで別々に実行します。完了状況、ツール呼び出し、最終的な変更を比較してください。最小モードはターミナルコマンドを通して作業します。

<details><summary>英語原文</summary>

```markdown
### Compare performance on a small bug fix

> Run the tests for this project, find the cause of the failure, and make the smallest fix. Run the relevant tests again and report the result.

Run the same task separately in Standard and Minimal modes from the same starting state. Compare task completion, tool calls, and the resulting changes. Minimal mode performs the work through terminal commands.
```

</details>

### `guideCordisExplanation`

**日本語訳** — UI では次のように描画されます

> ### 何を作れるか
>
> 創造モードには標準のタスク用ツールに加えて、実行時の調査、プラグインの永続的な管理、Cordis プラグインと Agent プリセットを作るためのガイドが含まれます。機能や UI を追加するプラグインも、特定の作業向けにツールとプロンプトを組み合わせたプリセットも作れます。
>
> ### プラグインとモード
>
> プラグインは DSH に機能を追加します (ツール、サービス接続、UI の入口など)。モードは Agent プリセットであり、タスクで使うツールを選び、Agent の動き方を決めます。自作のプラグインをカスタムプリセットに含めることもできます。
>
> ### 成果を反映させるには
>
> ソースコードを生成させるだけでなく、インストールと動作確認まで Agent に依頼してください。変更内容によっては即座に読み込まれる場合と再起動が必要な場合があります。新しく作ったプリセットは、新しいタスクを始めるときに選べます。

<details><summary>英語原文</summary>

```markdown
### What you can create

Creator mode includes the standard task tools plus runtime inspection, persistent plugin management, and guidance for authoring Cordis plugins and agent presets. It can create a plugin that adds a capability or UI, or a preset that combines tools and prompts for a particular job.

### Plugins and modes

A plugin adds capabilities to DSH, such as a tool, a service connection, or a UI entry. A mode is an agent preset that selects tools and defines how the agent works in a task. A plugin can be included in a custom preset.

### How the result takes effect

Ask the agent to install and verify the result, not just generate source code. A plugin may load immediately or require a restart, depending on what it changes. A newly created preset is selected when starting a new task.
```

</details>

### `guideCordisUsage`

**日本語訳** — UI では次のように描画されます

> ### UI を追加する
>
> > サイドバーに「プロジェクトノート」の入口を追加する DSH プラグインを作ってください。このワークスペースの Markdown ファイルを一覧でき、選んだノートをプレビューできるようにしてください。インストールまで行い、ページが開くことを確認してください。
>
> 期待する成果: 動作する入口とプレビューページを備えた、インストール済みのプラグイン。残っている有効化手順があればそれも示します。
>
> ### ツールを追加する
>
> > このプロジェクトのテストレポートを読み、失敗したテストを要約するツールを提供するプラグインを作ってください。登録し、サンプルのレポートで動作を確認してください。
>
> 期待する成果: 呼び出せるツールを持つプラグインと、サンプル呼び出しの確認結果。
>
> ### 自分のモードを作る
>
> > 標準モードを基に「コードレビュー」モードを作ってください。潜在的なバグとテストの不足を優先して確認し、ファイルパスと行番号を示し、ファイルを変更する前に確認するようにしてください。選択できるプリセットとして保存してください。
>
> 期待する成果: 新しいタスクで選べるカスタムプリセット。レビューの指示は Agent を導くもので、実際に実行できる操作は権限設定で決まります。

<details><summary>英語原文</summary>

```markdown
### Add a UI

> Create a DSH plugin that adds a project notes entry to the sidebar. Let me browse the Markdown files in this workspace and preview a selected note. Install it and verify that the page opens.

Expected output: an installed plugin with a working entry and preview page, plus any remaining activation steps.

### Add a tool

> Create a plugin with a tool that reads this project’s test report and summarizes the failed tests. Register it and verify it with a sample report.

Expected output: a plugin with a callable tool and a verified sample call.

### Create my own mode

> Create a “Code review” mode based on Standard mode. Have it prioritize potential bugs and test gaps, cite file paths and lines, and ask before modifying files. Save it as a selectable preset.

Expected output: a custom preset for new tasks. These review instructions guide the agent; permission settings determine which actions it can execute.
```

</details>

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `modeExplanation` | Mode details | モードの説明 |
| - [ ] | `howToUse` | How to use | 使い方 |
| - [ ] | `guideSections` | Guide sections | ガイドの内容 |
| - [ ] | `guideExampleTask` | Example task | タスク例 |
| - [ ] | `guideCopy` | Copy | コピー |
| - [ ] | `guideCopied` | Copied | コピーしました |
| - [ ] | `guideFootnotes` | Footnotes | 脚注 |
| - [ ] | `guideStandardIntro` | Choose Standard mode when starting a new task. Describe what you want to accomplish, point to the relevant files, and explain how to check the result. | 新しいタスクを始めるときは標準モードを選びます。達成したいことを説明し、関連するファイルを示し、結果の確認方法を伝えてください。 |
| - [ ] | `guidePtcIntro` | Choose PTC mode when starting a new task. Specify the input files, processing rules, and output format. The agent writes the code. | 新しいタスクを始めるときは PTC モードを選びます。入力ファイル、処理ルール、出力形式を指定してください。コードは Agent が書きます。 |
| - [ ] | `guideMinimalIntro` | Choose Minimal mode for a new task. For a comparison, hold the model, permissions, input, and starting workspace state constant across runs. | 新しいタスクでは最小モードを選びます。比較実験をするときは、モデル・権限・入力・ワークスペースの初期状態を実行間でそろえてください。 |
| - [ ] | `guideCordisIntro` | Choose Creator mode for a new task. Describe the capability you want, where it should appear, and how you will verify it. | 新しいタスクを始めるときは創造モードを選びます。追加したい機能、それをどこから使うか、どう検証するかを説明してください。 |
| - [ ] | `builtInGroup` | Built-in | 組み込み |
| - [ ] | `customGroup` | Custom | カスタム |
| - [ ] | `sectionIntro` | Choose the agent’s tools and how it works. Use Standard mode for everyday tasks, or Creator mode to add capabilities to DSH. | Agent が使うツールと動き方を選びます。日常的なタスクには標準モード、DSH に機能を足すなら創造モードです。 |
| - [ ] | `seatHint` | Choose the agent preset for your new task | 新しいタスクで使う Agent プリセットを選択 |
| - [ ] | `headerHint` | The agent preset chosen when this task started | このタスクの Agent プリセット (タスク開始時に確定します) |
| - [ ] | `nav` | Agent presets | Agent プリセット |
| - [ ] | `setDefault` | Set as new task default | 新しいタスクの既定にする |
| - [ ] | `view` | View configuration | 設定を見る |
| - [ ] | `presetStandardName` | Standard mode | 標準モード |
| - [ ] | `presetStandardDescription` | Work with code, files, and information. Suitable for most tasks, with search, editing, terminal commands, and other tools available as needed. | コード、ファイル、資料を扱います。ほとんどのタスクに適しており、必要に応じて検索・編集・ターミナルなどのツールを使えます。 |
| - [ ] | `presetPtcName` | PTC mode | PTC モード |
| - [ ] | `presetPtcDescription` | Includes all Standard mode capabilities. Better suited to tasks that call tools in batches and then filter, organize, deduplicate, count, or summarize the results. | 標準モードのすべての機能を含みます。ツールをまとめて呼び出し、その結果を絞り込み・整理・重複排除・集計・要約するタスクに向いています。 |
| - [ ] | `presetMinimalName` | Minimal mode | 最小モード |
| - [ ] | `presetMinimalDescription` | The agent works using only a terminal tool. Useful for testing and comparing its basic performance. | Agent はターミナルツールだけを使って作業します。基本的な性能の測定や比較に適しています。 |
| - [ ] | `presetCordisName` | Creator mode | 創造モード |
| - [ ] | `presetCordisDescription` | Customize DSH through conversation. Let the agent write plugins that add features or UI, or combine tools and prompts to create your own mode. | 会話を通して DSH をカスタマイズします。機能や UI を追加するプラグインを Agent に書かせたり、ツールとプロンプトを組み合わせて自分のモードを作ったりできます。 |
| - [ ] | `inUse` | New task default | 既定 |
| - [ ] | `noDescription` | No description. | 説明はありません。 |
| - [ ] | `brokenBadge` | Failed to load | 読み込みに失敗 |
| - [ ] | `switchRefused` | Could not switch to {name}: {reason} | {name} に切り替えられませんでした: {reason} |
| - [ ] | `close` | Close | 閉じる |
| - [ ] | `creatorDraft` | Let the agent help me create a preset | Agent にプリセット作成を手伝ってもらう |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
