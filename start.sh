#!/bin/bash

function start_projects() {
    for dir in $1/*; do
        if [ -d "$dir" ]; then
            echo "Starting npm project in $dir"
            (cd "$dir" && npm start &)
        fi
    done
}

# Start backend services
echo "Starting backend services..."
start_projects "./be"

# Start frontend apps
echo "Starting frontend apps..."
start_projects "./fe"
