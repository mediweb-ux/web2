#!/usr/bin/env node

/**
 * Build testing script to verify build output functionality and performance
 */

import { execSync } from 'child_process';
import { existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

const BUILD_DIR = 'build';
const REQUIRED_FILES = [
	'index.html',
	'robots.txt',
	'manifest.json'
];

const REQUIRED_DIRECTORIES = [
	'_app'
];

console.log('🔍 Testing build output...\n');

// Test 1: Check if build directory exists
console.log('1. Checking build directory...');
if (!existsSync(BUILD_DIR)) {
	console.error('❌ Build directory does not exist');
	process.exit(1);
}
console.log('✅ Build directory exists');

// Test 2: Check required files
console.log('\n2. Checking required files...');
for (const file of REQUIRED_FILES) {
	const filePath = join(BUILD_DIR, file);
	if (!existsSync(filePath)) {
		console.error(`❌ Required file missing: ${file}`);
		process.exit(1);
	}
	console.log(`✅ ${file} exists`);
}

// Test 3: Check required directories
console.log('\n3. Checking required directories...');
for (const dir of REQUIRED_DIRECTORIES) {
	const dirPath = join(BUILD_DIR, dir);
	if (!existsSync(dirPath)) {
		console.error(`❌ Required directory missing: ${dir}`);
		process.exit(1);
	}
	console.log(`✅ ${dir} directory exists`);
}

// Test 4: Check asset hashing
console.log('\n4. Checking asset hashing...');
const assetsDir = join(BUILD_DIR, '_app');
const assetFiles = readdirSync(assetsDir, { recursive: true });
const hashedFiles = assetFiles.filter(file => 
	typeof file === 'string' && file.includes('-') && 
	(file.endsWith('.js') || file.endsWith('.css'))
);

if (hashedFiles.length === 0) {
	console.warn('⚠️  No hashed assets found - this may affect caching');
} else {
	console.log(`✅ Found ${hashedFiles.length} hashed asset files`);
}

// Test 5: Check file sizes
console.log('\n5. Checking file sizes...');
const indexPath = join(BUILD_DIR, 'index.html');
const indexSize = statSync(indexPath).size;
console.log(`📄 index.html: ${(indexSize / 1024).toFixed(2)} KB`);

if (indexSize > 50 * 1024) { // 50KB
	console.warn('⚠️  index.html is quite large, consider optimization');
}

// Calculate total build size
let totalSize = 0;
function calculateSize(dir) {
	const files = readdirSync(dir, { withFileTypes: true });
	for (const file of files) {
		const filePath = join(dir, file.name);
		if (file.isDirectory()) {
			calculateSize(filePath);
		} else {
			totalSize += statSync(filePath).size;
		}
	}
}

calculateSize(BUILD_DIR);
console.log(`📦 Total build size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

// Test 6: Check HTML structure
console.log('\n6. Checking HTML structure...');
try {
	const { readFileSync } = await import('fs');
	const indexContent = readFileSync(indexPath, 'utf-8');
	
	// Check for essential HTML elements
	const checks = [
		{ name: 'DOCTYPE', pattern: /<!DOCTYPE html>/i },
		{ name: 'HTML lang attribute', pattern: /<html[^>]+lang=/i },
		{ name: 'Meta charset', pattern: /<meta[^>]+charset=/i },
		{ name: 'Meta viewport', pattern: /<meta[^>]+viewport=/i },
		{ name: 'Title tag', pattern: /<title>/i },
		{ name: 'Meta description', pattern: /<meta[^>]+description=/i }
	];
	
	for (const check of checks) {
		if (check.pattern.test(indexContent)) {
			console.log(`✅ ${check.name} found`);
		} else {
			console.warn(`⚠️  ${check.name} missing or malformed`);
		}
	}
} catch (error) {
	console.error('❌ Error reading index.html:', error.message);
}

// Test 7: Check for common performance issues
console.log('\n7. Checking for performance issues...');

// Check for uncompressed assets
const largeFiles = [];
function checkFileSize(dir) {
	const files = readdirSync(dir, { withFileTypes: true });
	for (const file of files) {
		const filePath = join(dir, file.name);
		if (file.isDirectory()) {
			checkFileSize(filePath);
		} else {
			const size = statSync(filePath).size;
			if (size > 500 * 1024) { // 500KB
				largeFiles.push({ path: filePath, size });
			}
		}
	}
}

checkFileSize(BUILD_DIR);

if (largeFiles.length > 0) {
	console.warn('⚠️  Large files detected (>500KB):');
	largeFiles.forEach(file => {
		console.warn(`   ${file.path}: ${(file.size / 1024).toFixed(2)} KB`);
	});
} else {
	console.log('✅ No unusually large files detected');
}

console.log('\n🎉 Build output test completed!');
console.log('\n📋 Summary:');
console.log(`   Build directory: ${BUILD_DIR}`);
console.log(`   Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Asset files: ${assetFiles.length}`);
console.log(`   Hashed files: ${hashedFiles.length}`);

if (largeFiles.length > 0) {
	console.log('\n💡 Recommendations:');
	console.log('   - Consider code splitting for large JavaScript files');
	console.log('   - Optimize images and use modern formats (WebP, AVIF)');
	console.log('   - Enable compression on your hosting provider');
}