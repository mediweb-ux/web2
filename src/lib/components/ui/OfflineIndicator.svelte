<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { isOnline, initOfflineDetection } from '$lib/utils/offline-detection';
	import { slide } from 'svelte/transition';

	let cleanup: (() => void) | undefined;
	let wasOffline = false;
	let showReconnected = false;

	// Subscribe to online status
	$: if ($isOnline && wasOffline) {
		// Show "reconnected" message briefly
		showReconnected = true;
		setTimeout(() => {
			showReconnected = false;
		}, 3000);
		wasOffline = false;
	} else if (!$isOnline) {
		wasOffline = true;
		showReconnected = false;
	}

	onMount(() => {
		cleanup = initOfflineDetection();
	});

	onDestroy(() => {
		if (cleanup) {
			cleanup();
		}
	});
</script>

{#if !$isOnline || showReconnected}
	<div 
		class="offline-indicator"
		class:offline={!$isOnline}
		class:reconnected={showReconnected}
		role="status"
		aria-live="polite"
		transition:slide={{ duration: 300 }}
	>
		<div class="indicator-content">
			<div class="indicator-icon" aria-hidden="true">
				{#if !$isOnline}
					<!-- Offline icon -->
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 0 1 0 9Z"/>
						<path d="M22 22l-2-2"/>
					</svg>
				{:else}
					<!-- Online icon -->
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 12l2 2 4-4"/>
						<path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
						<path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
						<path d="M15 12c0-2-2-3-3-3s-3 1-3 3"/>
					</svg>
				{/if}
			</div>
			
			<div class="indicator-text">
				{#if !$isOnline}
					<span class="status-text">You're offline</span>
					<span class="status-description">Some features may not work properly</span>
				{:else if showReconnected}
					<span class="status-text">Back online</span>
					<span class="status-description">Connection restored</span>
				{/if}
			</div>

			{#if !$isOnline}
				<button 
					class="retry-button"
					on:click={() => window.location.reload()}
					aria-label="Retry connection"
					type="button"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
						<path d="M21 3v5h-5"/>
						<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
						<path d="M3 21v-5h5"/>
					</svg>
					<span class="sr-only">Retry</span>
				</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	.offline-indicator {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		padding: var(--spacing-3) var(--spacing-4);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		text-align: center;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.offline-indicator.offline {
		background: var(--color-warning-background, #fef3c7);
		color: var(--color-warning-text, #92400e);
		border-bottom: 1px solid var(--color-warning-border, #fcd34d);
	}

	.offline-indicator.reconnected {
		background: var(--color-success-background, #d1fae5);
		color: var(--color-success-text, #065f46);
		border-bottom: 1px solid var(--color-success-border, #a7f3d0);
	}

	.indicator-content {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-3);
		max-width: 1200px;
		margin: 0 auto;
	}

	.indicator-icon {
		flex-shrink: 0;
	}

	.indicator-text {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
		text-align: left;
	}

	.status-text {
		font-weight: var(--font-weight-semibold);
	}

	.status-description {
		font-size: var(--font-size-xs);
		opacity: 0.8;
	}

	.retry-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-2);
		background: transparent;
		border: 1px solid currentColor;
		border-radius: var(--border-radius-sm);
		color: inherit;
		cursor: pointer;
		transition: background-color 0.2s ease;
		flex-shrink: 0;
	}

	.retry-button:hover {
		background: rgba(0, 0, 0, 0.1);
	}

	.retry-button:focus {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
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

	/* Mobile responsive */
	@media (max-width: 640px) {
		.offline-indicator {
			padding: var(--spacing-2) var(--spacing-3);
		}

		.indicator-content {
			gap: var(--spacing-2);
		}

		.indicator-text {
			gap: 0;
		}

		.status-description {
			display: none;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.offline-indicator {
			border-bottom-width: 2px;
		}
		
		.retry-button {
			border-width: 2px;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.retry-button {
			transition: none;
		}
	}
</style>