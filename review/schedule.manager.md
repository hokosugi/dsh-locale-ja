# schedule.manager — 日本語訳レビュー

訳済み **215 / 215** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 複数行の文言 (Markdown として描画されるもの)

### `detail.instructionPlaceholder`

**日本語訳** — UI では次のように描画されます

> タスクと成果を説明してください。
> 例: 読書リストを出典リンク付きで要約する。

<details><summary>英語原文</summary>

```markdown
Describe the task and result.
E.g. Summarize my reading list with source links.
```

</details>

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `host.create` | Create | 作成 |
| - [ ] | `host.createMethod` | Choose a creation method | 作成方法を選ぶ |
| - [ ] | `host.chatCreate` | Create in a session | セッションで作成 |
| - [ ] | `host.createPrompt` | Please create an automation task based on the requirements. | 要件に基づいて自動化タスクを作成してください。 |
| - [ ] | `host.manualCreate` | Create manually | 手動で作成 |
| - [ ] | `host.closeCreate` | Close creation form | 作成フォームを閉じる |
| - [ ] | `host.creating` | Creating… | 作成しています… |
| - [ ] | `host.createError` | Could not create the task. Your input is preserved; try again. | タスクを作成できませんでした。入力は保持されています。もう一度お試しください。 |
| - [ ] | `host.notFuture` | Choose a future schedule; edit the task timing before resuming | 未来のスケジュールを選んでください。再開する前にタスクの時刻を編集してください |
| - [ ] | `host.invalidRule` | Check the rule and time zone | ルールとタイムゾーンを確認してください |
| - [ ] | `host.target` | Run in | 実行場所 |
| - [ ] | `host.targetNewOnce` | Create a session and reuse it | セッションを 1 つ作成して再利用 |
| - [ ] | `host.targetNew` | New session for every run | 実行ごとに新しいセッション |
| - [ ] | `host.latestConversation` | Latest run session | 直近の実行セッション |
| - [ ] | `host.currentConversation` | Current linked session | 現在リンクされているセッション |
| - [ ] | `host.targetNewOnceHelp` | Create it on the first run and keep using it | 初回の実行時に作成し、そのまま使い続けます |
| - [ ] | `host.targetNewHelp` | Create a separate session for each run | 実行ごとに別のセッションを作成します |
| - [ ] | `host.project` | Linked workspace | リンクするワークスペース |
| - [ ] | `host.defaultProject` | Default workspace | 既定のワークスペース |
| - [ ] | `host.ungrouped` | Ungrouped | 未分類 |
| - [ ] | `host.interval` | Interval | 間隔 |
| - [ ] | `host.monthDay` | Day of the month | 日 |
| - [ ] | `host.customRule` | Customize | カスタマイズ |
| - [ ] | `host.newSessionInterval` | Minimum run interval: {interval} | 最短の実行間隔: {interval} |
| - [ ] | `host.limitsLoading` | Loading the run interval limit | 実行間隔の上限を読み込み中 |
| - [ ] | `host.limitsError` | Could not load the run interval limit. Try again before saving. | 実行間隔の上限を読み込めませんでした。保存する前にもう一度お試しください。 |
| - [ ] | `host.pause` | Pause | 一時停止 |
| - [ ] | `host.resume` | Resume | 再開 |
| - [ ] | `host.run` | Run now | 今すぐ実行 |
| - [ ] | `host.runAfterInterval` | The minimum run interval has not passed. Run now is available at {time}. | 最短の実行間隔がまだ経過していません。「今すぐ実行」は {time} から使えます。 |
| - [ ] | `host.saveError` | Could not save. Your changes are preserved; try again. | 保存できませんでした。変更は保持されています。もう一度お試しください。 |
| - [ ] | `host.conflict` | This task changed elsewhere. Review the latest values with your edits, or discard your changes. | このタスクは別の場所で変更されました。最新の値とあなたの編集を確認するか、変更を破棄してください。 |
| - [ ] | `host.reapply` | Review with my edits | 自分の編集と比較して確認 |
| - [ ] | `host.runError` | Could not queue the task. Try again. | タスクをキューに入れられませんでした。もう一度お試しください。 |
| - [ ] | `host.executionPending` | This task is queued, running, or was just delivered. Try again later. | このタスクはキュー待ち・実行中・または配信直後です。しばらくしてからもう一度お試しください。 |
| - [ ] | `host.executionActive` | This task is queued or running. Manage it in the session. | このタスクはキュー待ちまたは実行中です。セッションで管理してください。 |
| - [ ] | `host.sessionAfterFirstRun` | Pending creation | 作成待ち |
| - [ ] | `status.paused` | Paused | 一時停止中 |
| - [ ] | `status.ended` | Ended | 終了 |
| - [ ] | `host.openDeliverySession` | Open session | セッションを開く |
| - [ ] | `host.frequency.monthly` | Every month | 毎月 |
| - [ ] | `host.frequency.advanced` | Custom | カスタム |
| - [ ] | `panel` | Automation tasks | 自動化タスク |
| - [ ] | `title` | Automation tasks | 自動化タスク |
| - [ ] | `new.action` | New | 新規 |
| - [ ] | `list.label` | Task catalog | タスク一覧 |
| - [ ] | `list.nextPrefix` | Next scheduled time:  | 次回の実行予定:  |
| - [ ] | `list.loading` | Loading tasks… | タスクを読み込み中… |
| - [ ] | `list.error` | Could not load tasks. | タスクを読み込めませんでした。 |
| - [ ] | `list.retry` | Retry | 再試行 |
| - [ ] | `list.empty` | No tasks yet. Tasks created in your sessions appear here. | タスクはまだありません。セッションで作成したタスクがここに表示されます。 |
| - [ ] | `list.emptyActive` | No active automation tasks | 有効な自動化タスクはありません |
| - [ ] | `list.emptyPaused` | No paused automation tasks | 一時停止中の自動化タスクはありません |
| - [ ] | `list.emptyInactive` | No ended automation tasks | 終了した自動化タスクはありません |
| - [ ] | `list.noMatches` | No matching tasks | 一致するタスクがありません |
| - [ ] | `search.label` | Search tasks | タスクを検索 |
| - [ ] | `search.placeholder` | Search automation tasks | 自動化タスクを検索 |
| - [ ] | `search.clear` | Clear search | 検索をクリア |
| - [ ] | `empty.action` | New automation task | 自動化タスクを作成 |
| - [ ] | `statusFilter.label` | Task status | タスクの状態 |
| - [ ] | `statusFilter.all` | All | すべて |
| - [ ] | `status.active` | Enabled | 有効 |
| - [ ] | `detail.label` | Task details | タスクの詳細 |
| - [ ] | `detail.close` | Close details | 詳細を閉じる |
| - [ ] | `detail.more` | Automation task actions | 自動化タスクの操作 |
| - [ ] | `detail.nextRun` | Next run | 次回の実行 |
| - [ ] | `detail.tabs` | Task detail views | タスク詳細の表示 |
| - [ ] | `detail.rule` | Rules | ルール |
| - [ ] | `detail.records` | Records | 記録 |
| - [ ] | `delivery.empty` | No delivery record available | 実行記録がありません |
| - [ ] | `delivery.loading` | Loading delivery records… | 実行記録を読み込み中… |
| - [ ] | `delivery.error` | Could not load delivery records. | 実行記録を読み込めませんでした。 |
| - [ ] | `delivery.notFound` | This task is no longer available. | このタスクは利用できません。 |
| - [ ] | `delivery.cursorError` | Records were updated. | 記録が更新されました。 |
| - [ ] | `delivery.retry` | Retry | 再試行 |
| - [ ] | `delivery.refresh` | Refresh | 更新 |
| - [ ] | `delivery.loadMore` | Load more | さらに読み込む |
| - [ ] | `delivery.expand` | Expand | 展開する |
| - [ ] | `delivery.collapse` | Collapse | 折りたたむ |
| - [ ] | `delivery.pruned` | Earlier delivery records have been cleared | 以前の実行記録は削除されました |
| - [ ] | `delivery.retention` | Retention rules | 保存期間のルール |
| - [ ] | `delivery.retentionBounds` | Each task keeps up to {records} delivery records from the last {days} days. | 各タスクは直近 {days} 日間の実行記録を最大 {records} 件保持します。 |
| - [ ] | `delivery.retentionExplanation` | When a new record is saved, older records outside these limits are cleared automatically. Clearing records does not stop the task. | 新しい記録が保存されると、この範囲を超えた古い記録は自動的に削除されます。記録を削除してもタスクは停止しません。 |
| - [ ] | `detail.name` | Automation task name | 自動化タスクの名前 |
| - [ ] | `detail.namePlaceholder` | E.g. Daily reading digest | 例: 毎日の読書ダイジェスト |
| - [ ] | `detail.instruction` | Automation task instruction | 自動化タスクの内容 |
| - [ ] | `detail.session` | Linked session | リンクされたセッション |
| - [ ] | `detail.openSession` | Linked session: open linked session | リンクされたセッションを開く |
| - [ ] | `detail.openSessionTitle` | Linked session {title}: open linked session | リンクされたセッション {title} を開く |
| - [ ] | `detail.sessionLoading` | Loading linked session information. | リンクされたセッションの情報を読み込み中です。 |
| - [ ] | `detail.sessionArchived` | The linked session is archived. | リンクされたセッションはアーカイブされています。 |
| - [ ] | `detail.sessionUnavailable` | The linked session is unavailable. | リンクされたセッションは利用できません。 |
| - [ ] | `detail.missing` | Task unavailable. It may have been deleted. | タスクを利用できません。削除された可能性があります。 |
| - [ ] | `delivery.label` | Saved delivery record | 保存された実行記録 |
| - [ ] | `frequency.once` | Once | 1 回のみ |
| - [ ] | `frequency.every` | Every {value} {unit} | {value} {unit}ごと |
| - [ ] | `frequency.hostMonthly` | Monthly on day {days} at {time}, or month end | 毎月 {days} 日 {time}（存在しない場合は月末） |
| - [ ] | `frequency.hostDailyInterval` | Every {interval} days at {time} | {interval} 日ごと {time} |
| - [ ] | `frequency.hostWeeklyInterval` | Every {interval} weeks on {weekdays} at {time} | {interval} 週ごと {weekdays} {time} |
| - [ ] | `frequency.hostMonthlyInterval` | Every {interval} months on day {days} at {time}, or month end | {interval} か月ごと {days} 日 {time}（存在しない場合は月末） |
| - [ ] | `frequency.hostZone` | {rule} ({timeZone}) | {rule}（{timeZone}） |
| - [ ] | `frequency.hostCustom` | Custom | カスタム |
| - [ ] | `time.locale` | en | ja |
| - [ ] | `time.utcPrefix` | UTC | UTC |
| - [ ] | `frequency.daily` | Daily at {time} ({timeZone}) | 毎日 {time} ({timeZone}) |
| - [ ] | `frequency.dailyLocal` | Daily at {time} | 毎日 {time} |
| - [ ] | `frequency.weekly` | Weekly on {weekdays} at {time} ({timeZone}) | 毎週 {weekdays} の {time} ({timeZone}) |
| - [ ] | `frequency.weeklyLocal` | Weekly on {weekdays} at {time} | 毎週 {weekdays} の {time} |
| - [ ] | `frequency.cron` | Custom ({timeZone}) | カスタム（{timeZone}） |
| - [ ] | `frequency.cronLocal` | Custom | カスタム |
| - [ ] | `frequency.cronRule` | {rule} ({timeZone}) | {rule} ({timeZone}) |
| - [ ] | `cron.list.join` | ,  | 、 |
| - [ ] | `cron.part.join` |   |   |
| - [ ] | `cron.weekday.name` | {weekday} | {weekday}曜日 |
| - [ ] | `cron.weekday.range` | {from}–{to} | {from}〜{to} |
| - [ ] | `cron.months` |  in {months} |  ({months}) |
| - [ ] | `cron.day.every` | Every day{months} | 毎日{months} |
| - [ ] | `cron.day.weekdays` | {weekdays}{months} | {weekdays}{months} |
| - [ ] | `cron.day.monthDays` | Day {days} of every month{months} | 毎月 {days} 日{months} |
| - [ ] | `cron.day.both` | Day {days} of every month or {weekdays}{months} | 毎月 {days} 日または{weekdays}{months} |
| - [ ] | `cron.day.bothStarred` | Day {days} of every month and {weekdays}{months} | 毎月 {days} 日かつ{weekdays}{months} |
| - [ ] | `cron.hours.range` | {from}–{to} | {from}〜{to} |
| - [ ] | `cron.hours.list` | {hours} | {hours} |
| - [ ] | `cron.time.everyMinute` | Every minute | 毎分 |
| - [ ] | `cron.time.everyMinutes` | Every {step} minutes | {step} 分ごと |
| - [ ] | `cron.time.joinedEveryMinute` | every minute | 毎分 |
| - [ ] | `cron.time.joinedEveryMinutes` | every {step} minutes | {step} 分ごと |
| - [ ] | `cron.time.everyHour` | Every hour | 毎時 |
| - [ ] | `cron.time.joinedEveryHour` | every hour | 毎時 |
| - [ ] | `cron.time.everyNHours` | Every {count} hours | {count} 時間ごと |
| - [ ] | `cron.time.joinedEveryNHours` | every {count} hours | {count} 時間ごと |
| - [ ] | `cron.time.hourlyAt` | Every hour at minute {minutes} | 毎時 {minutes} 分 |
| - [ ] | `cron.time.joinedHourlyAt` | every hour at minute {minutes} | 毎時 {minutes} 分 |
| - [ ] | `cron.time.hoursEveryMinute` | every minute during hours {hours} | {hours} 時の間は毎分 |
| - [ ] | `cron.time.hoursEveryMinutes` | every {step} minutes during hours {hours} | {hours} 時の間は {step} 分ごと |
| - [ ] | `cron.time.at` | at {times} | {times} に |
| - [ ] | `cron.time.hoursAt` | at minute {minutes} of hours {hours} | {hours} 時の {minutes} 分に |
| - [ ] | `frequency.weekday.join` | ,  | 、 |
| - [ ] | `frequency.weekday.1` | Mon | 月 |
| - [ ] | `frequency.weekday.2` | Tue | 火 |
| - [ ] | `frequency.weekday.3` | Wed | 水 |
| - [ ] | `frequency.weekday.4` | Thu | 木 |
| - [ ] | `frequency.weekday.5` | Fri | 金 |
| - [ ] | `frequency.weekday.6` | Sat | 土 |
| - [ ] | `frequency.weekday.7` | Sun | 日 |
| - [ ] | `unit.day.one` | day | 日 |
| - [ ] | `unit.day.other` | days | 日 |
| - [ ] | `unit.hour.one` | hour | 時間 |
| - [ ] | `unit.hour.other` | hours | 時間 |
| - [ ] | `unit.minute.one` | minute | 分 |
| - [ ] | `unit.minute.other` | minutes | 分 |
| - [ ] | `unit.second.one` | second | 秒 |
| - [ ] | `unit.second.other` | seconds | 秒 |
| - [ ] | `relative.now` | Due now | まもなく実行 |
| - [ ] | `relative.future` | in {value} {unit} | {value} {unit}後 |
| - [ ] | `relative.overdue` | {value} {unit} overdue | {value} {unit}超過 |
| - [ ] | `timing.date` | Date | 日付 |
| - [ ] | `timing.time` | Time | 時刻 |
| - [ ] | `timing.hour` | Hour | 時 |
| - [ ] | `timing.minute` | Minute | 分 |
| - [ ] | `timing.second` | Second | 秒 |
| - [ ] | `timing.prevMonth` | Previous month | 前の月 |
| - [ ] | `timing.nextMonth` | Next month | 次の月 |
| - [ ] | `timing.zone` | Time zone | タイムゾーン |
| - [ ] | `timing.zoneSearch` | Search by UTC offset, IANA ID, or city | UTC オフセット、IANA ID、都市名で検索 |
| - [ ] | `timing.zoneNoResults` | No matching time zones | 一致するタイムゾーンがありません |
| - [ ] | `timing.intervalIncrease` | Increase interval | 間隔を増やす |
| - [ ] | `timing.intervalDecrease` | Decrease interval | 間隔を減らす |
| - [ ] | `rule.title` | Run time | 実行時刻 |
| - [ ] | `rule.repeat` | Repeat | 繰り返し |
| - [ ] | `rule.weekday` | Weekday | 曜日 |
| - [ ] | `rule.weekdayOption` | Weekday {weekday} | {weekday}曜日 |
| - [ ] | `rule.unsaved` | Unsaved changes | 未保存の変更 |
| - [ ] | `rule.save` | Save changes | 変更を保存 |
| - [ ] | `rule.saving` | Saving… | 保存しています… |
| - [ ] | `rule.invalid` | Edit the custom rule, choose another repeat option, or ask the agent to correct it. | カスタムルールを編集するか、別の繰り返し方法を選ぶか、Agent に修正を依頼してください。 |
| - [ ] | `rule.invalidTitle` | Use a task name of 1–120 characters. | タスク名は 1〜120 文字にしてください。 |
| - [ ] | `rule.invalidInterval` | Enter a whole number of at least 1 for the interval. | 間隔には 1 以上の整数を入力してください。 |
| - [ ] | `rule.requiredWeekday` | Select at least one weekday. | 曜日を 1 つ以上選んでください。 |
| - [ ] | `rule.invalidMonthDay` | Enter a day of the month from 1 to 31. | 1〜31 の日を入力してください。 |
| - [ ] | `rule.invalidTime` | Choose a valid date and time in the selected time zone. | 選んだタイムゾーンで有効な日時を選んでください。 |
| - [ ] | `rule.invalidZone` | Choose a valid time zone. | 有効なタイムゾーンを選んでください。 |
| - [ ] | `rule.tooComplex` | This rule is too frequent or complex. Choose a repeat option or ask the agent to simplify it. | このルールは頻度が高すぎるか複雑です。繰り返し方法を選ぶか、Agent に簡略化を依頼してください。 |
| - [ ] | `rule.cancel` | Discard | 破棄 |
| - [ ] | `rule.once` | Once | 1 回 |
| - [ ] | `rule.everyMinutes` | Every N minutes | N 分ごと |
| - [ ] | `rule.everyHours` | Every N hours | N 時間ごと |
| - [ ] | `rule.daily` | Every day | 毎日 |
| - [ ] | `rule.weekdays` | Monday to Friday | 月曜日から金曜日 |
| - [ ] | `rule.weekly` | Weekly | 毎週 |
| - [ ] | `rule.zone.system` |  (system) |  (システム) |
| - [ ] | `delete.action` | Delete task | タスクを削除 |
| - [ ] | `delete.title` | Delete this task? | このタスクを削除しますか？ |
| - [ ] | `delete.description` | This stops the task from triggering and deletes it together with its saved delivery records. The original session and its messages remain; queued messages are not withdrawn. | タスクの実行を停止し、保存された実行記録とともに削除します。元のセッションとそのメッセージは残ります。キューに入っているメッセージは取り消されません。 |
| - [ ] | `delete.confirm` | Confirm deletion | 削除を確定 |
| - [ ] | `delete.cancel` | Cancel | キャンセル |
| - [ ] | `delete.close` | Close deletion confirmation | 削除の確認を閉じる |
| - [ ] | `delete.pending` | Deleting… | 削除中… |
| - [ ] | `list.more` | More task actions | その他のタスク操作 |
| - [ ] | `clear.action` | Clear all ended tasks | 終了したタスクをすべて消去 |
| - [ ] | `clear.title` | Clear ended tasks ({count})? | 終了したタスクを消去しますか？（{count} 件） |
| - [ ] | `clear.description` | These tasks and their saved delivery records will be permanently deleted. Active and paused tasks, original sessions, and queued messages are not affected. | これらのタスクと保存された配信記録は完全に削除されます。有効なタスク・一時停止中のタスク・元のセッション・キュー内のメッセージは影響を受けません。 |
| - [ ] | `clear.confirm` | Clear tasks | タスクを消去 |
| - [ ] | `clear.pending` | Clearing… | 消去しています… |
| - [ ] | `clear.close` | Close clear confirmation | 消去の確認を閉じる |
| - [ ] | `toast.deleted` | Task deleted. | タスクを削除しました。 |
| - [ ] | `toast.deleteFailed` | Could not delete the task. | タスクを削除できませんでした。 |
| - [ ] | `toast.cleared.one` | Cleared {count} ended task. | 終了したタスクを {count} 件消去しました。 |
| - [ ] | `toast.cleared.other` | Cleared {count} ended tasks. | 終了したタスクを {count} 件消去しました。 |
| - [ ] | `toast.clearedNone` | No ended tasks to clear. | 消去する終了済みタスクはありません。 |
| - [ ] | `toast.clearFailed` | Could not clear tasks. | タスクを消去できませんでした。 |
| - [ ] | `card.open` | Open | 開く |
| - [ ] | `card.openLabel` | Open task details: {title} | タスクの詳細を開く: {title} |
| - [ ] | `card.deleted` | Deleted | 削除済み |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
