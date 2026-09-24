#!/usr/bin/env bash
# 用法：bash prod.sh [--dry-run]
# 可覆盖：DEPLOY_HOST、DEPLOY_DIR、DEPLOY_OWNER
set -euo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_HOST="${DEPLOY_HOST:-root@8.166.133.61}"
DEPLOY_DIR="${DEPLOY_DIR:-/var/www/hair/www}"
DEPLOY_OWNER="${DEPLOY_OWNER:-www-data:www-data}"
DIST_DIR="$PROJECT_DIR/.vitepress/dist"

# 限定可安全传递给远程 shell 的部署参数；防止误覆盖系统根目录。
[[ "$DEPLOY_HOST" =~ ^[a-zA-Z0-9_][a-zA-Z0-9_.@-]*$ ]] || { echo 'DEPLOY_HOST 格式不正确' >&2; exit 1; }
[[ "$DEPLOY_DIR" =~ ^/var/www/[a-zA-Z0-9_/-]+$ && "$DEPLOY_DIR" != */ && "$DEPLOY_DIR" != *//* ]] || { echo 'DEPLOY_DIR 必须是 /var/www/ 下的独立目录，且不能以 / 结尾' >&2; exit 1; }
[[ "$DEPLOY_OWNER" =~ ^[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+$ ]] || { echo 'DEPLOY_OWNER 格式应为 user:group' >&2; exit 1; }

case "${1:-}" in
  --dry-run)
    printf '构建命令：npm run build\n产物目录：%s\n部署主机：%s\n部署目录：%s\n文件属主：%s\n（仅显示配置，不构建、不连接服务器）\n' "$DIST_DIR" "$DEPLOY_HOST" "$DEPLOY_DIR" "$DEPLOY_OWNER"
    exit 0
    ;;
  '') ;;
  *) echo '用法：bash prod.sh [--dry-run]' >&2; exit 1 ;;
esac

for command in npm ssh scp; do
  command -v "$command" >/dev/null || { echo "缺少命令：$command" >&2; exit 1; }
done
cd "$PROJECT_DIR"
npm run build
[[ -s "$DIST_DIR/index.html" ]] || { echo '构建产物缺少 index.html，停止部署' >&2; exit 1; }

RELEASE_ID="$(date +%Y%m%d%H%M%S)_$$_${RANDOM}"
STAGING_DIR="${DEPLOY_DIR}_upload_${RELEASE_ID}"
BACKUP_DIR="${DEPLOY_DIR}_backup_${RELEASE_ID}"
printf '上传官网到 %s:%s\n' "$DEPLOY_HOST" "$STAGING_DIR"
ssh "$DEPLOY_HOST" "mkdir -p -- '$STAGING_DIR'"
# /. 包含隐藏文件，避免 glob 漏传；上传失败不会修改当前站点。
scp -r "$DIST_DIR/." "$DEPLOY_HOST:$STAGING_DIR/"

ssh "$DEPLOY_HOST" "bash -s -- '$DEPLOY_DIR' '$STAGING_DIR' '$BACKUP_DIR' '$DEPLOY_OWNER'" <<'REMOTE'
set -euo pipefail
target="$1"
staging="$2"
backup="$3"
owner="$4"
lock="${target}_deploy.lock"
[[ -s "$staging/index.html" ]] || { echo '上传产物缺少 index.html' >&2; exit 1; }
chown -R "$owner" "$staging"
find "$staging" -type d -exec chmod 755 {} +
find "$staging" -type f -exec chmod 644 {} +
mkdir "$lock" || { echo '另一个部署正在切换版本，请稍后重试' >&2; exit 1; }
trap 'rmdir "$lock"' EXIT
if [[ -e "$target" || -L "$target" ]]; then
  mv -- "$target" "$backup"
fi
if ! mv -- "$staging" "$target"; then
  echo '切换失败，恢复旧版本' >&2
  if [[ -e "$backup" || -L "$backup" ]]; then
    mv -- "$backup" "$target"
  fi
  exit 1
fi
printf '部署完成：%s\n旧版本备份（原站点存在时）：%s\n' "$target" "$backup"
REMOTE
