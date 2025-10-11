// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

/// <reference types="svelte" />

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace svelteHTML {
		// Allow any HTML attributes on any element
		interface IntrinsicElements {
			[elemName: string]: any;
		}
	}
}

export {};
