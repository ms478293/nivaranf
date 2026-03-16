FROM node:20-bookworm-slim AS deps

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml* ./

RUN npm ci --legacy-peer-deps


FROM node:20-bookworm-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY pnpm-lock.yaml* ./
COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://www.nivaranfoundation.org
ARG NEXT_PUBLIC_APP_URL=https://www.nivaranfoundation.org
ARG NEXT_PUBLIC_API_BASE_URL=https://api.nivaranfoundation.org
ARG AUTH_API_BASE_URL=https://api.nivaranfoundation.org
ARG NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=false
ARG NEXT_PUBLIC_SUPABASE_URL=
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=
ARG NEXT_PUBLIC_SQUARE_APP_ID=
ARG NEXT_PUBLIC_SQUARE_LOCATION_ID=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL \
    AUTH_API_BASE_URL=$AUTH_API_BASE_URL \
    NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=$NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS \
    NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
    NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
    NEXT_PUBLIC_SQUARE_APP_ID=$NEXT_PUBLIC_SQUARE_APP_ID \
    NEXT_PUBLIC_SQUARE_LOCATION_ID=$NEXT_PUBLIC_SQUARE_LOCATION_ID \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build


FROM node:20-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/src/blogs ./src/blogs
COPY --from=builder /app/src/content ./src/content
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/logs ./logs
COPY --from=builder /app/.global_news ./.global_news
COPY --from=builder /app/.nepal_news ./.nepal_news
COPY --from=builder /app/.env.automation ./.env.automation
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
