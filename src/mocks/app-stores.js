// Mock for $app/stores to provide SvelteKit store functionality in tests
import { writable, readable } from 'svelte/store';

// Mock page store
export const page = readable({
	url: new URL('http://localhost:3000/'),
	params: {},
	route: { id: null },
	status: 200,
	error: null,
	data: {},
	form: null
});

// Mock navigating store
export const navigating = readable(null);

// Mock updated store
export const updated = readable(false);