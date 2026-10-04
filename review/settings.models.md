# settings.models — 日本語訳レビュー

訳済み **113 / 113** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 複数行の文言 (Markdown として描画されるもの)

### `welcomeBody`

**日本語訳** — UI では次のように描画されます

> DeepSeek Harness の 0.2 はまだプレビュー段階にあり、改善と作り込みが必要な箇所が数多く残っています。開発者と利用者のみなさまからのフィードバックや提案をお待ちしています。新しいデスクトップアプリは幅広い利用者を対象とし、開発者向けの高度な機能は設定から有効にできます。DeepSeek Harness の製品機能とプラグイン API は今後も速いペースで反復・進化し、時間をかけて安定していく見込みです。
>
> オープンで再利用可能、そして組み合わせ可能な基盤の上で、世界中の利用者と開発者とともに知能の限界を探っていきたいと考えています。DeepSeek Harness でアイデアを形にし、コミュニティと一緒にプラグインエコシステムを育てていってください。

<details><summary>英語原文</summary>

```markdown
DeepSeek Harness 0.2 is still in preview, and many areas need continued improvement and refinement. We welcome feedback and suggestions from all developers and users. The new desktop app now targets a broad range of users, while developer-related advanced features can be enabled in the settings. DeepSeek Harness’s product features and plugin APIs are expected to continue rapid iteration and evolution, and will gradually stabilize over time.

We look forward to exploring the limits of intelligence together with users and developers around the world, building on open-source, reusable, and composable infrastructure. We welcome everyone to bring their ideas to life with DeepSeek Harness and participate in the community to enrich the plugin ecosystem.
```

</details>

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `nav` | Models | モデル |
| - [ ] | `deepSeekAccount` | DeepSeek Account | DeepSeek アカウント |
| - [ ] | `title` | Models | モデル |
| - [ ] | `intro` | Enter your API keys to use models from the following providers. | 次のプロバイダーの API キーを入力すると、そのモデルを利用できます。 |
| - [ ] | `edit` | Edit | 編集 |
| - [ ] | `editProvider` | Edit {provider} | {provider} を編集 |
| - [ ] | `remove` | Delete | 削除 |
| - [ ] | `removeProvider` | Delete {provider} | {provider} を削除 |
| - [ ] | `deleteTitle` | Delete {provider}? | {provider} を削除しますか？ |
| - [ ] | `deleteDescription` | Deleting {provider} removes its configuration. Any credential it uses is managed elsewhere and will be kept. | {provider} を削除すると、その設定が消えます。使用している認証情報は別の場所で管理されているため保持されます。 |
| - [ ] | `deleteDescriptionWithCredential` | Deleting {provider} removes its configuration and stored API key. | {provider} を削除すると、その設定と保存済みの API キーが消えます。 |
| - [ ] | `deleteConfirm` | Delete {provider} | {provider} を削除 |
| - [ ] | `deleting` | Deleting {provider}… | {provider} を削除しています… |
| - [ ] | `add` | Add model provider | モデルプロバイダーを追加 |
| - [ ] | `addMode` | How to add | 追加方法 |
| - [ ] | `addCatalog` | Third-party model provider | サードパーティのモデルプロバイダー |
| - [ ] | `addCustom` | Custom model API | カスタムモデル API |
| - [ ] | `addCatalogHint` | Pick OpenAI, Anthropic, Kimi, or another provider from the built-in catalog and enter its API key. | 内蔵カタログから OpenAI、Anthropic、Kimi などのプロバイダーを選び、API キーを入力します。 |
| - [ ] | `addCustomHint` | Connect a relay, a self-hosted server, or any other OpenAI- or Anthropic-compatible endpoint by its base URL, protocol, and models. | 中継サーバー、自前のサーバー、その他 OpenAI / Anthropic 互換のエンドポイントを、ベース URL・プロトコル・モデルを指定して接続します。 |
| - [ ] | `addCatalogExhausted` | Every catalog provider is already configured. | カタログ内のプロバイダーはすべて追加済みです。 |
| - [ ] | `addCustomUnavailable` | No API protocol is available to declare. | 宣言できる API プロトコルがありません。 |
| - [ ] | `provider` | Provider | プロバイダー |
| - [ ] | `close` | Close | 閉じる |
| - [ ] | `cancel` | Cancel | キャンセル |
| - [ ] | `apply` | Apply | 適用 |
| - [ ] | `applying` | Applying… | 適用しています… |
| - [ ] | `savedProvider` | Saved {provider}. | {provider} を保存しました。 |
| - [ ] | `credentialConfigured` | API key configured | API キー設定済み |
| - [ ] | `credentialMissing` | API key missing | API キー未設定 |
| - [ ] | `readOnly` | The settings document is read-only in this deployment. | この環境では設定ファイルは読み取り専用です。 |
| - [ ] | `loadFailed` | Loading the provider directory failed | プロバイダー一覧の読み込みに失敗しました |
| - [ ] | `conflict` | Someone else changed these settings while this card was open. Close it and reopen to edit the current values. | このカードを開いている間に、ほかの場所で設定が変更されました。閉じて開き直し、最新の値で編集してください。 |
| - [ ] | `retry` | Retry | 再試行 |
| - [ ] | `keyInput` | API key | API キー |
| - [ ] | `keyPlaceholder` | Enter your API key | API キーを入力 |
| - [ ] | `keyPlaceholderNative` | Enter an API key, or leave blank to use environment authentication | API キーを入力するか、空欄のまま環境の認証を使います |
| - [ ] | `keyStored` | Configured — enter a new value to replace | 設定済み — 変更するには新しい値を入力 |
| - [ ] | `keyEnvLocked` | Provided by the launch environment (read-only) | 起動環境から提供されています (読み取り専用) |
| - [ ] | `customized` | Customized settings | カスタム設定 |
| - [ ] | `baseUrl` | Base URL | ベース URL |
| - [ ] | `baseUrlDefault` | Provider default | プロバイダーの既定値 |
| - [ ] | `deepSeekBaseUrl` | https://api.deepseek.com/anthropic | https://api.deepseek.com/anthropic |
| - [ ] | `deepSeekEndpointHint` | Use an API endpoint compatible with Anthropic Messages. | Anthropic Messages 互換の API エンドポイントを指定してください。 |
| - [ ] | `models` | Models | モデル |
| - [ ] | `modelsInherited` | Using the adapter defaults | アダプターの既定モデルを使用中 |
| - [ ] | `modelsCustomized` | Customized model catalog | モデルカタログをカスタマイズ済み |
| - [ ] | `resetModels` | Restore defaults | 既定のモデルに戻す |
| - [ ] | `model` | Model | モデル |
| - [ ] | `modelId` | Model ID | モデル ID |
| - [ ] | `modelName` | Display name | 表示名 |
| - [ ] | `modelNamePlaceholder` | Uses the model ID when empty | 空欄のときはモデル ID を使用 |
| - [ ] | `contextWindow` | Context window | コンテキストウィンドウ |
| - [ ] | `contextWindowPlaceholder` | Uses the provider default | プロバイダーの既定値を使用 |
| - [ ] | `maxTokens` | Max output tokens | 最大出力トークン数 |
| - [ ] | `maxTokensPlaceholder` | Uses the provider default | プロバイダーの既定値を使用 |
| - [ ] | `modelAdvanced` | Model options | モデルのオプション |
| - [ ] | `modelInputTypes` | Input types | 入力の種類 |
| - [ ] | `modelInputText` | Text | テキスト |
| - [ ] | `modelInputImage` | Image | 画像 |
| - [ ] | `addModel` | Add model | モデルを追加 |
| - [ ] | `removeModel` | Delete model | モデルを削除 |
| - [ ] | `modelsEmpty` | No models will be shown in the selector. Unlisted IDs can still be sent directly. | モデル選択には何も表示されません。一覧にない ID も直接送信できます。 |
| - [ ] | `keyBlank` | Enter the API key, or leave the field empty to keep the stored one. | API キーを入力してください。空欄のままにすると保存済みのキーを維持します。 |
| - [ ] | `keyBlankNew` | Enter the API key, or leave the field empty if this provider authenticates another way. | API キーを入力してください。このプロバイダーが別の方法で認証する場合は空欄のままにできます。 |
| - [ ] | `keyIllegalCharacters` | This API key is not in a valid format. Please check it. | この API キーは形式が正しくありません。確認してください。 |
| - [ ] | `modelIdRequired` | Model ID is required. | モデル ID は必須です。 |
| - [ ] | `modelIdDuplicate` | Model ID must be unique. | モデル ID は重複できません。 |
| - [ ] | `modelNameInvalid` | Display name cannot be empty. | 表示名は空にできません。 |
| - [ ] | `modelContextInvalid` | Context window must be a positive count, like 131072, 256K, or 1M. | コンテキストウィンドウは正の数値で指定してください (例: 131072、256K、1M)。 |
| - [ ] | `modelMaxTokensInvalid` | Max output tokens must be a positive count, like 8192, 64K, or 1M. | 最大出力トークン数は正の数値で指定してください (例: 8192、64K、1M)。 |
| - [ ] | `advancedHint` | Other fields live in cordis.patch.yml; edit that section directly. | その他の項目は cordis.patch.yml にあります。該当箇所を直接編集してください。 |
| - [ ] | `modelCapacityInvalid` | A capacity must be a number, optionally suffixed K or M. | 容量は数値で指定します。任意で K または M を付けられます。 |
| - [ ] | `modelDuplicate` | Each model ID may appear once. | 同じモデル ID は 1 回だけ指定できます。 |
| - [ ] | `fetchModels` | Fetch available models | 利用可能なモデルを取得 |
| - [ ] | `fetching` | Asking the provider… | プロバイダーに問い合わせています… |
| - [ ] | `fetchNeedsBaseUrl` | Enter the base URL first, then fetch. | 先にベース URL を入力してから取得してください。 |
| - [ ] | `fetchEmpty` | The provider listed no models. Add them by hand. | プロバイダーはモデルを 1 つも公開していません。手動で追加してください。 |
| - [ ] | `fetchTitle` | Choose models to add | 追加するモデルを選択 |
| - [ ] | `fetchDescription` | These are the models this provider has available. Choose the ones to add. | このプロバイダーで利用可能なモデルです。追加するものを選んでください。 |
| - [ ] | `fetchSearch` | Search models | モデルを検索 |
| - [ ] | `fetchNoMatches` | No matching models. | 一致するモデルがありません。 |
| - [ ] | `fetchSelectAll` | Select all | すべて選択 |
| - [ ] | `fetchDeselectAll` | Deselect all | 選択を解除 |
| - [ ] | `fetchAdopt` | Add selected | 選択したものを追加 |
| - [ ] | `customTag` | Custom | カスタム |
| - [ ] | `customRoute` | Provider ID | プロバイダー ID |
| - [ ] | `customRouteHint` | Lowercase identifier, starting with a letter, that uniquely names this provider in requests and as its credential name. | 英小文字で始まる識別子です。リクエスト内でこのプロバイダーを一意に示し、認証情報の名前の元にもなります。 |
| - [ ] | `customRouteInvalid` | Start with a lowercase letter; then lowercase letters, digits, and dashes. | 英小文字で始め、以降は英小文字・数字・ハイフンを使用してください。 |
| - [ ] | `customRouteTaken` | A provider already uses this ID. | この ID は既に別のプロバイダーが使用しています。 |
| - [ ] | `customDisplayName` | Display name | 表示名 |
| - [ ] | `customApi` | API protocol | API プロトコル |
| - [ ] | `customApiUnset` | Not selected | 未選択 |
| - [ ] | `protocolOpenAiCompletions` | OpenAI Chat Completions | OpenAI Chat Completions |
| - [ ] | `protocolOpenAiResponses` | OpenAI Responses | OpenAI Responses |
| - [ ] | `protocolAnthropicMessages` | Anthropic Messages | Anthropic Messages |
| - [ ] | `customNeedsBaseUrl` | A custom provider needs a base URL. | カスタムプロバイダーにはベース URL が必要です。 |
| - [ ] | `customBaseUrlInvalid` | Enter a valid HTTP or HTTPS URL. | 有効な HTTP または HTTPS の URL を入力してください。 |
| - [ ] | `customNeedsModels` | A custom provider needs at least one model. | カスタムプロバイダーには少なくとも 1 つのモデルが必要です。 |
| - [ ] | `customBaseUrlPlaceholder` | https://gateway.example/v1 | https://gateway.example/v1 |
| - [ ] | `customAnthropicBaseUrlPlaceholder` | https://gateway.example | https://gateway.example |
| - [ ] | `settingsPathUnresolvable` | unresolvable settings path | 設定パスを解決できません |
| - [ ] | `create` | Create provider | プロバイダーを作成 |
| - [ ] | `creating` | Creating… | 作成しています… |
| - [ ] | `welcomeTitle` | Preview Notice | プレビュー版について |
| - [ ] | `welcomeContinue` | Continue | 続ける |
| - [ ] | `welcomeError` | The acknowledgement could not be saved. Please try again. | 確認状態を保存できませんでした。再試行してください。 |
| - [ ] | `onboardingTitle` | Add an API key to get started | API キーを追加して始める |
| - [ ] | `onboardingDescription` | Configure the official DeepSeek provider to start building. | 公式の DeepSeek プロバイダーを設定すると、すぐに使い始められます。 |
| - [ ] | `onboardingLater` | Configure later | あとで設定する |
| - [ ] | `onboardingSave` | Save and continue | 保存して続ける |
| - [ ] | `onboardingSaving` | Saving… | 保存しています… |
| - [ ] | `keyRequired` | Enter an API key to continue. | 続けるには API キーを入力してください。 |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
