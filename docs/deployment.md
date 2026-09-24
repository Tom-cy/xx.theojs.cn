# 官网部署

脚本参考运营端 `prod.sh`，使用同一服务器的 SSH/SCP。只部署 VitePress 静态产物 `.vitepress/dist`。

首次使用前确认服务器上的官网目录和 Nginx `root` 一致。默认目录 `/var/www/hair/www` 是本项目约定，尚未在服务器核实；不会修改 Nginx 配置。

```bash
# 查看配置，不连接服务器
bash prod.sh --dry-run

# 已安装项目依赖后执行：构建、上传、备份、切换
bash prod.sh

# 覆盖实际站点目录等配置
DEPLOY_HOST=root@8.166.133.61 DEPLOY_DIR=/var/www/hair/www DEPLOY_OWNER=www-data:www-data bash prod.sh
```

本地需要 Node.js、npm、ssh、scp；首次安装依赖使用项目指定的 pnpm 10.16.1 和 `pnpm install --frozen-lockfile`。服务器需要 Bash、SCP 支持，并已配置 SSH 登录权限；部署用户须能写入目标目录并设置属主。

上传先进入独立的 `_upload_时间戳` 目录。上传完成且权限设置成功后，旧站点移到 `_backup_时间戳`，再切换新站点；切换失败会尝试恢复旧目录。目录切换存在短暂间隙。备份不自动删除；中断产生的上传目录或部署锁，确认没有部署进程运行后可人工清理。

Nginx 应将站点根目录指向实际部署目录；由于启用了 `cleanUrls`，可使用 `try_files $uri $uri.html $uri/ =404;`，并配置 `error_page 404 /404.html;`。修改 Nginx 后先检查配置，再按服务器流程重新加载。

## Nginx 与 HTTPS（默认 www.iskaola.com）

官网域名暂按 `www.iskaola.com` 编写。如使用其他域名，替换两个配置文件中的 `server_name`、跳转域名、证书路径和下面命令里的域名。现有 `hair.iskaola.com` 是运营端，保留它的 `hair.conf`，不要用官网配置覆盖。

以下步骤适用于当前使用 Nginx、Certbot、systemd 的 Linux 服务器。先将域名 A 记录指向 `8.166.133.61`，开放 80、443 端口；如设置了 AAAA 记录，也必须指向能够完成验证的服务器，否则移除错误记录。以下配置仅监听 IPv4，使用 IPv6 时另加对应的 `listen [::]:80;`、`listen [::]:443 ssl;`。

### 1. 上传配置文件

在本地项目根目录运行（仅上传到临时目录，不直接覆盖服务器配置）：

```bash
scp www.conf deploy/www-http.conf deploy/reload-nginx.sh root@8.166.133.61:/tmp/
```

官网静态文件先通过 `bash prod.sh` 部署。在服务器上确认 `certbot --version` 可用；现有站点已使用 Certbot，不要混用 apt 与 snap 重复安装。

### 2. 先启用 HTTP 验证入口

首次还没有官网证书，不能直接启用包含证书路径的 HTTPS 配置，否则 `nginx -t` 会失败。在服务器以 root 运行：

```bash
# 如 www.conf 已存在，先将它备份到 conf.d 以外
if [ -f /etc/nginx/conf.d/www.conf ]; then
  cp /etc/nginx/conf.d/www.conf "/root/www.conf.$(date +%Y%m%d%H%M%S).bak"
fi
install -d -m 755 /var/www/letsencrypt/.well-known/acme-challenge
install -m 644 /tmp/www-http.conf /etc/nginx/conf.d/www.conf
nginx -t && systemctl reload nginx
```

不要把 HTTP 临时配置另存为第二个 `.conf` 同时启用，以免同域名重复匹配。

### 3. 签发官网证书，再启用 HTTPS

```bash
certbot certonly --webroot \
  -w /var/www/letsencrypt \
  --cert-name www.iskaola.com \
  -d www.iskaola.com
```

按 Certbot 提示填写邮箱并确认条款。此命令仅为官网申请证书，不修改运营端证书。成功后确认路径，再启用正式配置：

```bash
certbot certificates
install -m 644 /tmp/www.conf /etc/nginx/conf.d/www.conf
nginx -t && systemctl reload nginx
```

HTTP 的验证路径保留直接访问，其余 HTTP 请求跳转到 HTTPS。验证目录独立于网站部署目录，后续更新网站不会破坏证书验证。

### 4. 配置成功续期后重载 Nginx

```bash
install -d -m 755 /etc/letsencrypt/renewal-hooks/deploy
install -m 755 /tmp/reload-nginx.sh /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
```

这个 hook 只在签发或续期成功时运行，先检查 Nginx 配置，检查成功才重载，读取新的证书。它也可用于同机运营端证书续期。

### 5. 检查并启用自动续期计划

先查看已有调度，避免重复设置：

```bash
systemctl list-timers --all | grep -E 'certbot|snap.certbot'
ls -l /etc/cron.d/certbot 2>/dev/null
```

- 如果通过系统包安装，且存在 `certbot.timer`：执行 `systemctl enable --now certbot.timer`。
- 如果通过 snap 安装：查看 `snap services certbot` 和 `systemctl list-timers --all` 中的 snap Certbot 续期任务；已有任务时不再添加 cron。
- 如果没有任何已有调度，可选择下面的 cron 方案（只选一种调度方式）。

```bash
# 仅当没有 timer / cron 时运行；写入 Certbot 的实际绝对路径
CERTBOT_BIN="$(command -v certbot)"
test -n "$CERTBOT_BIN" && printf '17 3,15 * * * root %s renew --quiet\n' "$CERTBOT_BIN" > /etc/cron.d/www-certbot-renew
chmod 644 /etc/cron.d/www-certbot-renew
```

cron 服务需正常运行。该计划每日检查两次，Certbot 只续期符合条件的证书，不是每次都重新签发。`renew` 会使用各张证书保存的验证方式；官网为 webroot，运营端继续使用原来的方式。

### 6. 验证续期流程

```bash
# 测试官网证书续期（测试环境，不替换正式证书）
certbot renew --cert-name www.iskaola.com --dry-run

# 验证重载脚本本身
/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh

# 同时检查包括运营端在内的所有证书
certbot renew --dry-run
```

默认 dry-run 不执行 deploy hook；新版 Certbot 可用 `--dry-run --run-deploy-hooks` 联合测试。保留 80 端口及验证路径，否则 HTTP-01 自动续期会失败。检查日志：`/var/log/letsencrypt/letsencrypt.log`，系统包安装还可查看 `journalctl -u certbot.service`。

官网与运营端是不同域名，不能直接复用 `hair.iskaola.com` 的单域名证书。以上文件尚未上传或在服务器执行；正式启用时必须通过服务器上的 `nginx -t`。

参考：[Certbot 官方续期说明](https://eff-certbot.readthedocs.io/en/stable/using.html#renewing-certificates)、[Certbot 命令说明](https://eff-certbot.readthedocs.io/en/stable/man/certbot.html)。
