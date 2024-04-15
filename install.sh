#!/bin/bash

function install_packages() {
    for dir in $1/*; do
        if [ -d "$dir" ]; then
            echo "Installing npm packages in $dir"
            (cd "$dir" && npm install)
        fi
    done
}

# Install packages in backend services
echo "Installing packages in backend services..."
install_packages "./be"

# Install packages in frontend apps
echo "Installing packages in frontend apps..."
install_packages "./fe"
