# stats — 日本語訳レビュー

訳済み **177 / 177** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `view.stats` | Statistics | 統計 |
| - [ ] | `column.scope` | Turn / step | ターン / ステップ |
| - [ ] | `column.scope.title` | A turn row holds the turn total; click a row to expand or collapse its steps | ターンの行はそのターンの合計です。行をクリックするとステップを展開・折りたたみできます |
| - [ ] | `column.prompt` | Trigger | きっかけ |
| - [ ] | `column.prompt.title` | What opened this turn: a human prompt shows its text, automation shows a source badge | このターンが何で始まったか。人の入力ならその文面、自動化なら種類のバッジを表示します |
| - [ ] | `trigger.agent-message` | Agent message | Agent のメッセージ |
| - [ ] | `trigger.team-message` | Team message | チームのメッセージ |
| - [ ] | `trigger.schedule` | Scheduled | スケジュール |
| - [ ] | `trigger.webhook` | Webhook | Webhook |
| - [ ] | `trigger.tool-jobs` | Background job | バックグラウンドジョブ |
| - [ ] | `trigger.cordis-host-runner` | Plugin run | プラグインの実行 |
| - [ ] | `trigger.subagent-settled` | Subagent finished | サブエージェントの完了 |
| - [ ] | `trigger.goal` | Goal round | ゴールのラウンド |
| - [ ] | `trigger.context` | Context wake | コンテキストの再開 |
| - [ ] | `trigger.other` | Automated turn | 自動化されたターン |
| - [ ] | `column.did` | Execution | 実行内容 |
| - [ ] | `column.did.title` | Tools this step called and how often; a step without tool calls previews its answer text | このステップが呼んだツールと回数。ツール呼び出しのないステップは回答の文面を表示します |
| - [ ] | `column.context` | Context | コンテキスト |
| - [ ] | `column.context.title` | usage input tokens + cache read + cache write | 使用量の入力トークン + キャッシュ読み込み + キャッシュ書き込み |
| - [ ] | `column.output` | Output | 出力 |
| - [ ] | `column.output.title` | usage output tokens of the step | ステップの出力トークン（使用量） |
| - [ ] | `column.cache` | Cache hit | キャッシュヒット |
| - [ ] | `column.cache.title` | cache read ÷ (input + cache read + cache write): the share of the prompt served from cache | キャッシュ読み込み ÷（入力 + キャッシュ読み込み + キャッシュ書き込み）。プロンプトのうちキャッシュから供給された割合 |
| - [ ] | `cache.detail` | cache read {read} · input {input} · cache write {write} | キャッシュ読み込み {read} · 入力 {input} · キャッシュ書き込み {write} |
| - [ ] | `column.ttft` | First token | 最初のトークン |
| - [ ] | `column.ttft.title` | step start to the first output fragment (TTFT) | ステップ開始から最初の出力断片まで（TTFT） |
| - [ ] | `column.model` | Model time | モデル時間 |
| - [ ] | `column.model.title` | step start to the settled reply (includes the first-token delay) | ステップ開始から応答確定まで（最初のトークン待ちを含む） |
| - [ ] | `column.tps` | Output speed | 出力速度 |
| - [ ] | `column.tps.title` | output tokens ÷ generation seconds (TPS, tok/s) | 出力トークン ÷ 生成秒数（TPS、tok/s） |
| - [ ] | `column.tool` | Tool time | ツール時間 |
| - [ ] | `column.tool.title` | sum of every tool call up to its result inside the step; calls without a result are excluded | ステップ内のツール呼び出しごとに、結果が出るまでの時間の合計。結果のない呼び出しは除外 |
| - [ ] | `column.time` | Total time | 合計時間 |
| - [ ] | `column.time.title` | total split: light blue first token, blue generation, orange tool calls, gray everything else. Bar length uses a square-root scale; steps compare only with steps of the same turn, turns with turns | 合計の内訳: 水色が最初のトークン、青が生成、オレンジがツール呼び出し、灰色がその他。バーの長さは平方根スケールで、ステップ同士・ターン同士でのみ比較できます |
| - [ ] | `turn.label` | Turn {turn} | ターン {turn} |
| - [ ] | `step.label` | Step {step} | ステップ {step} |
| - [ ] | `step.toggle.aria` | Expand or collapse the tool details of step {step} | ステップ {step} のツール詳細を展開・折りたたむ |
| - [ ] | `step.partial` | start unknown | 開始不明 |
| - [ ] | `step.started.title` | Step started at {time} | ステップの開始 {time} |
| - [ ] | `compaction.label` | Compaction | 圧縮 |
| - [ ] | `compaction.running` | Compacting… | 圧縮しています… |
| - [ ] | `compaction.shadowed` | Pruned {tokens} tokens of history | 履歴から {tokens} トークンを削除しました |
| - [ ] | `compaction.summary` | Summary {chars} chars | 要約 {chars} 文字 |
| - [ ] | `compaction.title` | Compaction runs are shown separately and excluded from the turn's step totals | 圧縮の実行は別に表示され、ターンのステップ合計には含まれません |
| - [ ] | `event.show` | Show event rows (incl. compaction) | イベント行を表示（圧縮を含む） |
| - [ ] | `context.delta.show` | Show context delta | コンテキストの増減を表示 |
| - [ ] | `context.delta.title` | Prompt delta against the previous measured step in the turn; negative means the context shrank (for example after compaction) | ターン内の直前の計測ステップに対するプロンプトの増減。負の値はコンテキストが減ったことを意味します（圧縮後など） |
| - [ ] | `event.request-header` | Request header | リクエストヘッダー |
| - [ ] | `event.system-prompt` | System prompt | システムプロンプト |
| - [ ] | `event.tool-set` | Tool set change | ツール構成の変更 |
| - [ ] | `event.context-prune` | Context prune | コンテキストの削除 |
| - [ ] | `event.request-context` | Request context | リクエストのコンテキスト |
| - [ ] | `event.model-retry` | Model retry | モデルの再試行 |
| - [ ] | `event.model-attempt` | Model attempt | モデルの試行 |
| - [ ] | `event.context-refresh` | Context refresh | コンテキストの更新 |
| - [ ] | `event.approval` | Approval | 承認 |
| - [ ] | `event.context.detail` | {provider} / {model} · prompt mode {mode} | {provider} / {model} · プロンプトモード {mode} |
| - [ ] | `event.retry.detail` | retry {retry} · wait {delay} | 再試行 {retry} · 待機 {delay} |
| - [ ] | `event.attempt.detail` | Model attempt without a committed message | メッセージを確定しないモデルの試行 |
| - [ ] | `event.refresh.detail` | {source} · {chars} chars | {source} · {chars} 文字 |
| - [ ] | `event.approval.detail` | {tool} · {status} | {tool} · {status} |
| - [ ] | `event.source.runtime` | runtime context | 実行時コンテキスト |
| - [ ] | `event.source.time` | time context | 時刻コンテキスト |
| - [ ] | `event.approval.asked` | waiting | 待機中 |
| - [ ] | `event.approval.allowed` | allowed once | 1 回許可 |
| - [ ] | `event.approval.rejected` | rejected | 拒否 |
| - [ ] | `event.approval.cancelled` | cancelled | キャンセル済み |
| - [ ] | `event.approval.unavailable` | unavailable | 利用できません |
| - [ ] | `event.title` | Non-step event rows: request, prompt, tool-set, retry, context-refresh, approval, and prune changes excluded from the turn step totals | ステップ以外のイベント行: リクエスト・プロンプト・ツール構成・再試行・コンテキスト更新・承認・削除の変更で、ターンのステップ合計には含まれません |
| - [ ] | `event.reason.initial` | initial | 初回 |
| - [ ] | `event.reason.resume` | resume | 再開 |
| - [ ] | `event.reason.change` | change | 変更 |
| - [ ] | `event.reason.series` | new series | 新しい連続 |
| - [ ] | `event.header.detail` | {reason} · {tools} tools | {reason} · ツール {tools} 個 |
| - [ ] | `event.series` | new series | 新しい連続 |
| - [ ] | `event.system.append` | append | 追記 |
| - [ ] | `event.system.replace` | replace | 置換 |
| - [ ] | `event.system.clear` | clear | クリア |
| - [ ] | `event.system.detail` | {action} · {chars} chars | {action} · {chars} 文字 |
| - [ ] | `event.tools.added` | added {tools} | 追加 {tools} |
| - [ ] | `event.tools.removed` | removed {tools} | 削除 {tools} |
| - [ ] | `event.prune.detail` | pruned {tokens} tokens | {tokens} トークンを削除 |
| - [ ] | `step.partial.title` | This step's start and end events are not in the current event window (trimmed while the tab reconnected or the window was rebuilt), so first-token, model time and total have no start to subtract from; reloading the tab reassembles from the full window | このステップの開始・終了イベントが現在のイベント範囲に含まれていないため（タブの再接続や範囲の再構築で切り捨て）、最初のトークン・モデル時間・合計時間は起点がありません。タブを再読み込みすると完全な範囲から再構成されます |
| - [ ] | `state.running` | running | 実行中 |
| - [ ] | `state.interrupted` | interrupted | 中断 |
| - [ ] | `state.cacheMiss` | cache miss | キャッシュミス |
| - [ ] | `state.cacheMiss.title` | The prompt barely hit the cache: usually the first request after a restart or a session resume, paid at full input price | プロンプトがほとんどキャッシュに当たらなかった状態。再起動直後やセッション再開後の最初のリクエストで起きやすく、入力の全額が課金されます |
| - [ ] | `state.aborted` | unsettled | 未確定 |
| - [ ] | `state.aborted.title` | The step closed without a settled reply (usually cancelled or failed) | 応答を確定せずにステップが終了しました（通常はキャンセルまたは失敗） |
| - [ ] | `unknown` | not recorded | 記録なし |
| - [ ] | `partial` | {count} tool calls have no result yet; this is the lower bound of known time | {count} 件のツール呼び出しにまだ結果がありません。判明している時間の下限です |
| - [ ] | `empty` | No measurable step in the current window. | 現在の範囲に計測できるステップがありません。 |
| - [ ] | `loadOlder` | Load earlier | 以前を読み込む |
| - [ ] | `loadOlder.loading` | Loading earlier turns… | 以前のターンを読み込み中… |
| - [ ] | `loadOlder.done` | Beginning of history reached | 履歴の先頭まで到達しました |
| - [ ] | `loadOlder.failed` | Load failed, retry | 読み込みに失敗しました。再試行してください |
| - [ ] | `summary` | {turns} turns · {steps} steps | {turns} ターン · {steps} ステップ |
| - [ ] | `table.showTotals` | Show total row | 合計行を表示 |
| - [ ] | `contextMode.label` | Context basis | コンテキストの基準 |
| - [ ] | `contextMode.latest` | Latest | 最新 |
| - [ ] | `contextMode.latest.title` | Turn rows show the last measured step's prompt size (final context); the total row stays cumulative | ターンの行は最後に計測したステップのプロンプトサイズ（最終コンテキスト）を表示し、合計行は累積のままです |
| - [ ] | `contextMode.cumulative` | Cumulative | 累積 |
| - [ ] | `contextMode.cumulative.title` | Turn rows show the sum of prompt sizes across the turn's steps (cumulative processing); the total row stays cumulative | ターンの行はターン内のステップごとのプロンプトサイズの合計（累積処理）を表示し、合計行は累積のままです |
| - [ ] | `totals.full` | Whole-session total | セッション全体の合計 |
| - [ ] | `totals.full.title` | Totals for the complete session; total time is model time + tool time (no inter-turn gaps) | セッション全体の合計。合計時間はモデル時間 + ツール時間（ターン間の空白は含まない） |
| - [ ] | `totals.window` | Window total | 表示範囲の合計 |
| - [ ] | `totals.window.title` | Totals for the turns loaded in this window; the context cell is cumulative across steps | この範囲に読み込まれたターンの合計。コンテキストの値はステップ間の累積です |
| - [ ] | `expand.all` | Expand all | すべて展開 |
| - [ ] | `collapse.all` | Collapse all | すべて折りたたむ |
| - [ ] | `turn.expand` | Show | 表示 |
| - [ ] | `turn.collapse` | Hide | 非表示 |
| - [ ] | `turn.toggle.title` | Expand or collapse the steps of this turn | このターンのステップを展開・折りたたみ |
| - [ ] | `turn.toggle.aria` | Expand or collapse turn {turn} | ターン {turn} を展開・折りたたみ |
| - [ ] | `did.answer` | answer | 回答 |
| - [ ] | `did.working` | generating | 生成中 |
| - [ ] | `did.aborted` | no answer | 回答なし |
| - [ ] | `did.more` | {count} more | ほか {count} 件 |
| - [ ] | `did.rest` | {count} more calls | ほか {count} 回の呼び出し |
| - [ ] | `did.title` | {calls} calls: {tools} | {calls} 回の呼び出し: {tools} |
| - [ ] | `did.retry` | retried {count}× | {count} 回再試行 |
| - [ ] | `did.lines` | {lines} lines | {lines} 行 |
| - [ ] | `did.lines.unit` | lines | 行 |
| - [ ] | `did.chars` | {chars} chars | {chars} 文字 |
| - [ ] | `did.output` | → {chars} chars | → {chars} 文字 |
| - [ ] | `did.total` | {chars} characters of tool output in this step; they become part of the next prompt | このステップのツール出力 {chars} 文字。次のプロンプトの一部になります |
| - [ ] | `detail.show` | details | 詳細 |
| - [ ] | `detail.hide` | hide | 隠す |
| - [ ] | `detail.title` | Click this row to expand or collapse the tool details | この行をクリックするとツールの詳細を展開・折りたたみます |
| - [ ] | `detail.calls` | {count} tool calls | ツール呼び出し {count} 件 |
| - [ ] | `detail.answer` | Answer | 回答 |
| - [ ] | `detail.answer.truncated` | Answer is long; only the first 16,000 chars are kept | 回答が長いため、先頭 16,000 文字だけを保持しています |
| - [ ] | `detail.code.title` | Code block | コードブロック |
| - [ ] | `detail.code.wrap` | Wrap lines | 行を折り返す |
| - [ ] | `detail.code.unwrap` | Do not wrap | 折り返さない |
| - [ ] | `detail.footnotes` | Footnotes | 脚注 |
| - [ ] | `detail.copy` | Copy | コピー |
| - [ ] | `detail.copy.title` | Copy this text | このテキストをコピー |
| - [ ] | `detail.copied` | Copied | コピーしました |
| - [ ] | `detail.copyFailed` | Copy failed | コピーできませんでした |
| - [ ] | `detail.chars` | {chars} chars | {chars} 文字 |
| - [ ] | `detail.lines` | {lines} lines | {lines} 行 |
| - [ ] | `detail.file` | file | ファイル |
| - [ ] | `detail.diff` | change | 変更 |
| - [ ] | `detail.emptyBody` | This call left no text | この呼び出しにはテキストがありません |
| - [ ] | `detail.hidden` | {count} more calls are not listed (at most {limit} per step) | ほか {count} 件の呼び出しは表示していません（1 ステップあたり最大 {limit} 件） |
| - [ ] | `detail.args` | raw arguments | 生の引数 |
| - [ ] | `detail.wrap` | Wrap | 折り返す |
| - [ ] | `detail.wrap.title` | Wrap long lines instead of scrolling sideways | 横スクロールの代わりに長い行を折り返します |
| - [ ] | `detail.raw.title` | Show the raw JSON arguments | 生の JSON 引数を表示 |
| - [ ] | `detail.lineCap` | Showing the first {shown} of {total} lines | {total} 行中、先頭 {shown} 行を表示 |
| - [ ] | `detail.truncated` | Too long: only the first {chars} characters are kept | 長すぎるため、先頭 {chars} 文字だけを保持しています |
| - [ ] | `tool.failed` | {count} failed | {count} 件失敗 |
| - [ ] | `tool.failed.title` | {count} tool calls in this step returned an error result | このステップの {count} 件のツール呼び出しがエラーを返しました |
| - [ ] | `bar.ttft` | first token {value} | 最初のトークン {value} |
| - [ ] | `bar.gen` | generation {value} | 生成 {value} |
| - [ ] | `bar.tool` | tool calls {value} | ツール呼び出し {value} |
| - [ ] | `bar.rest` | other {value} | その他 {value} |
| - [ ] | `bar.wall` | total {value} | 合計 {value} |
| - [ ] | `bar.running` | not finished yet: this is elapsed time | 未完了のため経過時間です |
| - [ ] | `bar.gap` | gap since previous step {value} | 前のステップからの空白 {value} |
| - [ ] | `bar.start` | started {clock} | 開始 {clock} |
| - [ ] | `turn.started` | this turn started at {time} | このターンの開始 {time} |
| - [ ] | `turn.images` | {count} images | 画像 {count} 枚 |
| - [ ] | `imagePreview.hint` | Hover or focus to preview this turn's images; click to open the full image | ホバーまたはフォーカスでこのターンの画像をプレビューします。クリックで全体を開きます |
| - [ ] | `imagePreview.dialog` | Image preview | 画像プレビュー |
| - [ ] | `imagePreview.open` | View image {index} of {count} | 画像 {count} 枚中 {index} 枚目を表示 |
| - [ ] | `imagePreview.alt` | Image {index} | 画像 {index} |
| - [ ] | `imagePreview.loading` | Loading image… | 画像を読み込み中… |
| - [ ] | `imagePreview.failed` | Image failed to load | 画像を読み込めませんでした |
| - [ ] | `imagePreview.retry` | Retry | 再試行 |
| - [ ] | `imagePreview.close` | Close image preview | 画像プレビューを閉じる |
| - [ ] | `steps.total` | {total} steps | {total} ステップ |
| - [ ] | `steps.tail` | newest {limit} only | 最新 {limit} 件のみ |
| - [ ] | `steps.all` | Show all {total} steps | {total} ステップをすべて表示 |
| - [ ] | `steps.filter` | Only {tool} | {tool} のみ |
| - [ ] | `steps.clear` | Clear filter | 絞り込みを解除 |
| - [ ] | `steps.matched` | {count} steps used {tool} | {tool} を使った {count} ステップ |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
