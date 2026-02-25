[Unit]
Description=Nivaran Global_News Publisher
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=__RUN_USER__
Group=__RUN_GROUP__
WorkingDirectory=__REPO_ROOT__
Environment=REPO_ROOT=__REPO_ROOT__
Environment=ENV_FILE=__ENV_FILE__
EnvironmentFile=__ENV_FILE__
ExecStart=/bin/bash __REPO_ROOT__/scripts/vps/run_global_news_once.sh
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
