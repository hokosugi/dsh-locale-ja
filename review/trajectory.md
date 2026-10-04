# trajectory — 日本語訳レビュー

訳済み **192 / 192** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `view.trajectory` | Trajectory | 軌跡 |
| - [ ] | `toolbar.aria` | Trajectory toolbar | 軌跡ツールバー |
| - [ ] | `toolbar.duration` | Duration | 期間 |
| - [ ] | `toolbar.useActualDuration` | Use actual duration | 実際の所要時間で表示 |
| - [ ] | `toolbar.useEqualWidth` | Use equal-width operations | 操作を等幅で表示 |
| - [ ] | `toolbar.actualTime` | Actual time | 実時間 |
| - [ ] | `toolbar.turns` | Turns | ターン |
| - [ ] | `toolbar.expandTurns` | Expand turns | ターンを展開 |
| - [ ] | `toolbar.collapseTurns` | Collapse turns | ターンを折りたたむ |
| - [ ] | `toolbar.calls` | Calls | 呼び出し |
| - [ ] | `toolbar.expandCalls` | Expand calls | 呼び出しを展開 |
| - [ ] | `toolbar.collapseCalls` | Collapse calls | 呼び出しを折りたたむ |
| - [ ] | `toolbar.search` | Search trajectory | 軌跡を検索 |
| - [ ] | `toolbar.searchPlaceholder` | Search | 検索 |
| - [ ] | `kind.system` | SYSTEM | システム |
| - [ ] | `kind.user` | USER | ユーザー |
| - [ ] | `kind.context` | CONTEXT | コンテキスト |
| - [ ] | `kind.compacted` | COMPACTED | 圧縮済み |
| - [ ] | `kind.message` | Message | メッセージ |
| - [ ] | `kind.assistant` | ASSISTANT | アシスタント |
| - [ ] | `kind.tool` | TOOL | ツール |
| - [ ] | `kind.subtool` | SUBTOOL | サブツール |
| - [ ] | `kind.sub` | Sub | サブ |
| - [ ] | `column.input` | Input | 入力 |
| - [ ] | `column.output` | Output | 出力 |
| - [ ] | `column.think` | Think | 思考 |
| - [ ] | `column.time` | Time | 時刻 |
| - [ ] | `column.model` | Model | 生成 |
| - [ ] | `column.tools` | Tools | 実行 |
| - [ ] | `turn.label` | Turn {turn} | ターン {turn} |
| - [ ] | `section.betweenTurns` | Between turns | ターン間 |
| - [ ] | `group.message` | Message | メッセージ |
| - [ ] | `group.step` | Step {step} | ステップ {step} |
| - [ ] | `group.compaction` | Compaction {seq} | 圧縮 {seq} |
| - [ ] | `status.failed` | Failed | 失敗 |
| - [ ] | `status.pending` | Pending | 未着手 |
| - [ ] | `status.completed` | Completed | 完了 |
| - [ ] | `timing.notAvailable` | Not available | 利用できません |
| - [ ] | `timing.notRecorded` | Not recorded | 記録なし |
| - [ ] | `timing.stepStartUnavailable` | Step start unavailable | ステップの開始時刻なし |
| - [ ] | `timing.firstTokenUnavailable` | First token unavailable | 初回トークンの時刻なし |
| - [ ] | `timing.usageUnavailable` | Usage unavailable | 使用量なし |
| - [ ] | `timing.outputTokensUnavailable` | Output tokens unavailable | 出力トークン数なし |
| - [ ] | `timing.durationTooShort` | Duration too short | 所要時間が短すぎます |
| - [ ] | `timing.showLocalTime` | Show local time | ローカル時刻で表示 |
| - [ ] | `timing.showUnixTimestamp` | Show Unix timestamp | Unix タイムスタンプで表示 |
| - [ ] | `timing.started` | Started | 開始 |
| - [ ] | `timing.totalDuration` | Total duration | 合計時間 |
| - [ ] | `timing.ttft` | TTFT | TTFT |
| - [ ] | `timing.generation` | Generation | 生成 |
| - [ ] | `timing.throughput` | Throughput | スループット |
| - [ ] | `timing.duration` | Duration | 所要時間 |
| - [ ] | `timing.source` | Timing source | 計測の出所 |
| - [ ] | `timing.sessionTimestamps` | Session timestamps | セッションのタイムスタンプ |
| - [ ] | `timing.sessionTimestampsRunning` | Session timestamps (running) | セッションのタイムスタンプ (実行中) |
| - [ ] | `timing.request` | Request Timing | リクエストの計測 |
| - [ ] | `unit.milliseconds` | {value} ms | {value} ms |
| - [ ] | `unit.seconds` | {value} s | {value} 秒 |
| - [ ] | `unit.tokens` | {value} tok | {value} tok |
| - [ ] | `unit.tokensPerSecond` | {value} tok/s | {value} tok/s |
| - [ ] | `usage.tokens` | Tokens | トークン |
| - [ ] | `usage.reasoning` | Reasoning | 推論 |
| - [ ] | `usage.content` | Content | 内容 |
| - [ ] | `usage.notReported` | Usage not reported | 使用量は報告されていません |
| - [ ] | `usage.input` | Input | 入力 |
| - [ ] | `usage.cached` | Cached | キャッシュ済み |
| - [ ] | `usage.cacheCreated` | Cache created | キャッシュ作成 |
| - [ ] | `usage.other` | Other | その他 |
| - [ ] | `usage.output` | Output | 出力 |
| - [ ] | `usage.thisRequest` | This request | このリクエスト |
| - [ ] | `usage.sessionCumulative` | Session cumulative | セッション累計 |
| - [ ] | `options.notRecorded` | Options not recorded | オプションは記録されていません |
| - [ ] | `options.json` | Request options JSON | リクエストオプションの JSON |
| - [ ] | `source.unknown` | Unknown | 不明 |
| - [ ] | `source.user` | User | ユーザー |
| - [ ] | `source.plugin` | Plugin | プラグイン |
| - [ ] | `source.pluginNamed` | Plugin · {plugin} | プラグイン · {plugin} |
| - [ ] | `source.goal` | Goal | ゴール |
| - [ ] | `source.goalRound` | Goal · Round {round} | ゴール · ラウンド {round} |
| - [ ] | `source.notRecorded` | Source not recorded | 出所は記録されていません |
| - [ ] | `source.messageJson` | Message source JSON | メッセージ出所の JSON |
| - [ ] | `tab.summary` | Summary | 要約 |
| - [ ] | `tab.rawOutput` | Raw Output | 生の出力 |
| - [ ] | `tab.preview` | Preview | プレビュー |
| - [ ] | `tab.raw` | Raw | 生データ |
| - [ ] | `tab.source` | Source | ソース |
| - [ ] | `tab.payload` | Payload | ペイロード |
| - [ ] | `tab.result` | Result | 結果 |
| - [ ] | `tab.schema` | Schema | スキーマ |
| - [ ] | `tab.timing` | Timing | 計測 |
| - [ ] | `tab.diff` | Diff | 差分 |
| - [ ] | `tab.systemPrompt` | System Prompt | システムプロンプト |
| - [ ] | `tab.tools` | Tools | ツール |
| - [ ] | `tab.options` | Options | オプション |
| - [ ] | `tab.usage` | Usage | 使用量 |
| - [ ] | `record.toolCallOnly` | (tool call only) | (ツール呼び出しのみ) |
| - [ ] | `record.noContent` | No content | 内容なし |
| - [ ] | `record.noPayload` | No payload captured | ペイロードは取得されていません |
| - [ ] | `record.noResult` | No result captured | 結果は取得されていません |
| - [ ] | `record.noOutput` | No output | 出力なし |
| - [ ] | `record.schemaUnavailable` | Schema unavailable | スキーマはありません |
| - [ ] | `record.parameters` | Parameters | パラメーター |
| - [ ] | `record.resultJson` | Result JSON | 結果の JSON |
| - [ ] | `record.json` | JSON | JSON |
| - [ ] | `record.parametersJson` | parameters JSON | parameters の JSON |
| - [ ] | `record.namedParametersJson` | {name} parameters JSON | {name} の parameters JSON |
| - [ ] | `record.payloadJson` | Payload JSON | ペイロードの JSON |
| - [ ] | `record.outputJson` | Result JSON | 結果の JSON |
| - [ ] | `record.thinking` | Thinking | 思考 |
| - [ ] | `record.wrapLines` | Wrap lines | 行を折り返す |
| - [ ] | `code.source` | Code | コード |
| - [ ] | `code.output` | Output | 出力 |
| - [ ] | `code.copySource` | Copy code | コードをコピー |
| - [ ] | `code.copyOutput` | Copy output | 出力をコピー |
| - [ ] | `code.originalJson` | Original JSON | 元の JSON |
| - [ ] | `code.running` | Running… | 実行中… |
| - [ ] | `record.systemPromptMissing` | No system prompt in this request | このリクエストにシステムプロンプトはありません |
| - [ ] | `record.toolsMissing` | No tools in this request | このリクエストにツールはありません |
| - [ ] | `record.systemPrompt` | System Prompt | システムプロンプト |
| - [ ] | `record.tools` | Tools | ツール |
| - [ ] | `block.openSummary` | Open Block #{index} tool call summary | ブロック #{index} のツール呼び出し要約を開く |
| - [ ] | `block.openSummaryTitle` | Open tool call summary | ツール呼び出しの要約を開く |
| - [ ] | `block.label` | Block #{index} {type} | ブロック #{index} {type} |
| - [ ] | `history.loadingTrajectory` | Loading trajectory… | 軌跡を読み込んでいます… |
| - [ ] | `history.loadingEarlier` | Loading earlier history… | 以前の履歴を読み込んでいます… |
| - [ ] | `history.loadingEarlierAria` | Loading earlier history… | 以前の履歴を読み込んでいます… |
| - [ ] | `history.loadEarlier` | Load earlier history | 以前の履歴を読み込む |
| - [ ] | `history.clickToLoadEarlier` | Click to load earlier history | クリックで以前の履歴を読み込む |
| - [ ] | `request.label` | Request #{request} | リクエスト #{request} |
| - [ ] | `request.labelCompaction` | Request #{request} · Compaction | リクエスト #{request} · 圧縮 |
| - [ ] | `request.compaction` | Compaction · {section} | 圧縮 · {section} |
| - [ ] | `request.compactionPurpose` | Compaction | 圧縮 |
| - [ ] | `request.retryProgress` | {retry} of {maximum} | {retry} / {maximum} |
| - [ ] | `request.collapsedSummary` | Collapsed {kind} summary, {summary} | 折りたたまれた {kind} の要約、{summary} |
| - [ ] | `request.collapsedTurn` | turn | ターン |
| - [ ] | `request.collapsedAssistant` | assistant | アシスタント |
| - [ ] | `request.rowAria` | {request}{kind}, {content} | {request}{kind}、{content} |
| - [ ] | `request.rowPrefix` | Request {request},  | リクエスト {request}、 |
| - [ ] | `request.rowAriaCompaction` | Request {request}, compaction | リクエスト {request}、圧縮 |
| - [ ] | `request.noContent` | no content | 内容なし |
| - [ ] | `summary.toolCalls.one` | {count} tool call | ツール呼び出し {count} 回 |
| - [ ] | `summary.toolCalls.other` | {count} tool calls | ツール呼び出し {count} 回 |
| - [ ] | `summary.steps.one` | {count} step | ステップ {count} |
| - [ ] | `summary.steps.other` | {count} steps | ステップ {count} |
| - [ ] | `details.event` | Event details | イベントの詳細 |
| - [ ] | `details.resize` | Resize event details | イベント詳細のサイズを変更 |
| - [ ] | `details.resizeTitle` | Drag to resize. Double-click to reset. | ドラッグでサイズ変更。ダブルクリックでリセット。 |
| - [ ] | `details.close` | Close details | 詳細を閉じる |
| - [ ] | `details.status` | Status | 状態 |
| - [ ] | `details.purpose` | Purpose | 目的 |
| - [ ] | `details.provider` | Provider | プロバイダー |
| - [ ] | `details.model` | Model | モデル |
| - [ ] | `details.toolCalls` | Tool calls | ツール呼び出し |
| - [ ] | `details.subtoolCalls` | Subtool calls | サブツール呼び出し |
| - [ ] | `details.error` | Error | エラー |
| - [ ] | `details.failure.auth` | API key is invalid | API キーが正しくありません |
| - [ ] | `details.retry` | Retry | 再試行 |
| - [ ] | `details.scheduled` | Scheduled | 予約済み |
| - [ ] | `details.retryDelay` | Retry delay | 再試行まで |
| - [ ] | `details.result` | Result | 結果 |
| - [ ] | `details.compacted` | Compacted | 圧縮済み |
| - [ ] | `details.assistantMessage` | Assistant Message | アシスタントのメッセージ |
| - [ ] | `details.source` | Source | ソース |
| - [ ] | `details.hierarchy` | Hierarchy | 階層 |
| - [ ] | `details.toolCall` | Tool Call | ツール呼び出し |
| - [ ] | `timeline.aria` | Trajectory timeline | 軌跡のタイムライン |
| - [ ] | `timeline.overviewAria` | Timeline overview; drag horizontally to focus events | タイムラインの概観。横にドラッグするとイベントに注目できます |
| - [ ] | `timeline.noTimingData` | No timing data | 計測データなし |
| - [ ] | `timeline.total` | Total {duration} | 合計 {duration} |
| - [ ] | `timeline.started` | Started {time} | 開始 {time} |
| - [ ] | `timeline.ttftDecoding` | TTFT {ttft} · Decoding {decoding} | TTFT {ttft} · デコード {decoding} |
| - [ ] | `layout.compacting` | Compacting context… | コンテキストを圧縮しています… |
| - [ ] | `layout.compactionFailed` | Compaction failed | 圧縮に失敗しました |
| - [ ] | `layout.compacted` | Context compacted | コンテキストを圧縮しました |
| - [ ] | `layout.toolCallOnly` | Tool call only | ツール呼び出しのみ |
| - [ ] | `attachment.list` | Attachments | 添付 |
| - [ ] | `attachment.imageName` | Image {index} | 画像 {index} |
| - [ ] | `layout.imageCount` | Images ×{count} | 画像 ×{count} |
| - [ ] | `layout.fileAttachments` | Files ×{count} | ファイル ×{count} |
| - [ ] | `layout.initialSystemPrompt` | Initial System Prompt | 初期システムプロンプト |
| - [ ] | `layout.systemPromptUpdated` | System Prompt Updated | システムプロンプトを更新 |
| - [ ] | `layout.toolsUpdated` | Tools Updated | ツールを更新 |
| - [ ] | `layout.toolAdded` | Tool added: {name} | ツールを追加: {name} |
| - [ ] | `layout.toolRemoved` | Tool removed: {name} | ツールを削除: {name} |
| - [ ] | `layout.toolUpdateNotice` | Tools updated | ツールを更新 |
| - [ ] | `layout.toolsAdded` | Added: {names} | 追加: {names} |
| - [ ] | `layout.toolsAddedCount` | {count} added | {count} 件追加 |
| - [ ] | `layout.toolsChanged` | {added} added, {removed} removed | {added} 件追加、{removed} 件削除 |
| - [ ] | `layout.toolsRemoved` | Removed: {names} | 削除: {names} |
| - [ ] | `layout.toolsRemovedCount` | {count} removed | {count} 件削除 |
| - [ ] | `layout.systemPromptAndToolsUpdated` | System Prompt and Tools Updated | システムプロンプトとツールを更新 |
| - [ ] | `layout.compactionInterrupted` | Compaction was interrupted before completion. | 圧縮は完了する前に中断されました。 |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
