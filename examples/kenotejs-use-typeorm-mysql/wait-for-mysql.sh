#!/bin/bash

set -e
  
host="$1"
shift

until mysql -h"$host" -uroot -p"$MYSQL_ROOT_PASSWORD" kenotejs-use-typeorm -e 'exit'; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "MySQL is up - executing command"
exec "$@"