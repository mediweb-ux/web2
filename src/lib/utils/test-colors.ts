import { testDesignSystemColors } from './color-contrast';

// Test and log color contrast ratios
console.log('=== Design System Color Contrast Report ===');
const results = testDesignSystemColors();

Object.entries(results).forEach(([key, result]) => {
	const status = result.passes ? '✅ PASS' : '❌ FAIL';
	console.log(`${key}: ${result.ratio.toFixed(2)}:1 ${status}`);
});

console.log('\n=== WCAG Standards ===');
console.log('AA Normal Text: 4.5:1 minimum');
console.log('AA Large Text: 3:1 minimum');
console.log('AAA Normal Text: 7:1 minimum');
console.log('AAA Large Text: 4.5:1 minimum');