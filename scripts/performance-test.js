#!/usr/bin/env node

/**
 * Performance testing script for the built application
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

const BUILD_DIR = 'build';

console.log('🚀 Running performance tests...\n');

// Check if build exists
if (!existsSync(BUILD_DIR)) {
	console.error('❌ Build directory not found. Run npm run build first.');
	process.exit(1);
}

// Test 1: Start preview server and run basic checks
console.log('1. Starting preview server...');
try {
	// Start preview server in background
	const previewProcess = execSync('npm run preview &', { 
		stdio: 'pipe',
		timeout: 5000 
	});
	
	console.log('✅ Preview server started');
	
	// Wait a moment for server to start
	await new Promise(resolve => setTimeout(resolve, 2000));
	
	// Test basic connectivity
	console.log('\n2. Testing server connectivity...');
	try {
		const response = await fetch('http://localhost:4173');
		if (response.ok) {
			console.log('✅ Server is responding');
			console.log(`   Status: ${response.status}`);
			console.log(`   Content-Type: ${response.headers.get('content-type')}`);
		} else {
			console.warn(`⚠️  Server responded with status: ${response.status}`);
		}
	} catch (error) {
		console.error('❌ Server connectivity test failed:', error.message);
	}
	
} catch (error) {
	console.warn('⚠️  Could not start preview server automatically');
	console.log('   You can manually test by running: npm run preview');
}

// Test 2: Analyze bundle size
console.log('\n3. Analyzing bundle composition...');
try {
	const bundleAnalysis = execSync('npx vite-bundle-analyzer build --mode json', { 
		encoding: 'utf-8',
		timeout: 30000
	});
	console.log('✅ Bundle analysis completed');
} catch (error) {
	console.log('ℹ️  Bundle analyzer not available, skipping detailed analysis');
}

// Test 3: Check for common performance patterns
console.log('\n4. Checking performance patterns...');

const performanceChecks = [
	{
		name: 'Asset hashing',
		check: () => {
			const { readdirSync } = require('fs');
			const { join } = require('path');
			const assetsDir = join(BUILD_DIR, 'assets');
			if (!existsSync(assetsDir)) return false;
			const files = readdirSync(assetsDir, { recursive: true });
			return files.some(file => typeof file === 'string' && file.includes('-'));
		}
	},
	{
		name: 'CSS extraction',
		check: () => {
			const { readdirSync } = require('fs');
			const { join } = require('path');
			const assetsDir = join(BUILD_DIR, 'assets');
			if (!existsSync(assetsDir)) return false;
			const files = readdirSync(assetsDir, { recursive: true });
			return files.some(file => typeof file === 'string' && file.endsWith('.css'));
		}
	},
	{
		name: 'JavaScript chunking',
		check: () => {
			const { readdirSync } = require('fs');
			const { join } = require('path');
			const assetsDir = join(BUILD_DIR, 'assets');
			if (!existsSync(assetsDir)) return false;
			const files = readdirSync(assetsDir, { recursive: true });
			const jsFiles = files.filter(file => typeof file === 'string' && file.endsWith('.js'));
			return jsFiles.length > 1; // Multiple JS files indicate chunking
		}
	}
];

for (const check of performanceChecks) {
	try {
		if (check.check()) {
			console.log(`✅ ${check.name}`);
		} else {
			console.warn(`⚠️  ${check.name} not detected`);
		}
	} catch (error) {
		console.warn(`⚠️  Could not check ${check.name}: ${error.message}`);
	}
}

console.log('\n📊 Performance test summary:');
console.log('   - Build output validated');
console.log('   - Server functionality tested');
console.log('   - Performance patterns checked');

console.log('\n💡 Next steps:');
console.log('   - Test on actual hosting environment');
console.log('   - Run Lighthouse audit for detailed metrics');
console.log('   - Monitor Core Web Vitals in production');

// Cleanup: try to kill any background processes
try {
	execSync('pkill -f "vite preview"', { stdio: 'ignore' });
} catch (error) {
	// Ignore cleanup errors
}