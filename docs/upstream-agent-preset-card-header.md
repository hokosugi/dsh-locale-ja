# 上流報告: Agent プリセットのカード見出しが名前を押し出す

DSH 本体 (`@deepseek-ai/dsh-client-ui-agent-preset`) のレイアウト不具合の報告文です。
ロケールパック (`dsh-locale-ja`) で見つけたものですが、**原因は言語に依存しません**。

- 対象ファイル: `packages/client/ui-agent-preset/src/client/AgentPresetSection.module.css`
- 提案する修正: **A. `.cardIdentity` に `flex-wrap: wrap; row-gap: 2px` を足す**（1 行）
- 環境: DSH 0.2.0-rc.2 / Web GUI (`dsh web`) / macOS / Chromium

---

## English (paste as-is)

**Title:** Agent preset cards clip the preset name to ~1 character when the header row overflows

**Summary**

On Settings → General → Agent presets, each card header is one flex row:
`[preset name] [badge] … [id]`. When the name and the badge together exceed the
row, the **badge keeps its full width and the preset name collapses** — in Japanese
it renders as a single character (`標`). The badge (`Tag`) has
`white-space: nowrap` and no flex/min-width overrides, so its automatic
minimum size is the full text width; only `.cardName` can shrink, so it absorbs
100% of the deficit.

**Steps to reproduce**

1. `dsh web`, open Settings → General → Agent presets.
2. Either:
   - narrow the window until the cards sit at their minimum width (the grid is
     `repeat(auto-fill, minmax(268px, 1fr))`), or
   - give a custom preset a long name (e.g. 9+ full-width characters, or
     `Standard mode (long name)`) and make it the default, or
   - load a locale whose "New task default" badge is long (9 CJK characters ≈ 116px).
3. Look at the header of the default card.

**Expected**

The preset name stays readable. The badge either wraps to a second line or the
header row grows; the name is never reduced to one character.

**Actual**

The preset name is clipped to ~1 character (`標` / `S…`) while the badge keeps
its full width. The card id stays intact.

**Numbers at the minimum card width (268px)**

| item | width |
| --- | --- |
| card content (`268 − 16×2`) | 236px |
| `cardHead` gap + `cardId` (`standard` at 11px mono ≈ 53px) | ~65px |
| left for name + badge | **~171px** |
| name `Standard mode` (15px semibold) | ~98px |
| badge `New task default` (11px + `1px 8px` padding) | ~105px |
| required | **~209px** |

So the deficit (≈38px here, ≈26px with the 9-character Japanese badge) is taken
entirely from the name.

**Root cause**

```css
/* packages/client/ui-agent-preset/.../AgentPresetSection.module.css */
.cardHead    { align-items: flex-start; gap: 12px; display: flex; position: relative }
.cardIdentity{ flex: 1; align-items: center; gap: 6px; min-width: 0; display: flex }
.cardName    { text-overflow: ellipsis; white-space: nowrap; min-width: 0;
               font-size: 15px; font-weight: 600; line-height: 1.4; overflow: hidden }
.cardId      { max-width: 35%; white-space: nowrap; flex-shrink: 0; font-size: 11px; … }
```

```css
/* packages/client/ui-primitives/.../Tag.module.css — rendered by <Tag> */
.tag { display: inline-flex; align-items: center; border-radius: 999px;
       padding: 1px 8px; font-size: 11px; line-height: 17px; font-weight: 500;
       white-space: nowrap }
```

`<Tag>` sets no `flex`, so as a flex item it is `flex: 0 1 auto` with
`min-width: auto`; with `white-space: nowrap` that resolves to the min-content
width (= the whole label), so **the badge cannot shrink at all**. `.cardName`
has `min-width: 0`, so it is the only item that can shrink, and it shrinks to
zero before anything else gives.

**Proposed fix (A)**

```diff
 .cardIdentity {
   flex: 1;
   align-items: center;
   gap: 6px;
+  flex-wrap: wrap;
+  row-gap: 2px;
   min-width: 0;
   display: flex;
 }
```

The badge drops to a second line only when the row does not fit, so nothing
changes for layouts that already fit, and long names additionally get the whole
first line. Cards grow a few pixels taller only in the overflowing case.

**Alternatives considered**

- **B.** Move the default badge from the header into the card footer
  (`.cardFoot` already exists) — fixes it structurally, but changes the design.
- **C.** `.cardName { flex: 0 0 auto }` and let the badge shrink — protects the
  name but clips the badge instead.
- **D.** Do nothing and require short translations — a losing game for CJK
  locales, and custom preset names still break.

**Notes**

- The `ja` locale pack worked around this by shortening its badge from
  「新しいタスクの既定」(9 chars ≈ 116px) to 「既定」(2 chars ≈ 39px), which is
  why the built-in names are safe there today. Long **custom** preset names
  (9+ full-width characters) still clip.
- A locale pack cannot patch this safely: the CSS module class names are hashed
  (`rtSEdW_cardIdentity`), so an injected override would silently break on the
  next release.

---

## 日本語版

**タイトル:** Agent プリセットのカード見出しで、プリセット名が 1 文字まで潰れる

**概要**

設定 → 一般 → Agent プリセットのカードは、見出しが `[名前] [バッジ] … [id]` の
1 行 flex です。名前とバッジの合計が行幅を超えると、**バッジは全幅のまま、名前だけが
1 文字（`標`）まで潰れます**。バッジ (`Tag`) は `white-space: nowrap` で flex 指定が
無いため、自動最小サイズ = ラベル全体の幅になり、**まったく縮みません**。縮めるのは
`.cardName`（`min-width: 0`）だけなので、不足分を全部名前が払います。

**再現手順**

1. `dsh web` で 設定 → 一般 → Agent プリセット を開く。
2. 次のいずれか:
   - カードが最小幅になるまでウィンドウを狭める（グリッドは `minmax(268px, 1fr)`）、
   - カスタムプリセットに長い名前（全角 9 文字以上など）を付けて既定にする、
   - 「新しいタスクの既定」のような長いバッジの言語で表示する（全角 9 文字 ≒ 116px）。
3. 既定カードの見出しを見る。

**期待**

プリセット名が読める。バッジが 2 行目に折り返すか、見出しの行が広がる。名前が
1 文字になることはない。

**実際**

名前が 1 文字程度（`標` / `S…`）に切られ、バッジは全幅のまま残る。id は無事。

**最小カード幅（268px）での計算**

| 項目 | 幅 |
| --- | --- |
| カード本文 (`268 − 16×2`) | 236px |
| `cardHead` の隙間 + `cardId`（`standard` = 11px 等幅で約 53px） | 約 65px |
| 名前とバッジに残る幅 | **約 171px** |
| 名前 `Standard mode`（15px semibold） | 約 98px |
| バッジ `New task default`（11px + 左右 8px パディング） | 約 105px |
| 必要幅 | **約 209px** |

不足分（英語で約 38px、日本語の 9 文字バッジで約 26px）は、そっくり名前から引かれます。

**原因**

上の英語版と同じ（`.cardHead` / `.cardIdentity` / `.cardName` / `.cardId` と
`Tag.module.css` の組み合わせ）。要点は「バッジの `min-width: auto` が
`nowrap` のラベル幅に解決されるので縮まない」「`min-width: 0` の名前だけが縮む」。

**提案する修正 (A)**

```diff
 .cardIdentity {
   flex: 1;
   align-items: center;
   gap: 6px;
+  flex-wrap: wrap;
+  row-gap: 2px;
   min-width: 0;
   display: flex;
 }
```

入りきらないときだけバッジが 2 行目に落ちるので、収まっているレイアウトは変わりません。
長い名前は 1 行目を丸ごと使えるようになります。カードが数 px 高くなるのは
はみ出す場合だけです。

**検討した代替案**

- **B.** バッジをカード下部のフッター（既存の `.cardFoot`）へ移す — 構造的に直るが意匠変更。
- **C.** `.cardName { flex: 0 0 auto }` にしてバッジ側を縮める — 名前は守れるがバッジが切れる。
- **D.** 何もせず訳語を短くする運用 — CJK では消耗戦になるうえ、カスタム名は救えない。

**補足**

- `ja` ロケールパックは、バッジを「新しいタスクの既定」(9 文字 ≒ 116px) から
  「既定」(2 文字 ≒ 39px) に短縮して回避しています。そのため組み込みの名前は
  現状安全ですが、**長いカスタムプリセット名（全角 9 文字以上）は今も切れます**。
- ロケールパック側では安全に直せません。CSS モジュールのクラス名はハッシュ
  (`rtSEdW_cardIdentity`) なので、上書きを注入すると次のリリースで黙って壊れます。
