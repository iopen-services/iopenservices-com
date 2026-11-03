#!/usr/bin/env bash
set -e

CONTAINER="iopenservices-com-postgres-1"
DB_USER="appuser"
DB_NAME="iopenservices-com"
DEFAULT_DUMP=".data/1793153453-ios-payload_content.sql"

DUMP_FILE="${1:-$DEFAULT_DUMP}"

if [ ! -f "$DUMP_FILE" ]; then
  echo "Error: Backup file not found at: $DUMP_FILE"
  exit 1
fi

echo "==> Restoring database '$DB_NAME' in container '$CONTAINER'..."
echo "==> Using dump file: $DUMP_FILE"

# Terminate open connections from dev servers
docker exec "$CONTAINER" psql -U "$DB_USER" -d template1 -c "
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = '$DB_NAME' AND pid <> pg_backend_pid();
" > /dev/null 2>&1 || true

# 1. Drop existing database
echo "==> Dropping existing database..."
docker exec "$CONTAINER" psql -U "$DB_USER" -d template1 -c "DROP DATABASE \"$DB_NAME\" WITH (FORCE);"

# 2. Re-create clean database
echo "==> Creating clean database..."
docker exec "$CONTAINER" psql -U "$DB_USER" -d template1 -c "CREATE DATABASE \"$DB_NAME\";"

# 3. Stream backup file into the fresh database
echo "==> Importing dump data..."
docker exec -i "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" < "$DUMP_FILE" > /dev/null

# 4. Bring schema in sync with migrations
echo "==> Ensuring migrations are applied..."
pnpm payload migrate || true

echo "==> Database restore completed successfully!"