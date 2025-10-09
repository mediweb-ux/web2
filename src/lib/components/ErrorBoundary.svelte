<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Button from './ui/Button.svelte';

	export let fallback: string = 'Something went wrong';
	export let showDetails: boolean = false;
	export let onError: ((error: Error) => void) | null = null;

	let hasError = false;
	let errorMessage = '';
	let errorStack = '';
	let retryCount = 0;
	const maxRetries = 3;

	function handleError(error: Error | ErrorEvent) {
		hasError = true;
		
		if (error instanceof Error) {
			errorMessage = error.message;
			errorStack = error.stack || '';
		} else if (error instanceof ErrorEvent) {
			errorMessage = error.message;
			errorStack = error.error?.stack || '';
		} else {
			errorMessage = 'An unknown error occurred';
			errorStack = '';
		}

		// Call custom error handler if provided
		if (onError && error instanceof Error) {
			onError(error);
		}

		// Log error for debugging
		console.error('ErrorBoundary caught error:', error);
	}

	function retry() {
		if (retryCount < maxRetries) {
			hasError = false;
			errorMessage = '';
			errorStack = '';
			retryCount++;
		}
	}

	function reset() {
		hasError = false;
		errorMessage = '';
		errorStack = '';
		retryCount = 0;
	}

	onMount(() => {
		if (browser) {
			// Handle unhandled promise rejections
			const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
				handleError(new Error(event.reason));
				event.preventDefault();
			};

			// Handle JavaScript errors
			const handleJSError = (event: ErrorEvent) => {
				handleError(event);
			};

			window.addEventListener('unhandledrejection', handleUnhandledRejection);
			window.addEventListener('error', handleJSError);

			return () => {
				window.removeEventListener('unhandledrejection', handleUnhandledRejection);
				window.removeEventListener('error', handleJSError);
			};
		}
		return () => {}; // Return empty cleanup function for non-browser environments
	});
</script>

{#if hasError}
	<div class="error-boundary" role="alert" aria-live="assertive">
		<div class="error-content">
			<div class="error-icon" aria-hidden="true">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
				</svg>
			</div>
			
			<h2 class="error-title">Oops! Something went wrong</h2>
			
			<p class="error-message">
				{fallback}
			</p>

			{#if showDetails && errorMessage}
				<details class="error-details">
					<summary class="error-summary">Error Details</summary>
					<div class="error-info">
						<p><strong>Message:</strong> {errorMessage}</p>
						{#if errorStack}
							<pre class="error-stack"><code>{errorStack}</code></pre>
						{/if}
					</div>
				</details>
			{/if}

			<div class="error-actions">
				{#if retryCount < maxRetries}
					<Button 
						variant="primary" 
						on:click={retry}
						ariaLabel="Try again"
					>
						Try Again ({maxRetries - retryCount} attempts left)
					</Button>
				{/if}
				
				<Button 
					variant="secondary" 
					on:click={reset}
					ariaLabel="Reset error state"
				>
					Reset
				</Button>
				
				<Button 
					variant="outline" 
					href="/"
					ariaLabel="Go to homepage"
				>
					Go Home
				</Button>
			</div>

			<p class="error-help">
				If this problem persists, please 
				<a href="/contact" class="error-link">contact us</a> 
				for assistance.
			</p>
		</div>
	</div>
{:else}
	<slot />
{/if}

<style>
	.error-boundary {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 300px;
		padding: var(--spacing-6);
		background: var(--color-error-background, #fef2f2);
		border: 1px solid var(--color-error-border, #fecaca);
		border-radius: var(--border-radius-lg);
		margin: var(--spacing-4) 0;
	}

	.error-content {
		text-align: center;
		max-width: 500px;
		width: 100%;
	}

	.error-icon {
		color: var(--color-error, #dc2626);
		margin-bottom: var(--spacing-4);
	}

	.error-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-error, #dc2626);
		margin: 0 0 var(--spacing-3) 0;
	}

	.error-message {
		color: var(--color-text-secondary);
		margin: 0 0 var(--spacing-4) 0;
		line-height: 1.6;
	}

	.error-details {
		text-align: left;
		margin: var(--spacing-4) 0;
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius-md);
		background: var(--color-background);
	}

	.error-summary {
		padding: var(--spacing-3);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		background: var(--color-background-secondary);
		border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
	}

	.error-summary:hover {
		background: var(--color-background-hover);
	}

	.error-info {
		padding: var(--spacing-3);
		border-top: 1px solid var(--color-border);
	}

	.error-stack {
		background: var(--color-background-secondary);
		padding: var(--spacing-3);
		border-radius: var(--border-radius-sm);
		overflow-x: auto;
		font-size: var(--font-size-sm);
		margin-top: var(--spacing-2);
		max-height: 200px;
		overflow-y: auto;
	}

	.error-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-3);
		justify-content: center;
		margin: var(--spacing-4) 0;
	}

	.error-help {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		margin: var(--spacing-4) 0 0 0;
	}

	.error-link {
		color: var(--color-primary);
		text-decoration: none;
	}

	.error-link:hover,
	.error-link:focus {
		text-decoration: underline;
	}

	/* Responsive Design */
	@media (max-width: 640px) {
		.error-boundary {
			padding: var(--spacing-4);
		}

		.error-actions {
			flex-direction: column;
			align-items: center;
		}

		.error-stack {
			font-size: var(--font-size-xs);
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.error-boundary {
			border-width: 2px;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.error-summary:hover {
			background: var(--color-background-secondary);
		}
	}
</style>