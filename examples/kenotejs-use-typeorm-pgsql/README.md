# kenotejs-use-typeorm-pgsql

Use TypeORM to connect PostgreSQL in Kenote.js.

## Requirement

- Node.js >=14

## Features

- Kenote.js
- PostgreSQL
- TypeORM
- Typescript

## Initialization Data

```bash
psql -U postgres -f pgsql/install.sql
```

## Docker

```bash
# Start
docker-compose up -d
# Stop
docker-compose down
# Remove
docker-compose down -v
```