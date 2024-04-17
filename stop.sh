#!/bin/bash

ports=(3000 3001 8080 8081)

for port in "${ports[@]}"; do
    echo "Checking for processes on port $port..."
    PID=$(lsof -t -i tcp:$port)

    # If a PID is found, ask if the user wants to kill the process
    if [ ! -z "$PID" ]; then
        echo "Found process $PID on port $port."
        echo "Do you want to kill the process? (y/n)"
        read answer
        if [ "$answer" = "y" ]; then
            kill $PID
            echo "Process $PID has been killed."
        else
            echo "Process not killed."
        fi
    else
        echo "No process found on port $port."
    fi
done

echo "Operation completed."
