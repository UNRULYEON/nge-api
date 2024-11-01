# nge-api

An API that serves information about Neon Genesis Evangelion

## 📦 Getting started

This section explains how to get started with the devcontainer which is the recommended way to develop.

### Prerequisites

- [Docker](https://www.docker.com)

Open the command pallete (<kbd>cmd</kbd>/<kbd>ctrl</kbd> + <kbd>p</kbd>) and type `Dev Containers: Reopen in Container`.

Copy `.env.example` → `.env` and update `DO_ACCESS_KEY` and `DO_SECRET_KEY`.

Install dependencies with:

```bash
pnpm install
```

Generate Prisma schema with:

```bash
pnpm run db:generate
```

Create tables in the database if they don't exist:

```bash
pnpm run db:push
```

Seeds the database with data:

```bash
pnpm run db:seed
```

## 🥑 Usage

Run the API:

```zsh
pnpm run dev
```

## 💻 Project commands

| Command       | Description                                                                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dev           | Runs the API in watch mode                                                                                                                                  |
| start         | Runs the API in production                                                                                                                                  |
| test          | Runs unit tests                                                                                                                                             |
| test:ui       | Runs unit tests with the UI                                                                                                                                 |
| test:coverage | Generate unit test coverage report                                                                                                                          |
| start         | Runs the API in production                                                                                                                                  |
| db:seed       | Seeds the database                                                                                                                                          |
| db:migrate    | Generate a migration                                                                                                                                        |
| db:generate   | Generates client-side DB types                                                                                                                              |
| db:push       | Pushes the state of the Prisma schema to the database without using migrations. It creates the database if the database does not exist                      |
| db:pull       | The `db pull` command connects to your database and adds Prisma models to your Prisma schema that reflect the current database schema                       |
| db:reset      | Drops the database and applies the migrations                                                                                                               |
| db:deploy     | The `migrate deploy` command applies all pending migrations, and creates the database if it does not exist. Primarily used in non-development environments. |
| format:check  | Runs prettier and checks if all files are formattted correctly                                                                                              |
| format:fix    | Runs prettier and formats files if possible                                                                                                                 |
