#!/bin/bash

set -e

export $(grep -v '^#' .env | xargs)

case "$1" in
  up)
    echo "****************** Configuration **************************"
    cat .env
    # Check if network exists, create if missing
    if ! docker network ls | grep -q "tasknet"; then
        echo "Network 'tasknet' not found. Creating..."
        docker network create tasknet
    fi

    echo "Starting SQL Server docker container..."

    docker run -d \
      --name sql-server-container \
      -e "ACCEPT_EULA=Y" \
      -e "SA_PASSWORD=$DB_PASSWORD" \
      -e "MSSQL_PID=Developer" \
      -p $DB_PORT:1433 \
      --network tasknet \
      --restart always \
      mcr.microsoft.com/mssql/server:latest

    echo "✅ SQL Server container started."
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
