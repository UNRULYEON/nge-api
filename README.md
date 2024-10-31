# nge-api

An API that serves information about Neon Genesis Evangelion

## 📦 Getting started

This section explains how to get started with the devcontainer which is the recommended way to develop.

### Prerequisites

- [Docker](https://www.docker.com)

Open the command pallete (<kbd>cmd</kbd>/<kbd>ctrl</kbd> + <kbd>p</kbd>) and type `Dev Containers: Reopen in Container`.

Copy `.env.example` → `.env`.

Next, go to your browser and open `http://localhost:9001`. Log in with the credentials for MinIO and create an access key (more info [here](https://min.io/docs/minio/linux/administration/console/security-and-access.html#id1)). Copy the Access Key and Secret Key and update `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY` in `.env`. Finally, create a bucket with the name `nge-api` (more info [here](https://min.io/docs/minio/linux/administration/console/managing-objects.html#creating-buckets)).

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

| Command      | Description                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dev          | Runs the API in watch mode                                                                                                                                  |
| start        | Runs the API in production                                                                                                                                  |
| db:seed      | Seeds the database                                                                                                                                          |
| db:generate  | Generates client-side DB types                                                                                                                              |
| db:push      | Pushes the state of the Prisma schema to the database without using migrations. It creates the database if the database does not exist                      |
| db:pull      | The `db pull` command connects to your database and adds Prisma models to your Prisma schema that reflect the current database schema                       |
| db:reset     | Drops the database and applies the migrations                                                                                                               |
| db:deploy    | The `migrate deploy` command applies all pending migrations, and creates the database if it does not exist. Primarily used in non-development environments. |
| format:check | Runs prettier and checks if all files are formattted correctly                                                                                              |
| format:fix   | Runs prettier and formats files if possible                                                                                                                 |
