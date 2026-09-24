#!/bin/sh
# 安装到 /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
# Certbot 仅在证书成功签发/续期后调用 deploy hook。
set -eu
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH
nginx -t
systemctl reload nginx
