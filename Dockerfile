FROM oven/bun:1 AS build

WORKDIR /app

COPY package.json bun.lock bunfig.toml tsconfig.json ./

RUN bun install --frozen-lockfile

COPY src ./src
COPY public ./public

ENV NODE_ENV=production

RUN bun run build

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000
