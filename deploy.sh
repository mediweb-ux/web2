#!/bin/bash

# MediWeb Solutions Deployment Script
# This script builds the project and prepares it for deployment

set -e  # Exit on any error

echo "🚀 Starting MediWeb Solutions deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm ci --production=false

echo "🧪 Running tests..."
npm run test

echo "🔍 Linting code..."
npm run lint

echo "🏗️  Building for production..."
npm run build

echo "📊 Build size analysis..."
du -sh build/

echo "✅ Build completed successfully!"
echo "📁 Built files are in the 'build/' directory"
echo ""
echo "🚀 To deploy to your VPS:"
echo "1. Upload the 'build/' directory to your web server"
echo "2. Point your web server to serve files from the 'build/' directory"
echo "3. Ensure your web server is configured for SPA routing (fallback to index.html)"
echo ""
echo "🎉 Deployment ready!"