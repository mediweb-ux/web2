#!/usr/bin/env node

/**
 * Deployment verification script
 * Checks if the project is ready for deployment
 */

import fs from 'fs';
import { execSync } from 'child_process';

/**
 * Main verification function
 */
function verifyDeployment() {
	console.log('🔍 Verifying deployment readiness...\n');

	// Check if package-lock.json exists
	if (!fs.existsSync('package-lock.json')) {
		console.error('❌ package-lock.json not found. Run "npm install" first.');
		process.exit(1);
	}

	// Check if package.json and package-lock.json are in sync
	try {
		console.log('📦 Checking package-lock.json sync...');
		execSync('npm ci --dry-run', { stdio: 'pipe' });
		console.log('✅ package-lock.json is in sync');
	} catch {
		console.error('❌ package-lock.json is out of sync. Run "npm install" to fix.');
		process.exit(1);
	}

	// Test build
	try {
		console.log('🏗️  Testing build...');
		execSync('npm run build', { stdio: 'pipe' });
		console.log('✅ Build successful');
	} catch (buildError) {
		console.error('❌ Build failed:', buildError.message);
		process.exit(1);
	}

	// Check if build directory exists
	if (!fs.existsSync('build')) {
		console.error('❌ Build directory not found');
		process.exit(1);
	}

	console.log('\n🎉 Project is ready for deployment!');
	console.log('� Deplocyment checklist:');
	console.log('  ✅ Dependencies are installed and synced');
	console.log('  ✅ Build completes successfully');
	console.log('  ✅ Build artifacts are generated');
	console.log('\n🚀 You can now deploy to your hosting platform.');
}

// Run the verification
verifyDeployment();
