# settings.webSearch — 日本語訳レビュー

訳済み **27 / 27** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `title` | Web search | Web 検索 |
| - [ ] | `description` | Set up the DeepSeek search provider. | DeepSeek の検索プロバイダーを設定します。 |
| - [ ] | `useSearchApi` | Use the new Web Search API | 新しい Web Search API を使う |
| - [ ] | `useSearchApiHint` | Off by default: search runs through DeepSeek Messages. For the new Web Search API's features and pricing, see the  | 既定はオフです。検索は DeepSeek Messages 経由で実行されます。新しい Web Search API の機能と料金は次を参照してください:  |
| - [ ] | `searchGuide` | Search & Fetch guide | Search & Fetch ガイド |
| - [ ] | `searchGuideUrl` | https://api-docs.deepseek.com/guides/search | https://api-docs.deepseek.com/guides/search |
| - [ ] | `apiKey` | API key | API キー |
| - [ ] | `apiKeyHint` | Stored outside the settings file. Leave blank to keep the current key. | 設定ファイルには保存されません。空欄のままにすると現在のキーを維持します。 |
| - [ ] | `apiKeySet` | A key is configured. | キーは設定済みです。 |
| - [ ] | `apiKeyUnset` | No key is configured; only conversations using a DeepSeek Account model can search, through the default endpoint. | キーが未設定です。DeepSeek アカウントのモデルを使う会話だけが、既定のエンドポイント経由で検索できます。 |
| - [ ] | `baseUrl` | Messages API base URL | Messages API のベース URL |
| - [ ] | `baseUrlHint` | Include the API prefix, such as https://api.deepseek.com/anthropic/v1. The provider appends /messages. Leave blank to restore the default. | API プレフィックスを含めてください（例: https://api.deepseek.com/anthropic/v1）。プロバイダーが /messages を付けます。空欄にすると既定に戻ります。 |
| - [ ] | `searchApiBaseUrl` | Search / Fetch API base URL | Search / Fetch API のベース URL |
| - [ ] | `searchApiBaseUrlHint` | Include the API prefix, such as https://api.deepseek.com/v1/tools. The provider appends /search or /fetch. Leave blank to restore the default. | API プレフィックスを含めてください（例: https://api.deepseek.com/v1/tools）。プロバイダーが /search または /fetch を付けます。空欄にすると既定に戻ります。 |
| - [ ] | `maxUses` | Max searches per request | 1 リクエストあたりの最大検索回数 |
| - [ ] | `maxUsesHint` | How many searches the auxiliary model may run within one Messages request. Applies only to the Messages API. | 補助モデルが 1 回の Messages リクエスト内で実行できる検索回数です。Messages API のみに適用されます。 |
| - [ ] | `count` | Results per search | 検索あたりの結果数 |
| - [ ] | `countHint` | Results returned per query: an integer from 1 to 50, default 10. This controls result count, not search calls. web_search keeps no more sources than its own result limit. | クエリあたりに返す結果数です。1〜50 の整数で、既定は 10 です。これは検索回数ではなく結果数を決めます。web_search は自身の結果上限を超えるソースを保持しません。 |
| - [ ] | `overridden` | Overridden | 上書き済み |
| - [ ] | `reset` | Reset to default | 既定に戻す |
| - [ ] | `readOnly` | This deployment stores settings read-only. | この環境では設定は読み取り専用で保存されます。 |
| - [ ] | `unavailable` | This plugin is not loaded, so it cannot be configured right now. | このプラグインは読み込まれていないため、現在は設定できません。 |
| - [ ] | `save` | Save | 保存 |
| - [ ] | `saving` | Saving… | 保存しています… |
| - [ ] | `saveFailed` | The deployment did not accept these values; they were left for you to correct. | この環境が値を受け付けませんでした。修正できるよう入力は残しています。 |
| - [ ] | `invalidNumber` | Enter a number, or leave blank to use the default. | 数値を入力してください。空欄のままにすると既定値を使います。 |
| - [ ] | `invalidCount` | Enter an integer from 1 to 50, or leave blank to use the default. | 1〜50 の整数を入力するか、空欄にして既定を使ってください。 |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
