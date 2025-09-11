#!/bin/bash

# This script clones the flood forecasting app repository for Docker deployment

# Check if git is installed
if ! [ -x "$(command -v git)" ]; then
  echo 'Error: git is not installed.' >&2
  exit 1
fi

# Create directory for the flood forecasting app
mkdir -p flood-forecast-app

# Clone the repository (replace with your actual repo URL)
echo "Cloning flood forecasting app repository..."
git clone https://github.com/yourusername/flood-forecast-app.git flood-forecast-app

echo "Setup complete! The flood forecasting app has been cloned."
echo "Using the existing Dockerfile from the repository for deployment."