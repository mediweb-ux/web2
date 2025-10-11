import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import a11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	{
		files: ['**/*.{js,ts}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module'
			},
			globals: {
				process: 'readonly',
				require: 'readonly',
				module: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				console: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': ts
		},
		rules: {
			...ts.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-empty-object-type': 'off'
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.svelte']
			}
		},
		plugins: {
			svelte,
			'jsx-a11y': a11y
		},
		rules: {
			...svelte.configs.recommended.rules,
			...a11y.configs.recommended.rules,
			// Accessibility rules
			'jsx-a11y/alt-text': 'error',
			'jsx-a11y/anchor-has-content': 'error',
			'jsx-a11y/anchor-is-valid': 'error',
			'jsx-a11y/aria-props': 'error',
			'jsx-a11y/aria-proptypes': 'error',
			'jsx-a11y/aria-unsupported-elements': 'error',
			'jsx-a11y/click-events-have-key-events': 'error',
			'jsx-a11y/heading-has-content': 'error',
			'jsx-a11y/html-has-lang': 'error',
			'jsx-a11y/img-redundant-alt': 'error',
			'jsx-a11y/interactive-supports-focus': 'error',
			'jsx-a11y/label-has-associated-control': 'error',
			'jsx-a11y/no-redundant-roles': 'error',
			'jsx-a11y/role-has-required-aria-props': 'error',
			'jsx-a11y/role-supports-aria-props': 'error',
			// Svelte specific rules
			'svelte/no-at-html-tags': 'error',
			'svelte/no-target-blank': 'error',
			'svelte/no-unused-svelte-ignore': 'error',
			'svelte/prefer-class-directive': 'error',
			'svelte/prefer-style-directive': 'error',
			'svelte/require-store-reactive-access': 'error',
			'svelte/valid-compile': 'error'
		}
	},
	prettier,
	{
		ignores: [
			'.DS_Store',
			'node_modules/**',
			'build/**',
			'.svelte-kit/**',
			'package/**',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock',
			'dist/**',
			'coverage/**'
		]
	}
];
