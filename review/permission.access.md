# permission.access — 日本語訳レビュー

訳済み **17 / 17** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `mode` | Access mode, current: {name} | アクセスモード、現在: {name} |
| - [ ] | `close` | Close | 閉じる |
| - [ ] | `preset.readOnly` | Read Only | 読み取りのみ |
| - [ ] | `preset.workspaceWrite` | Workspace Write | ワークスペース内の書き込み |
| - [ ] | `preset.fullAccess` | Full access | 完全なアクセス |
| - [ ] | `confirm.title` | Enable Full access? | 完全なアクセスを有効にしますか？ |
| - [ ] | `confirm.description` | Full access reduces confirmation steps and lets the agent perform more actions directly, including sensitive operations, file changes, or external commands. Only use it when you trust the current task. | 完全なアクセスを有効にすると、確認の手順が減り、Agent がより多くの操作を直接実行できるようになります。これには機微な操作、ファイルの変更、外部コマンドの実行が含まれます。現在のタスクを信頼できる場合にのみ使用してください。 |
| - [ ] | `confirm.acknowledge` | I understand the risks and want to continue | リスクを理解したうえで続けます |
| - [ ] | `confirm.cancel` | Cancel | キャンセル |
| - [ ] | `confirm.enable` | Enable Full access | 完全なアクセスを有効にする |
| - [ ] | `auto.label` | Auto review | Auto review |
| - [ ] | `auto.badge` | EXP | EXP |
| - [ ] | `auto.description` | Run without a sandbox after an experimental same-model review of every native tool call and PTC inner call. | サンドボックスなしで実行します。ネイティブのツール呼び出しと PTC の内側の呼び出しのたびに、同じモデルによる実験的なレビューを行います。 |
| - [ ] | `auto.confirm.title` | Enable Auto review (experimental)? | Auto review (実験的) を有効にしますか？ |
| - [ ] | `auto.confirm.description` | Auto review runs without a sandbox. Before every native tool call and PTC inner call, the same model as the current agent reviews whether to allow it; you approve or reject each call it denies. This feature is experimental, can falsely allow or deny actions, and uses additional tokens. | Auto review はサンドボックスなしで実行されます。ネイティブのツール呼び出しと PTC の内側の呼び出しの前に、現在の Agent と同じモデルが許可するかどうかを審査し、拒否された呼び出しはあなたが承認または拒否します。この機能は実験的で、操作を誤って許可・拒否する可能性があり、追加のトークンを消費します。 |
| - [ ] | `auto.confirm.acknowledge` | I understand these risks and want to continue | これらのリスクを理解したうえで続けます |
| - [ ] | `auto.confirm.enable` | Enable Auto review | Auto review を有効にする |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
