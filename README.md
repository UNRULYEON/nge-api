# nge-api

An API that serves information about Neon Genesis Evangelion

## 📦 Getting started

### Prerequisites

- [Deno](https://docs.deno.com/runtime/fundamentals/installation/#download-and-install) (^2.0.0)

Copy `.env.example` → `.env` and update `DATABASE_URL` with a valid URL pointing to your local Postgres instance:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

Install dependencies with:

```bash
deno install
```

Generate Prisma schema with:

```bash
deno run db:generate
```

### Editors

#### VS Code

It's recommended to use enable Deno and use their formatter:

```json
// .vscode/settings.json

{
  "deno.enable": true,
  "editor.formatOnSave": true,
  "[typescript]": { "editor.defaultFormatter": "denoland.vscode-deno" }
}
```

## 🥑 Usage

Run the API:

```zsh
deno run dev
```

## 💻 Project commands

| Command | Description                |
| ------- | -------------------------- |
| dev     | Runs the API in watch mode |
