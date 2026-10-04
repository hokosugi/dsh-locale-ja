# pluginManager — 日本語訳レビュー

訳済み **189 / 189** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `panel` | Plugins | プラグイン |
| - [ ] | `title` | Plugins | プラグイン |
| - [ ] | `intro` | Install, enable, and configure plugins | プラグインのインストール・有効化・設定 |
| - [ ] | `infoLabel` | About plugins | プラグインについて |
| - [ ] | `infoDescription` | Configure official plugins and install or manage other plugins here. View the built-in plugin list and runtime status in Settings → Built-in plugins. | 公式プラグインの設定と、その他のプラグインのインストール・管理はここで行います。組み込みプラグインの一覧と実行状態は「設定 → 組み込みプラグイン」で確認できます。 |
| - [ ] | `loading` | Reading plugins… | プラグインを読み込み中… |
| - [ ] | `error` | Could not read all plugins, possibly due to a network problem | 一部のプラグインを読み込めませんでした。ネットワークの問題が考えられます |
| - [ ] | `unavailable` | This deployment runs without a manageable profile, so plugins cannot be installed or switched here. | この環境には管理できるプロファイルがないため、ここではプラグインをインストールしたり切り替えたりできません。 |
| - [ ] | `retry` | Retry | 再試行 |
| - [ ] | `refresh` | Refresh | 更新 |
| - [ ] | `refreshError` | Refresh failed. Please try again. | 更新に失敗しました。もう一度お試しください。 |
| - [ ] | `empty` | No plugins are installed yet. | プラグインがまだインストールされていません。 |
| - [ ] | `addPlugin` | Add plugin | プラグインを追加 |
| - [ ] | `restartNotice` | The change takes effect at the next start | 変更は次回の起動時に反映されます |
| - [ ] | `overriddenNotice` | {name} was saved, but a higher-priority configuration overrides it, so it is not in effect | {name} は保存されましたが、より優先度の高い設定に上書きされるため反映されていません |
| - [ ] | `bundlesTitle` | Installed | インストール済み |
| - [ ] | `officialTitle` | Official | 公式 |
| - [ ] | `statusProblem` | Problem | 問題 |
| - [ ] | `statusBeta` | Experimental | 実験的 |
| - [ ] | `reasonLabel` | Reason | 理由 |
| - [ ] | `metadataError` | Package metadata error: {error} | パッケージメタデータのエラー: {error} |
| - [ ] | `versionTag` | v{version} | v{version} |
| - [ ] | `partsLabel` | Components | コンポーネント |
| - [ ] | `partsEmpty` | This plugin pack contains no components. | このプラグインパックにはコンポーネントが含まれていません。 |
| - [ ] | `partsCountTotal` | {count} total | 合計 {count} |
| - [ ] | `partsCountRunning` | {count} running | {count} 実行中 |
| - [ ] | `partsCountOff` | {count} off | {count} オフ |
| - [ ] | `partOff` | Off | オフ |
| - [ ] | `partsCountFailed` | {count} failed | {count} 失敗 |
| - [ ] | `partsFilter` | Filter components | コンポーネントを絞り込む |
| - [ ] | `partsFilterEmpty` | No component matches. | 一致するコンポーネントがありません。 |
| - [ ] | `partToggle` | Enable component {name} | コンポーネント {name} を有効にする |
| - [ ] | `rowPhasePending` | Waiting for dependencies | 依存関係を待機中 |
| - [ ] | `rowPhaseLoading` | Loading | 読み込み中 |
| - [ ] | `rowPhaseActive` | Running | 実行中 |
| - [ ] | `rowPhaseFailed` | Problem | 問題 |
| - [ ] | `rowPhaseUnloading` | Unloading | アンロード中 |
| - [ ] | `enableToggle` | Enable {name} | {name} を有効にする |
| - [ ] | `openDetail` | View {name} | {name} を表示 |
| - [ ] | `backToList` | Back to plugins | プラグイン一覧に戻る |
| - [ ] | `crumbRoot` | Plugins | プラグイン |
| - [ ] | `backToPackage` | Back to {name} | {name} に戻る |
| - [ ] | `configureRow` | Configure {name} | {name} を設定 |
| - [ ] | `rowStateIdle` | Not running | 未実行 |
| - [ ] | `uninstall` | Uninstall | アンインストール |
| - [ ] | `uninstallLabel` | Uninstall {name} | {name} をアンインストール |
| - [ ] | `installTitle` | Add plugin | プラグインを追加 |
| - [ ] | `installDescription` | Enter the plugin's package name, GitHub repository address, or local directory path. | プラグインのパッケージ名、GitHub リポジトリのアドレス、またはローカルディレクトリのパスを入力してください。 |
| - [ ] | `installSpecLabel` | Package name or address | パッケージ名またはアドレス |
| - [ ] | `installSpecPlaceholder` | for example dsh-plugin-whale-pet | 例: dsh-plugin-whale-pet |
| - [ ] | `installGuideToggle` | Install guide and examples | インストールのガイドと例 |
| - [ ] | `installGuideHide` | Hide the guide | ガイドを閉じる |
| - [ ] | `installGuideIdTitle` | Enter the plugin's npm package name | プラグインの npm パッケージ名を入力 |
| - [ ] | `installGuideIdExample` | dsh-plugin-whale-pet | dsh-plugin-whale-pet |
| - [ ] | `installGuideIdHint` | The plugin package name is the npm package name (like dsh-xxx or @author/plugin): the part after dsh plugin add or pnpm add in a community plugin's README install command. | プラグインのパッケージ名は npm のパッケージ名です (dsh-xxx や @作者/プラグイン名 のような形式)。コミュニティプラグインの README にあるインストール手順の、dsh plugin add または pnpm add の後ろの部分です。 |
| - [ ] | `installGuideExampleLabel` | Example:  | 例:  |
| - [ ] | `installGitTemplateHint` | Replace this with the actual Git repository address. | 実際の Git リポジトリのアドレスに置き換えてください。 |
| - [ ] | `installPathTemplateHint` | Replace this with the actual path to your local plugin directory. | ローカルのプラグインディレクトリの実際のパスに置き換えてください。 |
| - [ ] | `installGuideFill` | Use example | 例を入力 |
| - [ ] | `installGuideFillAria` | Use the example {example} | 例 {example} を入力 |
| - [ ] | `installGuideSafety` | Install only plugins you trust: they run with your permissions and can damage DeepSeek Harness or leak your data. | 信頼できるプラグインだけをインストールしてください。プラグインはあなたの権限で動作し、DeepSeek Harness を壊したり、データを外部に漏らしたりする可能性があります。 |
| - [ ] | `installUpgradeNotice` | Installed plugins do not update automatically yet. To upgrade a plugin, uninstall it and install the new version. Later releases will keep improving the upgrade experience. | インストールしたプラグインはまだ自動更新されません。アップグレードするにはアンインストールしてから新しいバージョンをインストールしてください。今後のリリースで改善していきます。 |
| - [ ] | `registryToggle` | Registry | レジストリ |
| - [ ] | `registryLegend` | The npm registry the plugin is downloaded from | プラグインのダウンロード元になる npm レジストリ |
| - [ ] | `registryDefault` | Default registry | 既定のレジストリ |
| - [ ] | `registryOfficial` | Official npm registry | npm 公式レジストリ |
| - [ ] | `registryNpmmirror` | Mainland China mirror | 中国本土のミラー |
| - [ ] | `registryCustom` | Custom address | カスタムアドレス |
| - [ ] | `registryCustomPlaceholder` | https://npm.example.com/ | https://npm.example.com/ |
| - [ ] | `registryCustomHint` | Enter an internal or private npm registry address starting with http:// or https://. If it requires a login, store the credentials in ~/.npmrc on this machine. | http:// または https:// で始まる、社内・プライベートな npm レジストリのアドレスを入力してください。ログインが必要な場合は、このマシンの ~/.npmrc に認証情報を保存してください。 |
| - [ ] | `registryCustomInvalid` | Enter an address starting with http:// or https:// | http:// または https:// で始まるアドレスを入力してください |
| - [ ] | `registryListSeparator` | ,  | 、 |
| - [ ] | `sentenceSeparator` |   |   |
| - [ ] | `installRun` | Install | インストール |
| - [ ] | `installChecking` | Checking… | 確認中… |
| - [ ] | `installProblemInvalid` | This is not a package name or address that can be installed: {reason} | インストールできるパッケージ名またはアドレスではありません: {reason} |
| - [ ] | `installProblemInstalled` | This plugin is already installed. To upgrade it, uninstall it and install it again | このプラグインはすでにインストールされています。アップグレードするにはアンインストールしてから再インストールしてください |
| - [ ] | `installProblemShipped` | This plugin ships with DSH; upgrading DSH updates it | このプラグインは DSH に同梱されています。DSH をアップグレードすると更新されます |
| - [ ] | `installProblemNotFound` | No such plugin was found | 該当するプラグインが見つかりません |
| - [ ] | `installProblemNotPackage` | The path does not exist or is not a valid plugin package | そのパスが存在しないか、有効なプラグインパッケージではありません |
| - [ ] | `installProblemNotBundle` | This package declares no bundle, so it cannot be installed as a plugin: {reason} | このパッケージはバンドルを宣言していないため、プラグインとしてインストールできません: {reason} |
| - [ ] | `installProblemNetwork` | The plugin registry could not be reached; check the network and try again | プラグインのレジストリに接続できませんでした。ネットワークを確認してからもう一度お試しください |
| - [ ] | `installProblemNetworkAll` | No registry could be reached (tried: {registries}); check the network or proxy settings, or change the registry | どのレジストリにも接続できませんでした (試行: {registries})。ネットワークまたはプロキシの設定を確認するか、レジストリを変更してください |
| - [ ] | `installProblemUnknown` | The plugin could not be looked up: {reason} | プラグインの情報を取得できませんでした: {reason} |
| - [ ] | `installingTitle` | Installing the plugin… | プラグインをインストール中… |
| - [ ] | `installedTitle` | Installed | インストール済み |
| - [ ] | `installFailedTitle` | The plugin could not be installed | プラグインをインストールできませんでした |
| - [ ] | `installGithubFailedTitle` | Cannot access GitHub | GitHub にアクセスできません |
| - [ ] | `installGithubTimeoutTitle` | GitHub connection timed out | GitHub への接続がタイムアウトしました |
| - [ ] | `installGithubFailedDescription` | Try another installation source. | 別のインストール元を試してください。 |
| - [ ] | `installUseGithubMirror` | Use mainland China mirror | 中国本土のミラーを使う |
| - [ ] | `installTryAnotherWay` | Try another way | 別の方法を試す |
| - [ ] | `installPackageLabel` | Plugin package name | プラグインのパッケージ名 |
| - [ ] | `installEdit` | Edit | 編集 |
| - [ ] | `installEditAria` | Back to editing | 編集に戻る |
| - [ ] | `installCancelAndEdit` | Cancel installation and return to editing | インストールをキャンセルして編集に戻る |
| - [ ] | `installApplyingCancellationError` | Cancellation was not confirmed. Installation is being applied; wait for its result. {reason} | キャンセルを確認できませんでした。インストールは最終処理に入っているため、結果を待ってください。{reason} |
| - [ ] | `installReconcile` | Check installation status | インストール状態を確認 |
| - [ ] | `installUnknownTitle` | Installation result unavailable | インストール結果を取得できません |
| - [ ] | `installUnknownDescription` | The Host has no active installation with this request id. Check the plugin list before trying again. | ホストにこの要求 ID のインストールがありません。プラグイン一覧を確認してからもう一度お試しください。 |
| - [ ] | `installResultUnconfirmed` | The installation result was not received. Check installation status. {reason} | インストール結果を受信できませんでした。インストール状態を確認してください。{reason} |
| - [ ] | `installAwaitingAcceptance` | Waiting for the Host to accept installation. Cancellation will retry automatically after confirmation. | ホストがインストールを受け付けるのを待っています。確認後にキャンセルを自動で再試行します。 |
| - [ ] | `installBackgroundUnknown` | Installation result unavailable. Check the plugin list. | インストール結果を取得できません。プラグイン一覧を確認してください。 |
| - [ ] | `installCancel` | Cancel install | インストールをキャンセル |
| - [ ] | `installCloseCancels` | Cancel install and close | インストールをキャンセルして閉じる |
| - [ ] | `installViewTask` | View installation | インストールを表示 |
| - [ ] | `installUnconfirmedTitle` | Installation status unconfirmed | インストール状態が未確認です |
| - [ ] | `installBackgroundDone` | Installation finished. View installation details. | インストールが完了しました。詳細を確認できます。 |
| - [ ] | `installBackgroundFailed` | Installation failed. View installation details. | インストールに失敗しました。詳細を確認できます。 |
| - [ ] | `installBackgroundUnconfirmed` | Installation status is unconfirmed. View the installation for details. | インストール状態が未確認です。詳細はインストールを開いて確認してください。 |
| - [ ] | `installBackgroundApplying` | Installation is being applied and cannot be cancelled. View installation progress. | インストールは最終処理に入っていてキャンセルできません。進行状況を確認できます。 |
| - [ ] | `installStarting` | Preparing installation… | インストールを準備中… |
| - [ ] | `installCancelling` | Stopping installation… | インストールを停止中… |
| - [ ] | `installApplying` | Applying configuration, please wait… | 設定を反映しています。しばらくお待ちください… |
| - [ ] | `installCancelledShort` | Cancelled | キャンセル済み |
| - [ ] | `installCancelled` | Installation cancelled; the plugin is not enabled, and downloaded files may remain | インストールをキャンセルしました。プラグインは有効になっておらず、ダウンロードされたファイルが残っている場合があります |
| - [ ] | `installCancelUnconfirmed` | Installation has not been confirmed stopped. Retry cancellation or wait for the installation result. {reason} | インストールの停止を確認できませんでした。キャンセルを再試行するか、インストールの結果を待ってください。{reason} |
| - [ ] | `installEnableNow` | Enable now | 今すぐ有効にする |
| - [ ] | `installDetailsShow` | Show install details | インストールの詳細を表示 |
| - [ ] | `installDetailsHide` | Hide install details | インストールの詳細を隠す |
| - [ ] | `installVersion` | Version {version} | バージョン {version} |
| - [ ] | `installSubjectPath` | Local directory | ローカルディレクトリ |
| - [ ] | `installSubjectGit` | Git repository | Git リポジトリ |
| - [ ] | `installSubjectTarball` | Tarball | tarball |
| - [ ] | `installLocation` | Installs into {dir} | {dir} にインストールされます |
| - [ ] | `installRetry` | Retry | 再試行 |
| - [ ] | `installChangeRegistry` | Change registry | レジストリを変更 |
| - [ ] | `installAttempt` | {previous} could not serve the package; retrying through {registry} (registry {index} of {total}) | {previous} からパッケージを取得できなかったため、{registry} で再試行します ({total} 件中 {index} 件目のレジストリ) |
| - [ ] | `installAttemptBadge` | Attempt {index} · {registry} | 第 {index} 回 · {registry} |
| - [ ] | `installFailureNetwork` | The network connection failed | ネットワーク接続に失敗しました |
| - [ ] | `installFailureNetworkAll` | No registry could be reached (tried: {registries}). Check the network or proxy settings, or change the registry and retry. | どのレジストリにも接続できませんでした (試行: {registries})。ネットワークまたはプロキシの設定を確認するか、レジストリを変更して再試行してください。 |
| - [ ] | `installFailureNetworkHost` | {host} could not be reached. A GitHub address or a .tgz link is not fetched through the registry: this machine must reach it directly or through a proxy. If the plugin is also published to npm, enter its package name instead. | {host} に接続できませんでした。GitHub のアドレスや .tgz への直リンクはレジストリを経由しないため、このマシンから直接またはプロキシ経由で接続できる必要があります。プラグインが npm にも公開されている場合は、パッケージ名を入力してください。 |
| - [ ] | `installFailureNotFound` | No such plugin was found | 該当するプラグインが見つかりません |
| - [ ] | `installFailureNoMatchingVersion` | No version matches the request | 条件に一致するバージョンがありません |
| - [ ] | `installFailureDiskFull` | The disk is full; the install stopped | ディスクの空き容量が足りないため、インストールを中止しました |
| - [ ] | `installFailurePermission` | No write permission; the plugin cannot be installed | 書き込み権限がないため、プラグインをインストールできません |
| - [ ] | `installFailureBuildBlocked` | A dependency's install scripts need your permission before the install can continue | 依存パッケージのインストールスクリプトを許可するまで、インストールを続行できません |
| - [ ] | `installFailureBuildBlockedManual` | pnpm blocked install scripts; allow them under allowBuilds in pnpm-workspace.yaml and retry | pnpm がインストールスクリプトをブロックしました。pnpm-workspace.yaml の allowBuilds で許可してから再試行してください |
| - [ ] | `installFailureIntegrity` | The downloaded package failed its integrity check | ダウンロードしたパッケージの整合性チェックに失敗しました |
| - [ ] | `installFailureTimeout` | The install timed out | インストールがタイムアウトしました |
| - [ ] | `installFailurePnpmMissing` | pnpm was not found, so nothing can be installed | pnpm が見つからないため、インストールできません |
| - [ ] | `installFailureGeneric` | Something went wrong during the install; the details say what | インストール中に問題が発生しました。詳細に原因が表示されます |
| - [ ] | `terminalRunning` | Running | 実行中 |
| - [ ] | `terminalFailed` | Failed | 失敗 |
| - [ ] | `terminalDone` | Done | 完了 |
| - [ ] | `terminalCopy` | Copy | コピー |
| - [ ] | `terminalCopied` | Copied | コピーしました |
| - [ ] | `terminalNoOutput` | No output | 出力なし |
| - [ ] | `terminalCollapseAria` | Collapse output | 出力を折りたたむ |
| - [ ] | `terminalCollapse` | Collapse | 折りたたむ |
| - [ ] | `terminalExpandAria` | Expand the remaining {n} output lines | 出力の残り {n} 行を展開 |
| - [ ] | `terminalExpand` | … {n} more lines | … 残り {n} 行 |
| - [ ] | `terminalExitCode` | exit code {code} | 終了コード {code} |
| - [ ] | `terminalSignal` | signal {signal} | シグナル {signal} |
| - [ ] | `terminalNoExitCode` | no exit code | 終了コードなし |
| - [ ] | `installDoneNothing` | Install finished with no new dependency. | インストールが完了しました。新しい依存パッケージはありません。 |
| - [ ] | `installDoneRestart` | Installed; it loads at the next start. | インストールしました。次回の起動時に読み込まれます。 |
| - [ ] | `installDoneApproved` | Install scripts allowed for {names} | {names} のインストールスクリプトを許可しました |
| - [ ] | `installApprovalTitle` | Install scripts need permission | インストールスクリプトの許可が必要です |
| - [ ] | `installApprovalDescription` | These packages have install scripts that pnpm did not run. | 以下のパッケージには、pnpm が実行しなかったインストールスクリプトがあります。 |
| - [ ] | `installApprovalConsequence` | Once allowed, the scripts run here with your permissions, and the permission is saved in this profile. | 許可すると、スクリプトはこの環境であなたの権限で実行され、許可はこのプロファイルに保存されます。 |
| - [ ] | `installApprovalCaution` | Allow only packages you trust. | 信頼できるパッケージだけを許可してください。 |
| - [ ] | `installApproveAndRetry` | Allow these scripts and retry | これらのスクリプトを許可して再試行 |
| - [ ] | `installClose` | Done | 完了 |
| - [ ] | `close` | Close | 閉じる |
| - [ ] | `cancel` | Cancel | キャンセル |
| - [ ] | `confirmUninstallTitle` | Uninstall "{name}"? | 「{name}」をアンインストールしますか？ |
| - [ ] | `confirmUninstallDescription` | What it provides goes away once it is uninstalled. | アンインストールすると、それが提供している機能は使えなくなります。 |
| - [ ] | `confirmUninstall` | Uninstall | アンインストール |
| - [ ] | `failedEnable` | Could not enable: {reason} | 有効にできませんでした: {reason} |
| - [ ] | `failedDisable` | Could not disable: {reason} | 無効にできませんでした: {reason} |
| - [ ] | `failedUninstall` | Could not uninstall: {reason} | アンインストールできませんでした: {reason} |
| - [ ] | `failedRowEnable` | Could not enable the component: {reason} | コンポーネントを有効にできませんでした: {reason} |
| - [ ] | `failedRowDisable` | Could not disable the component: {reason} | コンポーネントを無効にできませんでした: {reason} |
| - [ ] | `reasonManagementRequired` | Plugin management needs it; it cannot be switched off or uninstalled. | プラグイン管理に必要なため、無効化もアンインストールもできません。 |
| - [ ] | `reasonUnaddressable` | The profile patch cannot address this one uniquely. | プロファイルのパッチではこれを一意に指定できません。 |
| - [ ] | `reasonUnknownPlugin` | No such plugin. | 該当するプラグインがありません。 |
| - [ ] | `reasonInvalidSpec` | Enter a valid package name or address. | 有効なパッケージ名またはアドレスを入力してください。 |
| - [ ] | `reasonAmbiguousInstall` | Which package was installed cannot be told from the dependency change. | 依存関係の変化から、どのパッケージがインストールされたか判断できません。 |
| - [ ] | `reasonNotBundle` | This package declares no bundle, so it cannot be managed as a plugin. | このパッケージはバンドルを宣言していないため、プラグインとして管理できません。 |
| - [ ] | `reasonNotRemovable` | This package is not owned by the profile, or plugin management needs it. | このパッケージはプロファイルが所有していないか、プラグイン管理に必要です。 |
| - [ ] | `reasonStopProfile` | This profile runs without HMR; stop it and uninstall the package with dsh plugin. | このプロファイルは HMR なしで動作しています。停止してから dsh plugin でアンインストールしてください。 |
| - [ ] | `reasonBundleInUse` | Other configuration still uses this bundle's components; switch them off first. | ほかの設定がこのバンドルのコンポーネントをまだ使用しています。先にそれらを無効にしてください。 |
| - [ ] | `reasonStaleApproval` | The pending script approvals changed; install again to refresh them. | 許可待ちのインストールスクリプトが変わったため、再インストールして更新してください。 |
| - [ ] | `reasonIncompatibleVersion` | {plugin} is incompatible with DSH {runtime} (requires {peers}); running it may cause crashes or data loss. | {plugin} は DSH {runtime} と互換性がありません (必要なバージョン: {peers})。実行するとクラッシュやデータ損失が起きる可能性があります。 |
| - [ ] | `reasonIncompatibleVersionUnnamed` | This plugin is incompatible with the running DSH version; running it may cause crashes or data loss. | このプラグインは実行中の DSH のバージョンと互換性がありません。実行するとクラッシュやデータ損失が起きる可能性があります。 |
| - [ ] | `reasonIncompatibleInstall` | Install a plugin version compatible with this DSH. | この DSH と互換性のあるバージョンのプラグインをインストールしてください。 |
| - [ ] | `reasonIncompatibleInstalled` | Uninstall it and install a version compatible with this DSH. | アンインストールして、この DSH と互換性のあるバージョンをインストールしてください。 |
| - [ ] | `reasonOperationError` | The Host reported an error. | ホストがエラーを報告しました。 |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
