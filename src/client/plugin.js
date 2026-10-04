/**
 * dsh-locale-ja のクライアント側 (ブラウザ) プラグイン本体。
 *
 * これはビルド入力であり、そのままでは読み込まれない。tools/build.mjs が
 *   - `export ` を外して lib/client.js の factory 本体に展開し、
 *   - ビルド時に src/locales/*.ja.json を `dictionaries` として渡し、
 *   - プラットフォームのモジュール表から `react` を require して `React` / `h` を渡す。
 *
 * 実行時に使うのは Cordis のサービス (`ctx.locale`, `ctx.slots`) だけで、DSH の
 * 内部パッケージは一切 import しない (ブラウザ側のモジュール解決に依存しないため)。
 */

/** 追加する言語 ID。BCP 47 風の ASCII タグである必要がある。 */
export const LOCALE_ID = 'ja'

/** 言語選択に表示する名前 (その言語自身で書く)。 */
export const LOCALE_LABEL = '日本語'

/** 訳語が無いキーを引く先。DSH のロケール機構は最終的に `en` に落ちる。 */
export const LOCALE_FALLBACK = 'en'

/** このプラグイン自身の名前空間 (設定画面の行の文言)。 */
export const OWN_NAMESPACE = 'localeJa'

/**
 * 自前の名前空間は 3 言語ぶん登録する。DSH の組込辞書は zh/en の 2 言語しか
 * 持たないため、ja だけを登録すると zh/en 表示のときにキーがそのまま出てしまう。
 */
const OWN_DICTIONARIES = {
  en: {
    title: 'Japanese locale pack',
    description: 'Provides Japanese for the {count} strings of the DSH Web GUI.',
  },
  zh: {
    title: '日语语言包',
    description: '将 DSH Web GUI 的 {count} 条文案翻译为日语。',
  },
  ja: {
    title: '日本語ロケールパック',
    description: 'DSH Web GUI の {count} 件の文言を日本語にしています。',
  },
}

/**
 * プラグイン本体を組み立てる。
 * @param root0 - ビルド時に注入される依存。
 * @param root0.React - プラットフォームのモジュール表から来る React。
 * @param root0.h - `React.createElement` の別名。
 * @param root0.dictionaries - 名前空間 → 日本語辞書。ビルド時に埋め込まれる。
 * @returns cordis プラグイン (`inject` と `apply`)。
 */
export function createPlugin({ React, h, dictionaries }) {
  /** 必要なサービス: ロケール登録とスロット登録。 */
  const inject = ['locale', 'slots']

  /** このパックが提供する訳語の総数 (設定画面の行に表示する)。 */
  const keyCount = Object.values(dictionaries).reduce(
    (total, dict) => total + Object.keys(dict).length,
    0,
  )

  /**
   * 辞書の登録に失敗しても、パック全体を巻き添えにしない。
   * 同じ名前空間・同じ言語に別のパックが先に登録していると register は throw する。
   * @param ctx - クライアントの cordis コンテキスト。
   * @param ns - 名前空間。
   * @param dict - 辞書。
   * @param locale - 登録する言語 ID。既定はこのパックの言語 (`ja`)。
   * @returns 登録の破棄関数 (失敗時は何もしない関数)。
   */
  function registerDictionary(ctx, ns, dict, locale = LOCALE_ID) {
    try {
      return ctx.locale.register(ns, locale, dict)
    } catch (error) {
      console.warn(`[dsh-locale-ja] 名前空間 "${ns}" の ${locale} 辞書を登録できませんでした`, error)
      return () => {}
    }
  }

  /** 設定 → 一般 に出すこのパックの行。`t` は `locale: OWN_NAMESPACE` から来る。 */
  function JapanesePackRow(props) {
    const t = props.t
    return h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
      h('span', null, t('title')),
      h('span', { style: { fontSize: '0.9em', opacity: 0.7 } }, t('description', { count: keyCount })),
    )
  }

  /**
   * 言語と訳語を登録する。定義と辞書はどちらが先でもよい。
   * @param ctx - クライアントの cordis コンテキスト。
   */
  function apply(ctx) {
    // 1. 言語そのものを追加する (fallback は必ず登録済みの `en`)。
    ctx.effect(() => {
      try {
        return ctx.locale.addLanguage({
          id: LOCALE_ID,
          label: LOCALE_LABEL,
          fallback: LOCALE_FALLBACK,
        })
      } catch (error) {
        // 既に別のパックが `ja` を登録している場合は、辞書だけ活かして続行する。
        console.warn('[dsh-locale-ja] 言語 "ja" を追加できませんでした', error)
        return () => {}
      }
    }, 'locale-ja: language')

    // 2. 他パッケージが所有する名前空間に、日本語 (ja) だけを足す。
    //    register は (名前空間, 言語) の組で一意なので、zh/en の所有権は侵さない。
    for (const [ns, dict] of Object.entries(dictionaries)) {
      ctx.effect(() => registerDictionary(ctx, ns, dict), `locale-ja: ${ns} dictionary`)
    }

    // 3. 自前の名前空間は zh/en/ja をまとめて登録する。
    ctx.effect(() => registerDictionary(ctx, OWN_NAMESPACE, OWN_DICTIONARIES.en, 'en'), 'locale-ja: own en')
    ctx.effect(() => registerDictionary(ctx, OWN_NAMESPACE, OWN_DICTIONARIES.zh, 'zh'), 'locale-ja: own zh')
    ctx.effect(() => registerDictionary(ctx, OWN_NAMESPACE, OWN_DICTIONARIES.ja, 'ja'), 'locale-ja: own ja')

    // 4. 設定 → 一般 の一番下に、このパックの情報行を出す。
    try {
      ctx.slots.inject('settings.general.item', () =>
        ctx.slots.register(
          {
            name: 'settings.general.item',
            id: 'locale-ja',
            order: 90,
            locale: OWN_NAMESPACE,
          },
          JapanesePackRow,
        ),
      )
    } catch (error) {
      console.warn('[dsh-locale-ja] 設定画面の行を登録できませんでした', error)
    }
  }

  return { inject, apply }
}
