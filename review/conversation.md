# conversation — 日本語訳レビュー

訳済み **369 / 369** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `shortcut.newline` | New line | 改行 |
| - [ ] | `shortcut.complementary` | Use the complementary Queue / Steer action | もう一方のキュー / ステア操作を使う |
| - [ ] | `shortcut.slash` | Open command menu | コマンドメニューを開く |
| - [ ] | `shortcut.mention` | Open reference menu | 参照メニューを開く |
| - [ ] | `hint.plan` | describe your task to generate plan | タスクを説明すると計画を生成します |
| - [ ] | `hint.goal` | describe the objective for a long-running task | 長時間タスクの目的を説明してください |
| - [ ] | `hint.goal.active` | goal active — edit / pause / resume / clear | ゴール実行中 — 編集 / 一時停止 / 再開 / クリア |
| - [ ] | `placeholder.plan` | describe your task to generate plan | タスクを説明すると計画を生成します |
| - [ ] | `placeholder.default` | Message or run a task, / commands, @ files or sessions | メッセージを送るかタスクを実行。/ でコマンド、@ でファイルやセッション |
| - [ ] | `placeholder.unavailable` | Session unavailable | セッションを利用できません |
| - [ ] | `placeholder.parentOffline` | Parent session offline; sending is unavailable but you can still stop the run | 親セッションがオフラインです。送信はできませんが、実行の停止は可能です |
| - [ ] | `placeholder.hero` | Describe what you want to build, / commands, @ files or sessions | 作りたいものを説明してください。/ でコマンド、@ でファイルやセッション |
| - [ ] | `placeholder.workspace` | Choose a workspace to start | 開始するワークスペースを選択 |
| - [ ] | `placeholder.steerQueue` | Cmd/Ctrl+Enter steers all queued messages | Cmd/Ctrl+Enter でキュー内のメッセージをまとめてステア |
| - [ ] | `input.commands` | Add files or run commands | ファイルを追加またはコマンドを実行 |
| - [ ] | `input.file` | File | ファイル |
| - [ ] | `input.stop` | Stop generating | 生成を停止 |
| - [ ] | `input.send` | Send message | メッセージを送信 |
| - [ ] | `input.send.queue` | Queue message | メッセージをキューに追加 |
| - [ ] | `input.send.steer` | Steer message | メッセージをステア |
| - [ ] | `attachment.pending` | Pending attachments | 未送信の添付 |
| - [ ] | `attachment.scrollLeft` | Scroll attachments left | 添付を左へスクロール |
| - [ ] | `attachment.scrollRight` | Scroll attachments right | 添付を右へスクロール |
| - [ ] | `attachment.dropTitle` | Drag files or images here to add them | ここにファイルや画像をドラッグして追加 |
| - [ ] | `attachment.dropDesc` | Image limit: up to {count} images, {size} each | 画像は最大 {count} 枚、1 枚あたり {size} まで |
| - [ ] | `attachment.dropBlocked` | Files and images cannot be added right now | 現在はファイルや画像を追加できません |
| - [ ] | `attachment.directoryDesktopOnly` | Folders can only be added in the desktop app; add individual files in the browser | フォルダーを追加できるのはデスクトップアプリのみです。ブラウザーではファイルを個別に追加してください |
| - [ ] | `attachment.pathUnavailable` | Could not obtain the folder path; drag it in again | フォルダーのパスを取得できませんでした。もう一度ドラッグしてください |
| - [ ] | `attachment.pathUnsupported` | The path contains characters a reference cannot carry; rename it and try again | このパスには参照が扱えない文字が含まれています。名前を変更して再試行してください |
| - [ ] | `image.pending` | Pending images | 未送信の画像 |
| - [ ] | `image.openOriginal` | View original | 元の画像を表示 |
| - [ ] | `image.openOriginalLabel` | {label}, click to view original | {label}、クリックで元の画像を表示 |
| - [ ] | `image.remove` | Remove image {name} | 画像 {name} を削除 |
| - [ ] | `image.original` | Original image | 元の画像 |
| - [ ] | `image.label` | Image | 画像 |
| - [ ] | `image.loadFailed` | Image failed to load; click to retry | 画像を読み込めませんでした。クリックで再試行 |
| - [ ] | `image.loading` | Loading image… | 画像を読み込んでいます… |
| - [ ] | `image.preview` | Original image preview | 元の画像のプレビュー |
| - [ ] | `image.closePreview` | Close original image preview | 元の画像のプレビューを閉じる |
| - [ ] | `image.unsupportedType` | Only PNG, JPG, WebP, and GIF images are supported | 対応している画像は PNG、JPG、WebP、GIF のみです |
| - [ ] | `image.tooMany` | A message can include up to {count} images | 1 つのメッセージに追加できる画像は {count} 枚までです |
| - [ ] | `image.fileTooLarge` | Each image must be smaller than {size} | 画像は 1 枚あたり {size} 未満にしてください |
| - [ ] | `image.totalTooLarge` | Images exceed {size} in total; remove some and try again | 画像の合計が {size} を超えています。一部を削除して再試行してください |
| - [ ] | `image.tooManyPixels` | Image resolution is too high; compress it and try again | 画像の解像度が高すぎます。圧縮して再試行してください |
| - [ ] | `image.dimensionTooLarge` | Image sides must be at most {size}px; downscale it and try again | 画像の辺は {size}px 以下にしてください。縮小して再試行してください |
| - [ ] | `image.modelUnsupported` | The current model does not support images; switch to a model that does | 現在のモデルは画像に対応していません。画像に対応したモデルに切り替えてください |
| - [ ] | `image.sendFailed` | Sending images failed ({reason}); re-add them and try again | 画像の送信に失敗しました ({reason})。追加し直して再試行してください |
| - [ ] | `file.pending` | Pending files | 未送信のファイル |
| - [ ] | `file.remove` | Remove file {name} | ファイル {name} を削除 |
| - [ ] | `file.uploading` | Uploading… | アップロードしています… |
| - [ ] | `file.uploadFailed` | Upload failed; click to retry | アップロードに失敗しました。クリックで再試行 |
| - [ ] | `file.retry` | Retry uploading {name} | {name} のアップロードを再試行 |
| - [ ] | `file.stillUploading` | Files are still uploading; send after they finish | ファイルをアップロード中です。完了してから送信してください |
| - [ ] | `file.sessionUnavailable` | Session unavailable; files cannot be uploaded | セッションを利用できないため、ファイルをアップロードできません |
| - [ ] | `file.notStaged` | The file has not finished uploading; re-add it and try again | ファイルのアップロードが完了していません。追加し直して再試行してください |
| - [ ] | `file.label` | File | ファイル |
| - [ ] | `context.aria` | {percent} of context used | コンテキストの {percent} を使用 |
| - [ ] | `context.used` | of context used | コンテキスト使用 |
| - [ ] | `context.system` | System prompt | システムプロンプト |
| - [ ] | `context.tools` | Tool definitions | ツール定義 |
| - [ ] | `context.messages` | Messages | メッセージ |
| - [ ] | `settings.enter.title` | Send behavior while busy | 実行中の送信動作 |
| - [ ] | `settings.enter.description` | What Enter and the Send button do while the agent is running; Cmd/Ctrl+Enter uses the other behavior | Agent の実行中に Enter と送信ボタンが行う動作。Cmd/Ctrl+Enter はもう一方の動作になります |
| - [ ] | `settings.enter.queue` | Queue | キュー |
| - [ ] | `settings.enter.steer` | Steer | ステア |
| - [ ] | `hero.headline` | Into the Unknown | 未知へ |
| - [ ] | `hero.preview` | Preview | プレビュー |
| - [ ] | `hero.chooseWorkspace` | Choose workspace | ワークスペースを選択 |
| - [ ] | `session.hierarchy` | Session hierarchy | セッション階層 |
| - [ ] | `todo.title` | To-dos | ToDo |
| - [ ] | `todo.progress.done` | {done} completed | {done} 件完了 |
| - [ ] | `todo.progress.active` | {active} in progress | {active} 件進行中 |
| - [ ] | `todo.progress.pending` | {pending} pending | {pending} 件未着手 |
| - [ ] | `todo.status.completed` | Completed | 完了 |
| - [ ] | `todo.status.inProgress` | In progress | 進行中 |
| - [ ] | `todo.status.pending` | Pending | 未着手 |
| - [ ] | `todo.rowTitle` | Update to-do list | ToDo リストを更新 |
| - [ ] | `tool.title.createGoal` | Create goal | ゴールを作成 |
| - [ ] | `tool.title.getGoal` | View goal | ゴールを表示 |
| - [ ] | `tool.title.updateGoal` | Update goal | ゴールを更新 |
| - [ ] | `tool.preparing.content` | Preparing content {kilobytes}KB | コンテンツを準備しています {kilobytes}KB |
| - [ ] | `tool.title.createSchedule` | Create reminder | リマインダーを作成 |
| - [ ] | `tool.title.listSchedules` | List reminders | リマインダー一覧 |
| - [ ] | `tool.title.deleteSchedule` | Delete reminder | リマインダーを削除 |
| - [ ] | `tool.title.updateSchedule` | Update reminder | リマインダーを更新 |
| - [ ] | `detail.state` | Status | 状態 |
| - [ ] | `detail.todo.completed` | Completed | 完了 |
| - [ ] | `detail.todo.in_progress` | In progress | 進行中 |
| - [ ] | `detail.todo.pending` | Pending | 未着手 |
| - [ ] | `detail.todo.empty` | The to-do list is empty | ToDo リストは空です |
| - [ ] | `todo.diff.initial` | Initial list | 初回のリスト |
| - [ ] | `todo.diff.compare` | Changes since the previous list | 前回のリストからの変更 |
| - [ ] | `todo.diff.unavailable` | Previous list unavailable | 前回のリストがありません |
| - [ ] | `todo.diff.noChanges` | No changes to the list | リストに変更はありません |
| - [ ] | `todo.diff.added` | {count} added | {count} 件追加 |
| - [ ] | `todo.diff.updated` | {count} updated | {count} 件更新 |
| - [ ] | `todo.diff.removed` | {count} removed | {count} 件削除 |
| - [ ] | `todo.diff.unchanged` | {count} unchanged | {count} 件変更なし |
| - [ ] | `todo.diff.addedItem` | Added | 追加 |
| - [ ] | `todo.diff.updatedItem` | Status changed | 状態変更 |
| - [ ] | `todo.diff.movedItem` | Reordered | 並び替え |
| - [ ] | `todo.diff.removedItem` | Removed | 削除 |
| - [ ] | `detail.goal.empty` | No goal | ゴールなし |
| - [ ] | `detail.goal.active` | Active | 実行中 |
| - [ ] | `detail.goal.disarmed` | Awaiting continuation | 継続待ち |
| - [ ] | `detail.goal.paused` | Paused | 一時停止 |
| - [ ] | `detail.goal.blocked` | Blocked | ブロック |
| - [ ] | `detail.goal.complete` | Completed | 完了 |
| - [ ] | `detail.goal.rounds` | Rounds | ラウンド |
| - [ ] | `detail.goal.reason` | Blocker | ブロック要因 |
| - [ ] | `detail.days` | {count} d | {count} 日 |
| - [ ] | `detail.hours` | {count} h | {count} 時間 |
| - [ ] | `detail.minutes` | {count} min | {count} 分 |
| - [ ] | `detail.seconds` | {count} s | {count} 秒 |
| - [ ] | `detail.schedule.once` | Once | 1 回のみ |
| - [ ] | `detail.schedule.every` | Every {interval} | {interval} ごと |
| - [ ] | `detail.schedule.when` | Scheduled for | 実行予定 |
| - [ ] | `detail.schedule.frequency` | Repeat | 繰り返し |
| - [ ] | `detail.schedule.scheduled` | Scheduled | 予約済み |
| - [ ] | `detail.schedule.overdue` | Overdue, awaiting session resume | 期限超過。セッションの再開待ち |
| - [ ] | `detail.schedule.empty` | No reminders | リマインダーはありません |
| - [ ] | `detail.schedule.deleted` | Deleted | 削除済み |
| - [ ] | `detail.schedule.count` | {count} reminders | リマインダー {count} 件 |
| - [ ] | `detail.schedule.daily` | Every day at {time} ({zone}) | 毎日 {time} ({zone}) |
| - [ ] | `detail.schedule.weekly` | Weekly on {days} at {time} ({zone}) | 毎週 {days} の {time} ({zone}) |
| - [ ] | `detail.schedule.cron` | Cron {expression} ({zone}) | Cron {expression} ({zone}) |
| - [ ] | `detail.weekday.1` | Mon | 月 |
| - [ ] | `detail.weekday.2` | Tue | 火 |
| - [ ] | `detail.weekday.3` | Wed | 水 |
| - [ ] | `detail.weekday.4` | Thu | 木 |
| - [ ] | `detail.weekday.5` | Fri | 金 |
| - [ ] | `detail.weekday.6` | Sat | 土 |
| - [ ] | `detail.weekday.7` | Sun | 日 |
| - [ ] | `detail.weekday.join` | ,  | ・ |
| - [ ] | `tool.title.inspectProviders` | Inspect providers | inspect プロバイダーを確認 |
| - [ ] | `tool.title.queryRuntime` | Query runtime | ランタイムを照会 |
| - [ ] | `tool.title.inspectPlugins` | Inspect plugins | プラグインを調査 |
| - [ ] | `tool.title.workflow` | Run workflow | ワークフローを実行 |
| - [ ] | `tool.title.ralph` | Run ralph loop | ralph ループを実行 |
| - [ ] | `tool.title.readEvent` | Read event | イベントを読む |
| - [ ] | `tool.title.searchEvents` | Search events | イベントを検索 |
| - [ ] | `tool.title.traceEvent` | Trace event | イベントを追跡 |
| - [ ] | `tool.title.searchSessions` | Search sessions | セッションを検索 |
| - [ ] | `tool.title.traceSession` | Trace session | セッションを追跡 |
| - [ ] | `tool.title.listModels` | List models | モデル一覧 |
| - [ ] | `tool.title.subagent` | Create subagent | サブエージェントを作成 |
| - [ ] | `tool.title.listAgents` | List subagents | サブエージェント一覧 |
| - [ ] | `tool.title.sendMessage` | Send message | メッセージを送信 |
| - [ ] | `tool.title.interruptAgent` | Interrupt agent | Agent を中断 |
| - [ ] | `tool.title.listJobs` | List background jobs | バックグラウンドジョブ一覧 |
| - [ ] | `tool.title.readJob` | Read job output | ジョブ出力を読む |
| - [ ] | `tool.title.killJob` | Cancel background job | バックグラウンドジョブをキャンセル |
| - [ ] | `tool.title.openTerminal` | Open terminal | ターミナルを開く |
| - [ ] | `tool.title.readTerminal` | Read terminal | ターミナルを読む |
| - [ ] | `tool.title.listTerminals` | List terminals | ターミナル一覧 |
| - [ ] | `tool.title.signalTerminal` | Signal terminal | ターミナルにシグナルを送る |
| - [ ] | `tool.title.closeTerminal` | Close terminal | ターミナルを閉じる |
| - [ ] | `tool.title.lsp` | Query code symbols | コードシンボルを照会 |
| - [ ] | `tool.title.findDefinition` | Find definition | 定義を検索 |
| - [ ] | `tool.title.findReferences` | Find references | 参照を検索 |
| - [ ] | `tool.title.findImplementation` | Find implementation | 実装を検索 |
| - [ ] | `tool.title.hoverSymbol` | Inspect symbol | シンボルを調べる |
| - [ ] | `tool.title.spawnTeammate` | Create teammate | チームメイトを作成 |
| - [ ] | `tool.title.createTeamTask` | Create team task | チームタスクを作成 |
| - [ ] | `tool.title.getTeamTask` | Read team task | チームタスクを読む |
| - [ ] | `tool.title.updateTeamTask` | Update team task | チームタスクを更新 |
| - [ ] | `tool.title.listTeamTasks` | List team tasks | チームタスク一覧 |
| - [ ] | `tool.title.waitAgent` | Wait for subagent | サブエージェントを待機 |
| - [ ] | `detail.recordedResult` | Recorded result | 記録された結果 |
| - [ ] | `detail.empty` | No results | 結果はありません |
| - [ ] | `detail.none` | None | なし |
| - [ ] | `detail.yes` | Yes | はい |
| - [ ] | `detail.no` | No | いいえ |
| - [ ] | `detail.moreInInspect` | {count} more items available in Inspect | Inspect でさらに {count} 件を確認できます |
| - [ ] | `detail.status.running` | Running | 実行中 |
| - [ ] | `detail.status.idle` | Idle | 待機中 |
| - [ ] | `detail.status.ready` | Ready | 準備完了 |
| - [ ] | `detail.status.inactive` | Inactive | 非アクティブ |
| - [ ] | `detail.status.provisioning` | Provisioning | 準備中 |
| - [ ] | `detail.status.failed` | Failed | 失敗 |
| - [ ] | `detail.status.completed` | Completed | 完了 |
| - [ ] | `detail.status.deleted` | Deleted | 削除済み |
| - [ ] | `detail.status.killed` | Cancelled | キャンセル済み |
| - [ ] | `detail.status.accepted` | Accepted | 受理済み |
| - [ ] | `detail.status.queued` | Queued | キュー内 |
| - [ ] | `detail.status.exited` | Exited | 終了 |
| - [ ] | `detail.field.id` | ID | ID |
| - [ ] | `detail.field.revision` | Revision | リビジョン |
| - [ ] | `detail.field.platform` | Platform | プラットフォーム |
| - [ ] | `detail.field.provider` | Provider | プロバイダー |
| - [ ] | `detail.field.model` | Model | モデル |
| - [ ] | `detail.field.role` | Role | ロール |
| - [ ] | `detail.field.context` | Context | コンテキスト |
| - [ ] | `detail.field.owner` | Owner | オーナー |
| - [ ] | `detail.field.ready` | Ready | 準備完了 |
| - [ ] | `detail.field.dependencies` | Dependencies | 依存関係 |
| - [ ] | `detail.field.writeScopes` | Write scopes | 書き込み範囲 |
| - [ ] | `detail.field.warnings` | Warnings | 警告 |
| - [ ] | `detail.field.diagnostics` | Diagnostics | 診断 |
| - [ ] | `detail.field.methods` | Methods | メソッド |
| - [ ] | `detail.field.inputSchema` | Input schema | 入力スキーマ |
| - [ ] | `detail.field.outputSchema` | Output schema | 出力スキーマ |
| - [ ] | `detail.field.currentPackage` | Current package | 現在のパッケージ |
| - [ ] | `detail.field.nextPackage` | Next package | 次のパッケージ |
| - [ ] | `detail.field.latestRun` | Latest run | 最新の実行 |
| - [ ] | `detail.field.packages` | Packages | パッケージ |
| - [ ] | `detail.field.registrations` | Registrations | 登録 |
| - [ ] | `detail.field.props` | Props | props |
| - [ ] | `detail.field.data` | Data | データ |
| - [ ] | `detail.field.source` | Source | ソース |
| - [ ] | `detail.field.content` | Content | 内容 |
| - [ ] | `detail.field.message` | Message | メッセージ |
| - [ ] | `detail.field.messageId` | Message ID | メッセージ ID |
| - [ ] | `detail.field.root` | Root | ルート |
| - [ ] | `detail.field.pid` | Process ID | プロセス ID |
| - [ ] | `detail.field.type` | Type | 種類 |
| - [ ] | `detail.field.time` | Time | 時刻 |
| - [ ] | `detail.field.seq` | Event sequence | イベント連番 |
| - [ ] | `detail.field.turn` | Turn | ターン |
| - [ ] | `detail.field.step` | Step | ステップ |
| - [ ] | `detail.field.callId` | Call ID | 呼び出し ID |
| - [ ] | `detail.field.agents` | Agents started | 起動した Agent |
| - [ ] | `detail.field.result` | Result | 結果 |
| - [ ] | `detail.field.parent` | Parent | 親 |
| - [ ] | `detail.field.depth` | Depth | 深さ |
| - [ ] | `detail.field.exitCode` | Exit code | 終了コード |
| - [ ] | `detail.field.signal` | Signal | シグナル |
| - [ ] | `detail.field.previousStatus` | Previous status | 以前の状態 |
| - [ ] | `detail.field.agent` | Agent ID | Agent ID |
| - [ ] | `detail.field.job` | Job ID | ジョブ ID |
| - [ ] | `detail.field.task` | Task | タスク |
| - [ ] | `detail.field.processGroup` | Process group | プロセスグループ |
| - [ ] | `detail.field.availability` | Availability | 可用性 |
| - [ ] | `detail.field.bestMatch` | Best match | 最良一致 |
| - [ ] | `detail.field.target` | Target event | 対象イベント |
| - [ ] | `detail.field.surface` | Record status | レコードの状態 |
| - [ ] | `detail.agents.count` | {count} agents | Agent {count} 件 |
| - [ ] | `detail.jobs.count` | {count} background jobs | バックグラウンドジョブ {count} 件 |
| - [ ] | `detail.terminals.count` | {count} terminals | ターミナル {count} 件 |
| - [ ] | `detail.tasks.count` | {count} team tasks | チームタスク {count} 件 |
| - [ ] | `detail.tasks.nextPage` | More tasks available; next cursor is {cursor} | さらにタスクがあります。次のカーソル: {cursor} |
| - [ ] | `detail.locations.count` | {count} locations | {count} 箇所 |
| - [ ] | `detail.location` | Line {line}, column {column} | {line} 行 {column} 列 |
| - [ ] | `detail.receipt.delivered` | Message delivered | メッセージを配信しました |
| - [ ] | `detail.receipt.interrupt` | Interrupt requested | 中断を要求しました |
| - [ ] | `detail.receipt.started` | Started | 開始しました |
| - [ ] | `detail.receipt.cancel` | Cancellation requested | キャンセルを要求しました |
| - [ ] | `detail.receipt.alreadyFinished` | Already finished | すでに完了しています |
| - [ ] | `detail.receipt.signal` | Signal delivered | シグナルを送信しました |
| - [ ] | `detail.receipt.closed` | Closed | 閉じました |
| - [ ] | `detail.receipt.closing` | Closing | 閉じています |
| - [ ] | `detail.wait.noProgress` | No active subagents | 稼働中のサブエージェントはありません |
| - [ ] | `detail.wait.title` | Subagent activity | サブエージェントの動き |
| - [ ] | `detail.wait.timeout` | Wait timed out | 待機がタイムアウトしました |
| - [ ] | `detail.wait.changed` | Change detected | 変更を検出しました |
| - [ ] | `detail.agent.reply` | Agent response | Agent の応答 |
| - [ ] | `detail.models.title` | Available models | 利用可能なモデル |
| - [ ] | `detail.output.lines` | Lines {begin}–{end} of {total} | {total} 行中 {begin}–{end} 行 |
| - [ ] | `detail.output.truncated` | Output truncated | 出力を省略しました |
| - [ ] | `detail.providers.count` | {count} inspect providers | inspect プロバイダー {count} 件 |
| - [ ] | `detail.plugins.count` | {count} dynamic plugins | 動的プラグイン {count} 件 |
| - [ ] | `detail.workflow.script` | Workflow script | ワークフロースクリプト |
| - [ ] | `detail.ralph.reportedComplete` | Worker reported completion | ワーカーが完了を報告しました |
| - [ ] | `detail.ralph.reportedBlocker` | Worker reported a blocker | ワーカーがブロックを報告しました |
| - [ ] | `detail.ralph.limit` | Round limit reached | ラウンドの上限に達しました |
| - [ ] | `detail.report.nextSteps` | Remaining work | 残りの作業 |
| - [ ] | `detail.trace.replacedBy` | Replaced by | 置き換え先 |
| - [ ] | `detail.trace.replacementChain` | Replacement chain | 置き換えの連鎖 |
| - [ ] | `detail.trace.replaces` | Replaced events | 置き換え元のイベント |
| - [ ] | `detail.trace.sources` | Source events | ソースイベント |
| - [ ] | `detail.trace.derived` | Derived events | 派生イベント |
| - [ ] | `detail.trace.ancestors` | Ancestor sessions | 祖先セッション |
| - [ ] | `detail.trace.descendants` | Descendant sessions | 子孫セッション |
| - [ ] | `detail.matches.count` | {count} matches | {count} 件一致 |
| - [ ] | `detail.matches.capped` | Result limit reached; narrow the search for more | 結果の上限に達しました。さらに絞り込んで検索してください |
| - [ ] | `detail.event.neighbors` | Surrounding events | 前後のイベント |
| - [ ] | `todo.completed` | {done}/{total} completed | {done}/{total} 完了 |
| - [ ] | `command.attachmentsUnsupported` | /{command} does not accept attachments; remove them first | /{command} は添付を受け付けません。先に削除してください |
| - [ ] | `ask.rowTitle` | Ask question | 質問する |
| - [ ] | `ask.waiting` | waiting | 回答待ち |
| - [ ] | `ask.pending` | continued; answer still available | 続行済み。まだ回答できます |
| - [ ] | `ask.pendingDetail` | These pending questions remain answerable from the composer. | 未回答の質問には、入力欄から引き続き回答できます。 |
| - [ ] | `ask.reopen` | Answer | 回答する |
| - [ ] | `ask.review` | View answers | 回答を見る |
| - [ ] | `ask.closed` | closed | 終了 |
| - [ ] | `ask.closedDetail` | This question is closed; its outcome is in the conversation below. | この質問は終了しています。結果は下の会話にあります。 |
| - [ ] | `ask.cancelled` | cancelled | キャンセル済み |
| - [ ] | `ask.cancelledDetail` | This question set was cancelled before answers were submitted. | この質問は回答が送信される前にキャンセルされました。 |
| - [ ] | `ask.interrupted` | interrupted | 中断済み |
| - [ ] | `ask.interruptedDetail` | This question set was interrupted before answers were submitted. | この質問は回答が送信される前に中断されました。 |
| - [ ] | `ask.answered` | {answered}/{total} answered | {answered}/{total} 回答済み |
| - [ ] | `ask.skipped` | Not answered | 未回答 |
| - [ ] | `bash.running` | Running | 実行中 |
| - [ ] | `bash.failed` | Failed | 失敗 |
| - [ ] | `bash.stopped` | Stopped | 停止 |
| - [ ] | `row.running` | Running | 実行中 |
| - [ ] | `row.preparing` | Preparing tool call | ツール呼び出しを準備しています |
| - [ ] | `row.failed` | Failed | 失敗 |
| - [ ] | `row.stopped` | Stopped | 停止 |
| - [ ] | `row.input` | IN | 入力 |
| - [ ] | `row.output` | OUT | 出力 |
| - [ ] | `row.inspect` | Inspect | 呼び出しを確認 |
| - [ ] | `tool.title.search` | Search | 検索 |
| - [ ] | `tool.title.read` | Read | 読み取り |
| - [ ] | `tool.title.bash` | Bash | Bash |
| - [ ] | `tool.title.write` | Write | 書き込み |
| - [ ] | `tool.title.edit` | Edit | 編集 |
| - [ ] | `tool.title.code` | Code | コード |
| - [ ] | `tool.title.generic` | Tool call | ツール呼び出し |
| - [ ] | `tool.title.inspect` | Query Cordis environment | Cordis 環境を照会 |
| - [ ] | `tool.title.runCordis` | Run Cordis Plugin | Cordis プラグインを実行 |
| - [ ] | `tool.title.stopCordis` | Stop Cordis Plugin | Cordis プラグインを停止 |
| - [ ] | `tool.title.removeCordis` | Remove Cordis Plugin | Cordis プラグインを削除 |
| - [ ] | `tool.title.pwsh` | Pwsh | Pwsh |
| - [ ] | `tool.title.readImage` | Read image | 画像を読み取る |
| - [ ] | `tool.title.grep` | Grep | Grep |
| - [ ] | `tool.title.glob` | Glob | Glob |
| - [ ] | `tool.title.webSearch` | Search | 検索 |
| - [ ] | `tool.title.webFetch` | Fetch | 取得 |
| - [ ] | `tool.autoReviewRejected` | Rejected by Auto review | 自動レビューで拒否されました |
| - [ ] | `tool.autoReviewNotExecuted` | Tool was not executed. Reason: {reason} | ツールは実行されませんでした。理由: {reason} |
| - [ ] | `tool.autoReviewReasonFallback` | Auto review did not authorize this action | 自動レビューがこの操作を許可しませんでした |
| - [ ] | `diff.collapseAria` | Collapse diff | 差分を折りたたむ |
| - [ ] | `diff.expandAria` | Expand {count} more diff lines | 差分の残り {count} 行を展開 |
| - [ ] | `diff.expandRest` | … {count} more lines | … 残り {count} 行 |
| - [ ] | `read.window` | Showing {shown} of {total} lines | {total} 行中 {shown} 行を表示 |
| - [ ] | `read.collapseAria` | Collapse content | 内容を折りたたむ |
| - [ ] | `read.expandAria` | Expand {count} more lines | 残り {count} 行を展開 |
| - [ ] | `read.expandRest` | … {count} more lines | … 残り {count} 行 |
| - [ ] | `search.paths` | {shown} paths | {shown} 件のパス |
| - [ ] | `search.paths.truncated` | Showing {shown} of {total} paths | {total} 件中 {shown} 件のパスを表示 |
| - [ ] | `search.matches` | {shown} matches · {files} files | {shown} 件一致 · {files} ファイル |
| - [ ] | `search.matches.truncated` | Showing {shown} of {total} matches · {files} files | {total} 件中 {shown} 件の一致 · {files} ファイル |
| - [ ] | `search.noResults` | No results | 結果なし |
| - [ ] | `search.collapseAria` | Collapse results | 結果を折りたたむ |
| - [ ] | `search.expandAria` | Expand {count} more result lines | 結果の残り {count} 行を展開 |
| - [ ] | `search.expandRest` | … {count} more lines | … 残り {count} 行 |
| - [ ] | `web.noResults` | No results found | 結果が見つかりません |
| - [ ] | `web.sourcesTruncated` | Source list truncated | ソース一覧を省略しました |
| - [ ] | `web.http` | HTTP | HTTP |
| - [ ] | `web.contentTruncated` | Content truncated | 内容を省略しました |
| - [ ] | `details.running` | Running… | 実行中… |
| - [ ] | `queue.count` | {n} queued messages | キュー内のメッセージ {n} 件 |
| - [ ] | `queue.sending` | Sending… | 送信中… |
| - [ ] | `queue.image` | Queued message image | キュー内メッセージの画像 |
| - [ ] | `queue.file` | Queued file {name} | キュー内のファイル {name} |
| - [ ] | `queue.edit` | Edit queued message | キュー内メッセージを編集 |
| - [ ] | `queue.edit.unsupported` | Contains non-text content; editing is not supported yet | テキスト以外の内容を含むため、まだ編集できません |
| - [ ] | `queue.save` | Save queued message | キュー内メッセージを保存 |
| - [ ] | `queue.cancelEdit` | Cancel editing | 編集をキャンセル |
| - [ ] | `queue.remove` | Remove queued message | キューから削除 |
| - [ ] | `queue.steer` | Steer queued message | キュー内メッセージをステア |
| - [ ] | `queue.steer.unavailable` | Steering is available only while the agent is running | ステアは Agent の実行中のみ利用できます |
| - [ ] | `error.sessionInUse` | This session is already in use, possibly by another running DSH instance (such as dsh web or the desktop app). Quit other running DSH instances and try again. | このセッションはすでに使用中です。別の DSH インスタンス (dsh web やデスクトップアプリなど) が使用している可能性があります。他の DSH を終了して再試行してください。 |
| - [ ] | `queue.editFailed` | Edit failed: this message may have already started sending. | 編集に失敗しました。このメッセージはすでに送信が始まっている可能性があります。 |
| - [ ] | `queue.removeFailed` | Removal failed: this message may have already started sending. | 削除に失敗しました。このメッセージはすでに送信が始まっている可能性があります。 |
| - [ ] | `queue.steerFailed` | Steering failed. Try again. | ステアに失敗しました。再試行してください。 |
| - [ ] | `terminal.signal` | signal {signal} | シグナル {signal} |
| - [ ] | `terminal.exitCode` | exit code {code} | 終了コード {code} |
| - [ ] | `terminal.noExitCode` | no exit code | 終了コードなし |
| - [ ] | `terminal.running` | Running | 実行中 |
| - [ ] | `terminal.failed` | Failed | 失敗 |
| - [ ] | `terminal.done` | Done | 完了 |
| - [ ] | `terminal.noOutput` | No output | 出力なし |
| - [ ] | `terminal.collapseAria` | Collapse output | 出力を折りたたむ |
| - [ ] | `terminal.expandAria` | Expand the remaining {n} output lines | 出力の残り {n} 行を展開 |
| - [ ] | `terminal.expandRest` | … {n} more lines | … 残り {n} 行 |
| - [ ] | `terminal.sendInput` | (send input) | (入力を送信) |
| - [ ] | `terminal.session` | Terminal {sessionId} | ターミナル {sessionId} |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
