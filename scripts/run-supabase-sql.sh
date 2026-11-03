#!/usr/bin/env bash
set -e

CONTAINER="iopenservices-com-postgres-1"
DB_USER="postgres"
DB_HOST="aws-0-us-east-2.pooler.supabase.com"
DB_PORT="6543"
DB_NAME="postgres"
SUPABASE_PROJECT_REF="qihrxttlpnnruldoogwy"

# Ensure the container is available
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
  echo "Error: Docker container '${CONTAINER}' is not running."
  exit 1
fi

# 1. Prompt for password if not already set in session
if [ -z "$DB_PASS" ]; then
  read -s -p "Enter Supabase DB Password: " DB_PASS
  echo ""
fi

if [ -z "$DB_PASS" ]; then
  echo "Error: Database password cannot be empty."
  exit 1
fi

DATABASE_URI="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?options=reference%3D${SUPABASE_PROJECT_REF}"

# 2. Determine SQL source (argument, piped stdin, or fallback to schema inspection query)
DEFAULT_SQL="
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'media' 
  AND column_name IN ('prefix', '_objectkey', 'objectkey', '_object_key');
"

if [ -n "$1" ]; then
  SQL_INPUT="$1"
elif [ ! -t 0 ]; then
  # Read from stdin if piped
  SQL_INPUT=$(cat)
else
  echo "==> No SQL provided. Running default media column verification query..."
  SQL_INPUT="$DEFAULT_SQL"
fi

# 3. Execute query via Docker psql
echo "==> Executing SQL on Supabase via container '${CONTAINER}'..."
docker exec -i "$CONTAINER" psql "$DATABASE_URI" -c "$SQL_INPUT"