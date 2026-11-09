# liveshare — 日本語訳レビュー

訳済み **225 / 225** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `header.action` | Share | 共有 |
| - [ ] | `inputOrigin.sharedSession` | From a shared session [{subjectId}] | 共有セッションから（{subjectId}） |
| - [ ] | `dialog.title` | Share session | セッションを共有 |
| - [ ] | `dialog.done` | Done | 完了 |
| - [ ] | `dialog.shareLink` | Share link | 共有リンク |
| - [ ] | `dialog.sessionMode` | Session permission | セッションの権限 |
| - [ ] | `dialog.sessionMode.view` | Read only | 読み取り専用 |
| - [ ] | `dialog.sessionMode.write` | Workspace write | ワークスペースへの書き込み |
| - [ ] | `dialog.sessionMode.hint.view` | Read only: viewers read files and the session record within the share's scope and can message the session, but every tool runs in a read-only sandbox and no file can be written. | 読み取り専用: 閲覧者は共有の範囲内でファイルとセッション記録を読み、セッションにメッセージを送れます。ただしすべてのツールは読み取り専用のサンドボックスで実行され、ファイルは書き込めません。 |
| - [ ] | `dialog.sessionMode.hint.write` | Workspace write: the viewer works in a bounded writable sandbox — it modifies files inside the share’s scope under the writable ceiling; reads and writes beyond that scope are refused, and your global settings, credentials, and other Sessions stay closed. | ワークスペースへの書き込み: 閲覧者は制限付きの書き込み可能サンドボックスで作業し、書き込み上限の範囲内で共有のスコープ内のファイルを変更します。その範囲外の読み書きは拒否され、全体設定・認証情報・ほかのセッションは閉じたままです。 |
| - [ ] | `dialog.allowsFork` | Allow viewers to fork the session | 閲覧者にセッションの分岐を許可する |
| - [ ] | `dialog.allowsForkHint` | Forked sessions keep the same permissions as the source session. | 分岐したセッションは元のセッションと同じ権限を引き継ぎます。 |
| - [ ] | `dialog.sessionMode.notGranted` | This Harness did not report the session permission back: an older owner build needs an upgrade before the share can carry it. | この Harness はセッションの権限を返さなかったため、共有に引き継げません。所有者のビルドが古い場合は更新が必要です。 |
| - [ ] | `dialog.permissions` | Share permissions | 共有の権限 |
| - [ ] | `dialog.permissions.save` | Save changes | 変更を保存 |
| - [ ] | `dialog.permissions.saving` | Saving… | 保存しています… |
| - [ ] | `dialog.permissions.saved` | Share permissions and plugin endpoints saved. | 共有の権限とプラグインのエンドポイントを保存しました。 |
| - [ ] | `dialog.permissions.failed` | The share permissions were not saved. Try again. | 共有の権限を保存できませんでした。もう一度お試しください。 |
| - [ ] | `dialog.permissions.partial` | The session permission was updated, but the plugin endpoints were not saved. Try again. | セッションの権限は更新されましたが、プラグインのエンドポイントは保存されませんでした。もう一度お試しください。 |
| - [ ] | `dialog.permissions.modeUnsupported` | This Harness did not report a session permission, so it cannot be changed here. | この Harness はセッションの権限を返さないため、ここでは変更できません。 |
| - [ ] | `dialog.permissions.unsaved` | Unsaved changes. | 未保存の変更があります。 |
| - [ ] | `dialog.permissions.discard` | Unsaved changes; choosing Done again discards them. | 未保存の変更があります。「完了」をもう一度押すと破棄されます。 |
| - [ ] | `dialog.capabilities` | Plugin endpoints | プラグインのエンドポイント |
| - [ ] | `dialog.capabilities.description` | Choose one tier for this share; the tier expands at save time into the endpoints the plugins declare now, so endpoints they add later stay closed. | この共有に 1 つの段階を選びます。段階は保存時に、プラグインが現在宣言しているエンドポイントへ展開されるため、後から追加されたエンドポイントは閉じたままです。 |
| - [ ] | `dialog.capabilities.none` | Not open to viewers | 閲覧者に公開しない |
| - [ ] | `dialog.capabilities.count` | Endpoints open to viewers: {count} | 閲覧者に公開するエンドポイント: {count} |
| - [ ] | `dialog.capabilities.tier.none` | Unavailable | 利用不可 |
| - [ ] | `dialog.capabilities.tier.read` | Read-only | 読み取り専用 |
| - [ ] | `dialog.capabilities.tier.write` | Writable | 書き込み可能 |
| - [ ] | `dialog.capabilities.summary.read` | Read-only · {count} endpoints | 読み取り専用 · エンドポイント {count} 件 |
| - [ ] | `dialog.capabilities.summary.write` | Writable · {readable} read-only + {writable} writable | 書き込み可能 · 読み取り専用 {readable} 件 + 書き込み可能 {writable} 件 |
| - [ ] | `dialog.capabilities.stale` | The saved selection is not one whole tier; saving again replaces it with the tier you pick. | 保存済みの選択が 1 つの段階になっていません。もう一度保存すると、選んだ段階で置き換えます。 |
| - [ ] | `dialog.capabilities.noReadable` | No plugin offers a read-only endpoint, so Read-only cannot be chosen. | 読み取り専用のエンドポイントを提供するプラグインがないため、「読み取り専用」は選べません。 |
| - [ ] | `dialog.capabilities.noWritable` | No plugin offers a writable endpoint, so Writable cannot be chosen. | 書き込み可能なエンドポイントを提供するプラグインがないため、「書き込み可能」は選べません。 |
| - [ ] | `dialog.capabilities.writeHint` | A writable endpoint takes effect only when the shared Session allows writing, and is destructive inside a writable share. | 書き込み可能なエンドポイントは、共有セッションが書き込みを許可している場合にのみ有効になり、書き込み可能な共有では破壊的な操作ができます。 |
| - [ ] | `dialog.capabilities.empty` | No plugin currently declares endpoints to share. | 共有するエンドポイントを宣言しているプラグインはありません。 |
| - [ ] | `dialog.capabilities.createFailed` | The share was created, but its plugin endpoints were not saved; retry in Share permissions. | 共有は作成されましたが、プラグインのエンドポイントは保存されませんでした。共有の権限でもう一度お試しください。 |
| - [ ] | `dialog.linkHelp` | Closing this panel does not stop the share. | このパネルを閉じても共有は停止しません。 |
| - [ ] | `dialog.copyFailed` | Could not copy the link. Select the share link and copy it manually. | リンクをコピーできませんでした。共有リンクを選択して手動でコピーしてください。 |
| - [ ] | `dialog.diagnostics` | Connection details | 接続の詳細 |
| - [ ] | `dialog.accessUnavailable` | Access details for this share are unavailable. Existing permissions are unchanged. | この共有のアクセス情報を取得できません。既存の権限は変更されていません。 |
| - [ ] | `dialog.selectedCount` | Selected people confirmed: {count}. | 選択した人数の確認済み: {count} 人。 |
| - [ ] | `dialog.deploymentAccess` | Deployment-authorized identities: {count}. Selection is not the only access rule. | デプロイで許可された識別情報: {count} 件。選択だけがアクセス条件ではありません。 |
| - [ ] | `dialog.selectedRetired` | This share keeps its older "specific colleagues" scope; new shares offer only the two modes above. | この共有は以前の「特定の同僚」スコープのままです。新しい共有では上の 2 つのモードだけを選べます。 |
| - [ ] | `dialog.description` | Create a read-only Liveshare link for {title} | {title} の読み取り専用 Liveshare リンクを作成 |
| - [ ] | `dialog.relay` | Share service address | 共有サービスのアドレス |
| - [ ] | `dialog.relaySaved` | Saved. New shares use this address. | 保存しました。新しい共有はこのアドレスを使います。 |
| - [ ] | `dialog.relayInvalid` | Enter a full address starting with http:// or https://. | http:// または https:// で始まる完全なアドレスを入力してください。 |
| - [ ] | `dialog.relayCurrent` | Current address | 現在のアドレス |
| - [ ] | `dialog.relayUnset` | No address set | アドレス未設定 |
| - [ ] | `dialog.relaySource.unset` | Not set | 未設定 |
| - [ ] | `dialog.relaySource.saved` | Saved address | 保存済みのアドレス |
| - [ ] | `dialog.relayVerified` | Verified on this address | このアドレスで確認済み |
| - [ ] | `dialog.relayUnverified` | Not verified on this address | このアドレスでは未確認 |
| - [ ] | `dialog.relayReverify` | The address changed; sign in again on the new address. | アドレスが変わりました。新しいアドレスでサインインし直してください。 |
| - [ ] | `dialog.relayUnsavedHint` | This address is not saved yet; save it to put it in force. | このアドレスはまだ保存されていません。保存すると有効になります。 |
| - [ ] | `dialog.identity.expired` | Your sign-in has expired. Sign in again before creating a share. | サインインの有効期限が切れました。共有を作成する前にサインインし直してください。 |
| - [ ] | `dialog.identity.unverified` | You are not signed in, so you cannot create a share. | サインインしていないため、共有を作成できません。 |
| - [ ] | `dialog.identity.relayChanged` | The current sign-in belongs to another Relay address. Sign in again on this address. | 現在のサインインは別の Relay アドレスのものです。このアドレスでサインインし直してください。 |
| - [ ] | `dialog.identity.unknown` | Sign-in status is unavailable right now. Try again later; no share is created before you sign in. | サインインの状態を取得できません。しばらくしてからもう一度お試しください。サインインするまで共有は作成されません。 |
| - [ ] | `dialog.identity.retry` | Retry | 再試行 |
| - [ ] | `dialog.identity.verify` | Sign in | サインイン |
| - [ ] | `dialog.identity.reverify` | Sign in again | サインインし直す |
| - [ ] | `dialog.identity.verifyBlocked` | Save the address and confirm it answers before signing in. | サインインする前に、アドレスを保存し、応答することを確認してください。 |
| - [ ] | `dialog.identity.loginOpening` | Starting sign-in… | サインインを開始しています… |
| - [ ] | `dialog.identity.loginWaiting` | Finish signing in in the window that opened. | 開いたウィンドウでサインインを完了してください。 |
| - [ ] | `dialog.identity.loginVerifying` | Confirming the sign-in result… | サインインの結果を確認しています… |
| - [ ] | `dialog.identity.loginDone` | Signed in; reading the account state. | サインインしました。アカウントの状態を読み込んでいます。 |
| - [ ] | `dialog.identity.loginCancelled` | Sign-in cancelled; no credential was saved. | サインインをキャンセルしました。認証情報は保存されていません。 |
| - [ ] | `dialog.identity.loginExpired` | This sign-in expired; start again. | サインインの有効期限が切れました。もう一度やり直してください。 |
| - [ ] | `dialog.identity.loginMismatch` | The sign-in answer did not belong to this request and was ignored. | サインインの応答がこのリクエストのものではないため、無視しました。 |
| - [ ] | `dialog.identity.loginReplayed` | This sign-in was already used; start again. | このサインインはすでに使われています。もう一度やり直してください。 |
| - [ ] | `dialog.identity.loginUnavailable` | Cannot start sign-in: the Relay is unavailable or this address does not support it. | サインインを開始できません。Relay が利用できないか、このアドレスが対応していません。 |
| - [ ] | `dialog.identity.loginBlocked` | Cannot open the sign-in window (the browser may have blocked it). Allow pop-ups and try again. | サインインのウィンドウを開けません（ブラウザーがブロックした可能性があります）。ポップアップを許可して再試行してください。 |
| - [ ] | `dialog.identity.loginFailed` | Sign-in did not finish. Try again. | サインインが完了しませんでした。もう一度お試しください。 |
| - [ ] | `dialog.identity.expires` | Valid until {time} | {time} まで有効 |
| - [ ] | `dialog.identity.renewed` | Renewed automatically within the granted authorization. | 許可された範囲内で自動的に更新されました。 |
| - [ ] | `dialog.identity.relayUnsupported` | The Relay at this address does not verify identities yet. Upgrade it before creating a share; this page will not create an anonymous one. | このアドレスの Relay はまだ識別情報を検証しません。共有を作成する前に更新してください。このページでは匿名の共有は作成しません。 |
| - [ ] | `dialog.expiry` | Expires | 有効期限 |
| - [ ] | `dialog.expiry.never` | Never | 無期限 |
| - [ ] | `dialog.expiry.hour` | In 1 hour | 1 時間後 |
| - [ ] | `dialog.expiry.day` | In 24 hours | 24 時間後 |
| - [ ] | `dialog.expiry.week` | In 7 days | 7 日後 |
| - [ ] | `dialog.expiry.until` | Until {time} | {time} まで |
| - [ ] | `dialog.linkSharing` | Link sharing | リンク共有 |
| - [ ] | `dialog.help` | Shares this Session only; the session permission decides what the viewer may do, and you can stop it any time in Manage shares. | このセッションだけを共有します。閲覧者ができることはセッションの権限で決まり、共有の管理でいつでも停止できます。 |
| - [ ] | `dialog.mode.open` | Anyone in the organization with the link | リンクを知っている組織内の全員 |
| - [ ] | `dialog.mode.selected` | Specific colleagues | 特定の同僚 |
| - [ ] | `dialog.expiry.clear` | Never expires | 無期限 |
| - [ ] | `dialog.create` | Create share | 共有を作成 |
| - [ ] | `dialog.creating` | Creating… | 作成しています… |
| - [ ] | `dialog.cancel` | Cancel | キャンセル |
| - [ ] | `dialog.copy` | Copy link | リンクをコピー |
| - [ ] | `dialog.copied` | Copied | コピーしました |
| - [ ] | `dialog.manage` | Manage shares | 共有を管理 |
| - [ ] | `dialog.hostUnavailable` | Cannot reach the DSH Liveshare share service. | DSH Liveshare の共有サービスに接続できません。 |
| - [ ] | `dialog.testing` | Connecting to the share service… | 共有サービスに接続しています… |
| - [ ] | `dialog.testOk` | Relay connection OK | Relay への接続は正常です |
| - [ ] | `dialog.testWarn` | Relay HTTP is reachable but registration did not finish and the Host reported no reason. You can still create the share; the gateway retries. | Relay の HTTP には到達できますが、登録が完了せず Host から理由の報告もありません。共有は作成できます。ゲートウェイが再試行します。 |
| - [ ] | `dialog.testFail` | Relay connection failed (the Host reported no reason). | Relay への接続に失敗しました（Host から理由の報告はありません）。 |
| - [ ] | `dialog.addressHint` | Save the share service address first. | 先に共有サービスのアドレスを保存してください。 |
| - [ ] | `dialog.connectivityChecking` | Testing whether the share service address answers… | 共有サービスのアドレスが応答するか確認しています… |
| - [ ] | `dialog.permissionChecking` | Checking whether this host may publish at this address… | このホストがこのアドレスで公開できるか確認しています… |
| - [ ] | `dialog.permissionOk` | Signed in; this host can publish shares. | サインイン済みです。このホストは共有を公開できます。 |
| - [ ] | `dialog.permissionPending` | This address must be checked before a share can be created. | 共有を作成する前にこのアドレスを確認する必要があります。 |
| - [ ] | `dialog.permissionFailed` | The permission check did not finish (the Host reported no reason). | 権限の確認が完了しませんでした（Host から理由の報告はありません）。 |
| - [ ] | `dialog.outgoing` | Shared by me | 自分が共有したもの |
| - [ ] | `dialog.noOutgoing` | No shared sessions yet | 共有中のセッションはありません |
| - [ ] | `dialog.share.online` | Online | オンライン |
| - [ ] | `dialog.share.offline` | Offline | オフライン |
| - [ ] | `dialog.open` | Open | 開く |
| - [ ] | `dialog.stop` | Stop sharing | 共有を停止 |
| - [ ] | `dialog.stopFailed` | Failed to stop sharing. Try again. | 共有を停止できませんでした。もう一度お試しください。 |
| - [ ] | `manage.title` | Share management | 共有の管理 |
| - [ ] | `manage.open` | Manage | 管理 |
| - [ ] | `manage.cancelShare` | Cancel share | 共有をキャンセル |
| - [ ] | `manage.description` | View the online state and access scope of every share. | すべての共有のオンライン状態とアクセス範囲を表示します。 |
| - [ ] | `manage.stop.title` | Stop sharing? | 共有を停止しますか？ |
| - [ ] | `manage.stop.description` | The published link stops working immediately, and anyone viewing it loses access. | 公開したリンクはすぐに無効になり、閲覧中の人もアクセスできなくなります。 |
| - [ ] | `manage.stop.acknowledge` | I understand the published link stops working immediately | 公開したリンクがすぐに無効になることを理解しました |
| - [ ] | `manage.identityExpired` | This sign-in has expired, which blocks creating new shares only. The shares published below are unaffected: their links still copy and stay manageable. | サインインの有効期限が切れていますが、影響するのは新しい共有の作成だけです。下に表示される共有は影響を受けず、リンクのコピーと管理は引き続き行えます。 |
| - [ ] | `manage.loading` | Loading shares… | 共有を読み込み中… |
| - [ ] | `manage.empty` | No shared sessions yet. | 共有中のセッションはまだありません。 |
| - [ ] | `manage.unavailable` | Could not load shares. Showing the last known state. | 共有を読み込めませんでした。最後に判明した状態を表示しています。 |
| - [ ] | `manage.refresh` | Reload | 再読み込み |
| - [ ] | `manage.history` | History | 履歴 |
| - [ ] | `manage.historyLoading` | Loading history… | 履歴を読み込み中… |
| - [ ] | `manage.historyFailed` | Could not load history. Try again. | 履歴を読み込めませんでした。もう一度お試しください。 |
| - [ ] | `manage.expiresAt` | Expires {time} | 有効期限 {time} |
| - [ ] | `manage.expiredAt` | Expired {time} | {time} に期限切れ |
| - [ ] | `manage.sessionMode` | Session permission | セッションの権限 |
| - [ ] | `manage.sessionModeSwitch` | Session permission for “{title}” | 「{title}」のセッション権限 |
| - [ ] | `manage.allowsForkSwitch` | Whether viewers may fork “{title}” | 閲覧者が「{title}」を分岐できるか |
| - [ ] | `manage.sessionModeUnsupported` | This Harness did not report a session permission, so it cannot be set here. | この Harness はセッションの権限を返さないため、ここでは設定できません。 |
| - [ ] | `manage.sessionModeFailed` | The session permission was not saved. Try again. | セッションの権限を保存できませんでした。もう一度お試しください。 |
| - [ ] | `manage.capabilities` | Plugin endpoints | プラグインのエンドポイント |
| - [ ] | `manage.audit.shareCreate` | Share created | 共有を作成 |
| - [ ] | `manage.audit.accessRequest` | View access requested | 閲覧アクセスをリクエスト |
| - [ ] | `manage.audit.accessApproved` | Request approved | リクエストを承認 |
| - [ ] | `manage.audit.accessGrant` | View access granted | 閲覧アクセスを許可 |
| - [ ] | `manage.audit.accessRevoke` | View access revoked | 閲覧アクセスを取り消し |
| - [ ] | `manage.audit.shareStop` | Sharing stopped | 共有を停止 |
| - [ ] | `manage.done` | Done | 完了 |
| - [ ] | `viewer.title` | Liveshare read-only session | Liveshare の読み取り専用セッション |
| - [ ] | `viewer.sharedBy` | Shared by {owner} · {title} | {owner} が共有 · {title} |
| - [ ] | `viewer.readonlyNote` | Read only: you can drive this Session, but you read files inside the share’s scope only and modify nothing. | 読み取り専用: このセッションを操作できますが、共有のスコープ内のファイルを読むだけで、何も変更できません。 |
| - [ ] | `viewer.writeUnavailableNote` | The owner granted writing, but this session cannot be driven right now; sending becomes available once it is prepared. | 所有者が書き込みを許可していますが、このセッションは現在操作できません。準備が整うと送信できるようになります。 |
| - [ ] | `viewer.model.title` | The model this Session runs on, chosen by the owner who shared it | このセッションが使うモデル（共有した所有者が選択） |
| - [ ] | `viewer.model.locked` | Viewers cannot switch the model | 閲覧者はモデルを切り替えられません |
| - [ ] | `viewer.permission.title` | The session permission this share carries, set by the owner | この共有に付与されたセッション権限（所有者が設定） |
| - [ ] | `viewer.permission.locked` | Viewers cannot change this themselves | 閲覧者はこれを自分では変更できません |
| - [ ] | `viewer.permission.unconfirmed` | Not confirmed yet | 未確認 |
| - [ ] | `viewer.transcriptLabel` | Session content (read-only) | セッションの内容（読み取り専用） |
| - [ ] | `viewer.role.user` | User | ユーザー |
| - [ ] | `viewer.role.assistant` | Assistant | アシスタント |
| - [ ] | `viewer.role.tool` | Tool | ツール |
| - [ ] | `viewer.loading` | Connecting to the session… | セッションに接続しています… |
| - [ ] | `viewer.empty` | This session has no content to show yet. | このセッションにはまだ表示できる内容がありません。 |
| - [ ] | `viewer.reconnecting` | Connection dropped, retrying… | 接続が切れました。再試行しています… |
| - [ ] | `viewer.offline` | The share is offline. It reconnects automatically. | 共有はオフラインです。自動的に再接続します。 |
| - [ ] | `viewer.retry` | Retry now | 今すぐ再試行 |
| - [ ] | `viewer.expired` | This share expired and no longer grants access. Ask the owner to share again. | この共有は期限切れで、アクセスできません。所有者にもう一度共有を依頼してください。 |
| - [ ] | `viewer.revoked` | The owner stopped sharing or revoked your access. | 所有者が共有を停止したか、あなたのアクセスを取り消しました。 |
| - [ ] | `viewer.reauthenticate` | Your sign-in expired. Please sign in again. | サインインの有効期限が切れました。もう一度サインインしてください。 |
| - [ ] | `viewer.reauthenticateAction` | Sign in again | サインインし直す |
| - [ ] | `viewer.status.connecting` | Connecting to the share… | 共有に接続しています… |
| - [ ] | `viewer.status.invalid` | This link is not valid, or that share was deleted. | このリンクは無効か、共有が削除されています。 |
| - [ ] | `viewer.status.invalidHint` | Check that the link is complete, or ask the owner for a new one. | リンクが完全か確認するか、所有者に新しいリンクを依頼してください。 |
| - [ ] | `viewer.status.offline` | The owner is offline right now; this page reconnects automatically. | 所有者がオフラインです。このページは自動的に再接続します。 |
| - [ ] | `viewer.status.offlineHint` | Wait a moment or choose Retry; if it stays offline, contact the owner. | 少し待つか「再試行」を選んでください。オフラインが続く場合は所有者に連絡してください。 |
| - [ ] | `viewer.status.stopped` | The owner stopped this share. | 所有者がこの共有を停止しました。 |
| - [ ] | `viewer.status.stoppedHint` | Ask the owner to turn it back on if you still need access. | まだアクセスが必要なら、所有者に再開を依頼してください。 |
| - [ ] | `viewer.status.expired` | This share expired. | この共有は期限切れです。 |
| - [ ] | `viewer.status.expiredHint` | Ask the owner to share the session again. | 所有者にセッションの再共有を依頼してください。 |
| - [ ] | `viewer.status.reauthenticate` | Your sign-in expired. | サインインの有効期限が切れました。 |
| - [ ] | `viewer.status.unavailable` | The share service is unavailable right now; retrying. | 共有サービスが現在利用できません。再試行しています。 |
| - [ ] | `viewer.status.unavailableHint` | Try again shortly; if it stays unavailable, come back later. | しばらくしてから再試行してください。利用できない状態が続く場合は、後で開き直してください。 |
| - [ ] | `viewer.action.reload` | Reload | 再読み込み |
| - [ ] | `viewer.action.retry` | Retry | 再試行 |
| - [ ] | `viewer.action.signIn` | Sign in again | サインインし直す |
| - [ ] | `viewer.action.directory` | Back to shares | 共有一覧に戻る |
| - [ ] | `viewer.expiresAt` | Access until {time} | {time} までアクセス可能 |
| - [ ] | `viewer.picker.ownerUnknown` | Unknown owner | 所有者不明 |
| - [ ] | `viewer.picker.version` | DSH | DSH |
| - [ ] | `viewer.picker.groupCount` | {count} shares | 共有 {count} 件 |
| - [ ] | `viewer.picker.online` | Online | オンライン |
| - [ ] | `viewer.picker.offline` | Offline | オフライン |
| - [ ] | `viewer.picker.subjectLabel` | subject …{label} | subject …{label} |
| - [ ] | `viewer.picker.historical` | Unverified history | 未確認の履歴 |
| - [ ] | `viewer.picker.historicalNote` | These shares predate verified identities; their access is unchanged. | これらの共有は識別情報の検証より前のもので、アクセスは変わりません。 |
| - [ ] | `viewer.brand` | LiveShare | LiveShare |
| - [ ] | `viewer.home` | Back to LiveShare home | LiveShare のホームに戻る |
| - [ ] | `viewer.sharedByShort` | Shared by {owner} | {owner} が共有 |
| - [ ] | `viewer.relayVersion` | relay {release} | relay {release} |
| - [ ] | `viewer.refused` | liveshare: {subject} was refused with {status} | liveshare: {subject} は {status} で拒否されました |
| - [ ] | `viewer.relayAnswered` | liveshare: the Relay answered {status} | liveshare: Relay が {status} を返しました |
| - [ ] | `viewer.relaySilent` | liveshare: the Relay answered nothing for {subject} | liveshare: {subject} に対して Relay から応答がありません |
| - [ ] | `viewer.unreachable` | liveshare: {subject} did not reach the Relay, retrying | liveshare: {subject} が Relay に到達しません。再試行しています |
| - [ ] | `viewer.noAnswer` | no answer | 応答なし |
| - [ ] | `viewer.row.fork` | Fork session | セッションを分岐 |
| - [ ] | `viewer.row.forkSource` | Forked from “{title}” | 「{title}」から分岐 |
| - [ ] | `viewer.row.branchRefused` | Could not complete the branch: {reason} | 分岐を完了できませんでした: {reason} |
| - [ ] | `viewer.sharePath.unavailable` | This page cannot open workspace files: a share hands over file paths, not file contents. | このページではワークスペースのファイルを開けません。共有されるのはファイルの内容ではなくパスです。 |
| - [ ] | `viewer.reason.fork-not-permitted` | The owner does not allow branching this Session | 所有者がこのセッションの分岐を許可していません |
| - [ ] | `viewer.reason.fork-not-implemented` | This deployment does not support branching yet | この配備はまだ分岐に対応していません |
| - [ ] | `viewer.reason.write-not-implemented` | This deployment does not support writing yet | この配備はまだ書き込みに対応していません |
| - [ ] | `viewer.reason.share-not-found` | That share no longer exists | その共有はもう存在しません |
| - [ ] | `viewer.reason.share-stopped` | Sharing stopped | 共有が停止されました |
| - [ ] | `viewer.reason.share-expired` | The share expired | 共有の期限が切れました |
| - [ ] | `viewer.reason.source-session-mismatch` | The branch named a different Session than the share carries | 分岐が共有のセッションと異なるセッションを指定しました |
| - [ ] | `viewer.reason.fork-operation-conflict` | This branch request named a different prefix than the earlier one, so no new Session was created | この分岐リクエストは以前と異なるプレフィックスを指定したため、新しいセッションは作成されませんでした |
| - [ ] | `viewer.reason.fork-enforcement-failed` | The branch Session was created, but its sandbox limits could not be installed, so it cannot be used | 分岐セッションは作成されましたが、サンドボックスの制限を設定できなかったため使えません |
| - [ ] | `viewer.reason.mode-view` | The owner set this share to read only | 所有者がこの共有を読み取り専用に設定しています |
| - [ ] | `viewer.reason.unconfirmed` | This share’s current state could not be confirmed; it stays read-only until it is | この共有の現在の状態を確認できませんでした。確認できるまで読み取り専用のままです |
| - [ ] | `viewer.reason.fork-viewer-unknown` | The Relay did not confirm your identity, so the branch cannot be created | Relay があなたの識別情報を確認できなかったため、分岐を作成できません |
| - [ ] | `viewer.reason.fork-unknown-child` | This Session is not a branch of a share | このセッションは共有の分岐ではありません |
| - [ ] | `viewer.reason.fork-viewer-mismatch` | That branch belongs to another viewer | その分岐は別の閲覧者のものです |
| - [ ] | `viewer.reason.fork-source-revoked` | The share this branch came from is no longer active | この分岐の元になった共有はもう有効ではありません |
| - [ ] | `viewer.reason.fork-ceiling-uninstalled` | This Host has not installed the read-only execution limits | この Host は読み取り専用の実行制限を設定していません |
| - [ ] | `viewer.reason.fork-prepare-failed` | The Host could not prepare this branch, so this action did not run | Host がこの分岐を準備できなかったため、この操作は実行されませんでした |
| - [ ] | `viewer.reason.share-not-writable` | The owner does not allow writing this Session | 所有者がこのセッションへの書き込みを許可していません |
| - [ ] | `viewer.reason.source-write-unavailable` | This Host could not confine the shared Session, so it cannot drive it | この Host は共有セッションを制限できなかったため、操作できません |
| - [ ] | `viewer.reason.prompt-identity-missing` | This send carried no request identity to attribute, so the Host did not run it | この送信には帰属先となるリクエスト識別情報がなかったため、Host は実行しませんでした |
| - [ ] | `viewer.reason.viewer-not-authorized` | Your account no longer has access to this share | あなたのアカウントはもうこの共有にアクセスできません |
| - [ ] | `viewer.reason.liveshare/read-only` | This Session is outside the share you hold, so it was not written | このセッションはあなたの共有の範囲外のため、書き込みませんでした |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
