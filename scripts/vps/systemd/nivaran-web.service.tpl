[Unit]
Description=Nivaran Foundation Next.js web app
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=__RUN_USER__
Group=__RUN_GROUP__
WorkingDirectory=__REPO_ROOT__
EnvironmentFile=__ENV_FILE__
Environment=PATH=/usr/local/bin:/usr/bin:/bin
ExecStart=/bin/bash -lc 'exec npm run start -- --hostname "${APP_HOST:-127.0.0.1}" --port "${PORT:-3000}"'
Restart=always
RestartSec=5
TimeoutStartSec=120
TimeoutStopSec=30
KillMode=mixed
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
