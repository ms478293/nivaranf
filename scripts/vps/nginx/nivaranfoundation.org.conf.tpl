map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

upstream nivaran_web_upstream {
    server 127.0.0.1:__APP_PORT__;
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name nivaranfoundation.org;
    return 301 http://www.nivaranfoundation.org$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name www.nivaranfoundation.org global.nivaranfoundation.org usa.nivaranfoundation.org;

    client_max_body_size 50m;

    location / {
        proxy_pass http://nivaran_web_upstream;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_read_timeout 300;
        proxy_send_timeout 300;
    }
}
