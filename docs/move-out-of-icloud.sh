#!/usr/bin/env bash
# DSH のワークスペースを iCloud 同期フォルダ (~/Documents) の外へ「移動」する。
#
# 背景: macOS の「iCloud Drive → デスクトップと書類フォルダ」が有効な場合、~/Documents 配下は
# すべて iCloud に同期される。DSH 自身の状態 (~/.dsh: セッション・添付・認証情報) は同期されないが、
# 作業ディレクトリを ~/Documents に置いていると、その中身 (ソース・生成物) が同期対象になる。
#
# 移動するもの : ~/Documents/deepseek-harness  (ワークスペース丸ごと = default-workspace とその中身)
# 移動しないもの: ~/.npm/_npx/... の DSH 本体、~/.dsh のデータ (どちらも元から iCloud 外)
# 書き換えるもの: ~/.dsh/profiles/<profile> の dsh-locale-ja のリンク先 (移動ではなく編集)
#
# 使い方 (スクリプト自身が入っているフォルダを動かすので、必ず別の場所から実行する):
#   cp /path/to/dsh-locale-ja/docs/move-out-of-icloud.sh /tmp/
#   bash /tmp/move-out-of-icloud.sh                        # 移動先は ~/dev/deepseek-harness
#   bash /tmp/move-out-of-icloud.sh ~/work                 # 移動先の親ディレクトリを指定する場合
#   bash /tmp/move-out-of-icloud.sh ~/work ~/tmp/ws        # 移動元も指定する場合
set -euo pipefail

SRC="${2:-$HOME/Documents/deepseek-harness}"
PARENT="${1:-$HOME/dev}"
DST="$PARENT/deepseek-harness"
PROFILE="${DSH_PROFILE:-web}"

# `dsh` は PATH に無いことがある (npx で入れている場合はキャッシュの bin を使う)。
# 見つかった呼び方を覚えておき、最後の案内にも使う。
DSH_CALL=""
run_dsh() {
  if [ -n "$DSH_CALL" ]; then
    $DSH_CALL "$@"
    return
  fi
  if command -v dsh > /dev/null 2>&1; then
    DSH_CALL="dsh"
    dsh "$@"
    return
  fi
  local bin
  bin=$(compgen -G "$HOME/.npm/_npx/*/node_modules/.bin/dsh" 2> /dev/null | head -1 || true)
  if [ -n "$bin" ]; then
    DSH_CALL="$bin"
    "$bin" "$@"
    return
  fi
  DSH_CALL="npx -y @deepseek-ai/dsh"
  npx -y @deepseek-ai/dsh "$@"
}

echo "移動元: $SRC"
echo "移動先: $DST"
echo

[ -d "$SRC" ] || { echo "✗ 移動元がありません (すでに移動済みかもしれません)"; exit 1; }
if [ -e "$DST" ]; then
  echo "✗ 移動先がすでに存在します: $DST"
  echo "  中身を確認して、不要なら削除するか別の親ディレクトリを指定してください。"
  exit 1
fi

# 何を動かすのかを見せてから確認する
echo "--- 移動する中身 ---"
du -sh "$SRC" | sed "s|$HOME|~|"
( cd "$SRC" && find . -maxdepth 3 | sed "s|^\./||" | head -20 )
echo

answer=""
read -r -p "$SRC を $DST へ移動しますか? [y/N] " answer || true
case "$answer" in
  [yY]*) ;;
  *) echo "中止しました (何も変更していません)"; exit 0 ;;
esac

# 1. ワークスペースごと移動する (同一ディスク内なら mv は原子的 = 途中で壊れる余地がない。
#    別ディスクの場合は mv がコピーしてから削除し、失敗すれば元は残る)
mkdir -p "$PARENT"
mv "$SRC" "$DST"
echo "✓ 移動しました: $DST"

# 2. プラグインのリンクを張り直す (旧パスを掴んだままだと日本語ロケールが読まれなくなる)
PACK="$DST/default-workspace/dsh-locale-ja"
echo
echo "--- プラグインを張り直します ---"
run_dsh plugin --profile "$PROFILE" remove dsh-locale-ja || true
run_dsh plugin --profile "$PROFILE" add "$PACK"

# 3. 確認
echo
echo "--- 使ったコマンド ---"
echo "${DSH_CALL:-dsh}"
echo "--- node_modules のリンク ---"
readlink "$HOME/.dsh/profiles/$PROFILE/node_modules/dsh-locale-ja" || echo "(リンクが見つかりません)"
echo "--- プロファイルの依存 ---"
grep -n "dsh-locale-ja" "$HOME/.dsh/profiles/$PROFILE/package.json" || true
echo "--- パックの検証 ---"
( cd "$PACK" && npm run check )

cat <<EOS

完了しました。次をお願いします。

  1) GUI を再起動する (起動中のプロセスは旧パスを掴んでいます)
       ${DSH_CALL:-dsh} web
  2) 新しいセッションを、新しいワークスペースで開始する
       $DST/default-workspace
  3) ワークスペース一覧に旧パス (~/Documents/deepseek-harness/...) が残っていたら、
     新しいパスを追加して旧パスを削除する
  4) 過去のセッションは旧パスの記録として残ります (セッション記録に cwd が埋まっているため
     引き継げません)。これからは新しいワークスペースで作ってください。

言語設定 (ja) とセッション履歴・添付・認証情報は \$DSH_HOME (~/.dsh) 側にあり、
移動の影響を受けません。もし dsh plugin がロックで失敗したら、GUI を止めてから
もう一度実行してください。
EOS
