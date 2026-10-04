# shortcuts — 日本語訳レビュー

訳済み **56 / 56** キー / 要確認 0 件

<!-- 生成物: tools/review.mjs。編集するのは src/locales/*.ja.json か review/ja.tsv -->

## 一覧

| 確認 | キー | 英語 | 日本語 |
| --- | --- | --- | --- |
| - [ ] | `edit-label` | Edit shortcut for {command} | {command} のショートカットを編集 |
| - [ ] | `record` | Press a shortcut | ショートカットを押してください |
| - [ ] | `record-help` | Release the keys to save. Tab moves between actions; Esc cancels. | キーを離すと保存します。Tab で操作を移動、Esc でキャンセルします。 |
| - [ ] | `web-help` | Browser combinations: Mod+/, Mod+Shift+,, Mod+Shift+.. Mod is Command on Mac and Ctrl elsewhere. | ブラウザーでの組み合わせ: Mod+/、Mod+Shift+,、Mod+Shift+.。Mod は Mac では Command、それ以外では Ctrl です。 |
| - [ ] | `unsupported-key` | This key is not supported. | このキーは対応していません。 |
| - [ ] | `reserved` | This combination is reserved for system or text editing actions. | この組み合わせはシステムまたはテキスト編集の操作に予約されています。 |
| - [ ] | `modifier-required` | Include Command, Ctrl, or Alt in the combination. | 組み合わせに Command、Ctrl、Alt のいずれかを含めてください。 |
| - [ ] | `too-many-keys` | Hold at most two non-modifier keys. Release the keys to try again. | 修飾キー以外は最大 2 つまでです。キーを離してやり直してください。 |
| - [ ] | `macos-web-help` | Use Command+/, Command+,, Command+Backslash, Control+Backquote, Command+Option+key, or Command+Shift+key. Combinations with three or four distinct modifiers are also supported. Browser or system shortcuts may not reach the page. | Command+/、Command+,、Command+Backslash、Control+Backquote、Command+Option+キー、Command+Shift+キーが使えます。修飾キーを 3 つまたは 4 つ組み合わせた指定にも対応します。ブラウザーやシステムのショートカットはページに届かないことがあります。 |
| - [ ] | `windows-web-help` | Use Ctrl+/, Ctrl+,, Ctrl+Alt+key, or Ctrl+Shift+key. Combinations with three or four distinct modifiers are also supported. Browser or system shortcuts may not reach the page. | Ctrl+/、Ctrl+,、Ctrl+Alt+キー、Ctrl+Shift+キーが使えます。修飾キーを 3 つまたは 4 つ組み合わせた指定にも対応します。ブラウザーやシステムのショートカットはページに届かないことがあります。 |
| - [ ] | `unsupported-browser` | This browser does not support this combination yet. | このブラウザーはまだこの組み合わせに対応していません。 |
| - [ ] | `conflict` | Already used by “{commands}” | 「{commands}」で既に使用されています |
| - [ ] | `saved` | Modified | 変更済み |
| - [ ] | `clear` | Remove | 削除 |
| - [ ] | `retry-save` | Retry save | 保存を再試行 |
| - [ ] | `reset` | Restore default | 既定に戻す |
| - [ ] | `reset-all` | Restore all defaults | すべて既定に戻す |
| - [ ] | `modified-count` | {count} customized | {count} 件を変更 |
| - [ ] | `reset-title` | Restore all default shortcuts? | すべてのショートカットを既定に戻しますか？ |
| - [ ] | `reset-description` | Restore the default shortcuts for this platform. All modified or removed shortcuts will be restored. Other platforms are unaffected. | このプラットフォームの既定のショートカットに戻します。変更または削除したショートカットはすべて復元されます。ほかのプラットフォームには影響しません。 |
| - [ ] | `cancel` | Cancel | キャンセル |
| - [ ] | `reset-saved` | Default shortcuts restored | 既定のショートカットに戻しました |
| - [ ] | `close-confirmation` | Close confirmation | 確認を閉じる |
| - [ ] | `reset-failed` | Could not restore defaults. Your shortcuts are unchanged. Please retry. | 既定に戻せませんでした。ショートカットは変更されていません。再試行してください。 |
| - [ ] | `review` | I have reviewed the latest configuration | 最新の設定を確認しました |
| - [ ] | `stale` | Shortcut configuration or available commands changed. Review the latest bindings before saving. | ショートカット設定または利用できるコマンドが変わりました。保存する前に最新の割り当てを確認してください。 |
| - [ ] | `write-failed` | Could not save. Your previous shortcuts and current draft are preserved. Please retry. | 保存できませんでした。以前のショートカットと現在の下書きは保持されています。再試行してください。 |
| - [ ] | `not-ready` | Shortcuts are not ready. Please try again. | ショートカットの準備ができていません。再試行してください。 |
| - [ ] | `read` | Could not read {location}. Check access permissions, then {reload}. | {location} を読み込めませんでした。アクセス権を確認してから {reload} してください。 |
| - [ ] | `invalid` | Shortcut configuration in {location} is damaged. Back up and repair this configuration, then {reload}. | {location} のショートカット設定が壊れています。この設定をバックアップして修復し、{reload} してください。 |
| - [ ] | `future` | Shortcut configuration in {location} was created by a newer version. Upgrade Harness and try again. | {location} のショートカット設定は新しいバージョンで作成されたものです。Harness をアップグレードして再試行してください。 |
| - [ ] | `web-document` | this site’s localStorage entry dsh.keybindings.v1 | このサイトの localStorage の dsh.keybindings.v1 |
| - [ ] | `desktop-document` | userData/keybindings.json | userData/keybindings.json |
| - [ ] | `web-reload` | reload the page | ページを再読み込み |
| - [ ] | `desktop-reload` | restart Harness | Harness を再起動 |
| - [ ] | `using-defaults` | Default bindings are active. | 既定の割り当てが有効です。 |
| - [ ] | `using-accepted` | The last successfully read bindings remain active. | 最後に正常に読み込めた割り当てが有効なままです。 |
| - [ ] | `native-failed` | Could not protect desktop key recording. Exit recording and try again. | デスクトップでのキー記録を保護できませんでした。記録を終了して再試行してください。 |
| - [ ] | `global-hint` | Open from anywhere | どこからでも開く |
| - [ ] | `clear-search` | Clear search | 検索をクリア |
| - [ ] | `title` | Keyboard shortcuts | キーボードショートカット |
| - [ ] | `open` | Open keyboard shortcuts | キーボードショートカットを開く |
| - [ ] | `settings` | Keyboard shortcuts | キーボードショートカット |
| - [ ] | `view` | Edit shortcuts | ショートカットを編集 |
| - [ ] | `description` | View and edit available shortcuts and input actions | 利用できるショートカットと入力操作を確認・編集します |
| - [ ] | `search` | Search shortcuts | ショートカットを検索 |
| - [ ] | `close` | Close keyboard shortcuts | キーボードショートカットを閉じる |
| - [ ] | `application` | Application | アプリケーション |
| - [ ] | `input` | Message input | メッセージ入力 |
| - [ ] | `menus` | Menus and dialogs | メニューとダイアログ |
| - [ ] | `approval` | Approval area | 承認エリア |
| - [ ] | `unbound` | No shortcut | ショートカットなし |
| - [ ] | `empty` | No matching shortcuts | 一致するショートカットはありません |
| - [ ] | `move` | Move menu selection | メニューの選択を移動 |
| - [ ] | `select` | Select menu item | メニュー項目を選択 |
| - [ ] | `dismiss` | Close menu or top dialog | メニューまたは最前面のダイアログを閉じる |

確認列: `- [ ]` は未確認、`- [!]` は要確認。レンダラーによってはチェックボックスとして表示されます。
