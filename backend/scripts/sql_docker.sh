#!/bin/bash

set -e

# Load environment variables from the .env file
export $(grep -v '^#' .env | xargs)

case "$1" in
  up)
    echo "****************** Configuration **************************"
    cat .env

    echo "Starting SQL Server docker container..."

    docker run -d \
      --name sql-server-container \
      -e "ACCEPT_EULA=Y" \
      -e "SA_PASSWORD=$DB_PASSWORD" \
      -p $DB_PORT:1433 \
      --restart always \
      mcr.microsoft.com/mssql/server:latest

    echo "✅ SQL Server container started."
    
    echo "Waiting for SQL Server to initialize..."
    # Wait for SQL Server to be ready
    until docker exec sql-server-container /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$DB_PASSWORD" -Q "SELECT 1" &>/dev/null; do
      echo "Waiting for SQL Server to become available..."
      sleep 5
    done

    echo "✅ SQL Server is ready to accept connections."
    ;;  

  down)
    echo "Stopping and removing SQL Server docker container..."
    docker stop sql-server-container || true
    docker rm sql-server-container || true
    echo "✅ SQL Server container removed."
    ;;
  
  restart)
    echo "Restarting SQL Server container..."
    $0 down
    $0 up
    ;;
  
  *)
    echo "Usage: $0 {up|down|restart}"
    exit 1
    ;;
esac
