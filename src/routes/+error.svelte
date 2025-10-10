<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let errorCode: number;
	let errorMessage: string;
	let isOffline = false;

	$: {
		errorCode = ($page.error as any)?.status || 500;
		errorMessage = $page.error?.message || 'An unexpected error occurred';
	}

	onMount(() => {
		// Check if user is offline
		isOffline = !navigator.onLine;

		// Listen for online/offline events
		const handleOnline = () => {
			isOffline = false;
		};
		const handleOffline = () => {
			isOffline = true;
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	});

	function goBack() {
		if (typeof window !== 'undefined' && window.history.length > 1) {
			window.history.back();
		} else {
			window.location.href = '/';
		}
	}

	function reload() {
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
	}
</script>

<SEO
	title={errorCode === 404 ? 'Fant ikke siden' : 'Feil'}
	description={errorCode === 404 
		? 'Vi funner ikke siden du leter etter.' 
		: 'Det oppsto en feil ved lasting av siden.'}
/>

<main class="error-page" aria-labelledby="error-heading">
	<div class="error-container">
		<div class="error-content">
			<!-- Error Icon -->
			<div class="error-icon" aria-hidden="true">
				{#if errorCode === 404}
					<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>
					</svg>
				{:else}
					<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
					</svg>
				{/if}
			</div>

			<!-- Error Heading -->
			<h1 id="error-heading" class="error-title">
				{#if errorCode === 404}
					Fant ikke siden
				{:else if isOffline}
					Du er ikke online
				{:else}
					Noe gikk galt
				{/if}
			</h1>

			<!-- Error Message -->
			<p class="error-message">
				{#if errorCode === 404}
					Siden du leter etter, finnes ikke eller er blitt flyttet.
				{:else if isOffline}
					Vennligst sjekk internettforbindelsen din og fors&oslash;k igjen.
				{:else}
					{errorMessage}
				{/if}
			</p>

			<!-- Offline Status -->
			{#if isOffline}
				<div class="offline-indicator" role="status" aria-live="polite">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 0 1 0 9Z"/>
						<path d="M22 22l-2-2"/>
					</svg>
					<span>Ingen internettforbindelse</span>
				</div>
			{/if}

			<!-- Action Buttons -->
			<div class="error-actions">
				<Button 
					variant="primary" 
					href="/"
					ariaLabel="Gå til forsiden"
				>
					G&aring; til forsiden
				</Button>
				
				<Button 
					variant="secondary" 
					on:click={goBack}
					ariaLabel="Go back to previous page"
				>
					G&aring; tilbake
				</Button>

				{#if isOffline || errorCode >= 500}
					<Button 
						variant="outline" 
						on:click={reload}
						ariaLabel="Forsøk igjen"
					>
						Fors&oslash;k igjen
					</Button>
				{/if}
			</div>

			<!-- Navigation Links -->
			<nav class="error-navigation" aria-label="Site navigation">
				<h2 class="sr-only">Rask navigasjon</h2>
				<ul class="nav-links">
					<li><a href="/" class="nav-link">Hjem</a></li>
					<li><a href="/tjenester" class="nav-link">Tjenester</a></li>
					<li><a href="/kontakt" class="nav-link">kontakt</a></li>
				</ul>
			</nav>
		</div>
	</div>
</main>

<style>
	.error-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-4);
		background: var(--color-background);
		color: var(--color-text);
	}

	.error-container {
		max-width: 600px;
		width: 100%;
		text-align: center;
	}

	.error-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-6);
	}

	.error-icon {
		color: var(--color-primary);
		opacity: 0.8;
	}

	.error-title {
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		margin: 0;
		color: var(--color-text);
	}

	.error-message {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		margin: 0;
		line-height: 1.6;
	}

	.offline-indicator {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3) var(--spacing-4);
		background: var(--color-warning-background);
		color: var(--color-warning-text);
		border: 1px solid var(--color-warning-border);
		border-radius: var(--border-radius-md);
		font-size: var(--font-size-sm);
	}

	.error-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-3);
		justify-content: center;
	}

	.error-navigation {
		border-top: 1px solid var(--color-border);
		padding-top: var(--spacing-6);
	}

	.nav-links {
		display: flex;
		justify-content: center;
		gap: var(--spacing-6);
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-link {
		color: var(--color-primary);
		text-decoration: none;
		font-weight: var(--font-weight-medium);
		transition: color 0.2s ease;
	}

	.nav-link:hover,
	.nav-link:focus {
		color: var(--color-primary-hover);
		text-decoration: underline;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* Responsive Design */
	@media (max-width: 640px) {
		.error-title {
			font-size: var(--font-size-3xl);
		}

		.error-actions {
			flex-direction: column;
			align-items: center;
		}

		.nav-links {
			flex-direction: column;
			gap: var(--spacing-3);
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.error-icon {
			opacity: 1;
		}
		
		.offline-indicator {
			border-width: 2px;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.nav-link {
			transition: none;
		}
	}
</style>