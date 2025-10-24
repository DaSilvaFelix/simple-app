#!/bin/sh
until nc -z "$1" "$2"; do
  echo "⏳ Esperando a $1:$2..."
  sleep 1
done

echo "✅ PostgreSQL disponible en $1:$2"
exec "$3" "$4" "$5"