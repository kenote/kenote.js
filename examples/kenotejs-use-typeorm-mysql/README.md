# kenotejs-use-typeorm-mysql

Use TypeORM to connect MySQL in Kenote.js.

## Requirement

- Node.js >=14

## Features

- Kenote.js
- MySQL 8.0
- TypeORM
- Typescript

## Initialization Data

```bash
mysql -uroot -p${MYSQL_ROOT_PASSWORD} < install.sql 
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