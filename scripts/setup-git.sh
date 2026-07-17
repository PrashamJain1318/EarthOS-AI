#!/bin/bash
# Initialize local repository inside workspace
git init

# Set default identity if not set (for testing environment safety)
if [ -z "$(git config user.name)" ]; then
  git config user.name "EARTHOS AI Architect"
  git config user.email "architect@earthos.ai"
fi

# Setup base branches
git checkout -b main
git add .
git commit -m "chore: initial commit - complete engineering foundation"
git checkout -b development

# Output confirmation details
echo "🚀 Git Repository successfully initialized inside workspace."
echo "Active Branch: development"
echo "Main and development branches configured."
