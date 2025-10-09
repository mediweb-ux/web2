<script lang="ts">
	import { theme, prefersReducedMotion } from '$lib/stores';
	import { onMount } from 'svelte';

	// Props
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let showLabel: boolean = false;
	
	// Allow custom classes to be passed in
	let className: string = '';
	export { className as class };

	// State
	let mounted = false;
	let isToggling = false;

	// Size classes
	const sizeClasses = {
		sm: 'w-8 h-8 text-sm',
		md: 'w-10 h-10 text-base',
		lg: 'w-12 h-12 text-lg'
	};

	// Initialize theme store on mount
	onMount(() => {
		const cleanup = theme.init();
		prefersReducedMotion.init();
		mounted = true;
		
		return cleanup;
	});

	// Handle theme toggle with animation
	async function handleToggle() {
		if (isToggling) return;
		
		isToggling = true;
		
		// Add a small delay if animations are enabled
		if (!$prefersReducedMotion) {
			await new Promise(resolve => setTimeout(resolve, 150));
		}
		
		theme.toggle();
		isToggling = false;
	}

	// Handle keyboard interaction
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleToggle();
		}
	}

	// Reactive label text
	$: currentTheme = $theme;
	$: toggleLabel = currentTheme === 'light' ? 'Endre til mørk modus' : 'Endre til lys modus';
	$: iconLabel = currentTheme === 'light' ? 'Mørk modus' : 'Lys modus';
</script>

<!-- Theme Toggle Button -->
<button
	type="button"
	class="theme-toggle {sizeClasses[size]} {className}"
	class:toggling={isToggling}
	aria-label={toggleLabel}
	title={toggleLabel}
	on:click={handleToggle}
	on:keydown={handleKeydown}
	disabled={!mounted || isToggling}
>
	<!-- Sun Icon (Light Mode) -->
	<svg
		class="sun-icon"
		class:visible={currentTheme === 'light'}
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="5" />
		<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
	</svg>

	<!-- Moon Icon (Dark Mode) -->
	<svg
		class="moon-icon"
		class:visible={currentTheme === 'dark'}
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>

	<!-- Loading indicator -->
	{#if isToggling}
		<div class="loading-spinner" aria-hidden="true">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
				<circle
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-dasharray="32"
					stroke-dashoffset="32"
				>
					<animate
						attributeName="stroke-dashoffset"
						values="32;0;32"
						dur="1s"
						repeatCount="indefinite"
					/>
				</circle>
			</svg>
		</div>
	{/if}

	<!-- Screen reader text -->
	<span class="sr-only">{iconLabel}</span>
</button>

<!-- Optional label -->
{#if showLabel}
	<span class="theme-label" id="theme-label-{Math.random().toString(36).substring(2, 11)}">
		{currentTheme === 'light' ? 'Light' : 'Dark'} mode
	</span>
{/if}

<style>
	.theme-toggle {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid hsl(var(--border));
		border-radius: var(--radius-lg);
		background-color: hsl(var(--background));
		color: hsl(var(--foreground));
		cursor: pointer;
		transition: all 0.2s ease;
		overflow: hidden;
	}

	.theme-toggle:hover {
		background-color: hsl(var(--accent));
		border-color: hsl(var(--primary));
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid hsl(var(--ring));
		outline-offset: 2px;
	}

	.theme-toggle:active {
		transform: translateY(0);
		box-shadow: var(--shadow-sm);
	}

	.theme-toggle:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	.theme-toggle:disabled:hover {
		background-color: hsl(var(--background));
		border-color: hsl(var(--border));
		transform: none;
		box-shadow: none;
	}

	/* Icon animations */
	.sun-icon,
	.moon-icon {
		position: absolute;
		opacity: 0;
		transform: scale(0.8) rotate(-90deg);
		transition: all 0.3s ease;
	}

	.sun-icon.visible,
	.moon-icon.visible {
		opacity: 1;
		transform: scale(1) rotate(0deg);
	}

	.sun-icon.visible {
		color: rgb(251 191 36); /* yellow-400 */
	}

	.moon-icon.visible {
		color: rgb(147 197 253); /* blue-300 */
	}

	/* Loading spinner */
	.loading-spinner {
		position: absolute;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.toggling .loading-spinner {
		opacity: 1;
	}

	.toggling .sun-icon,
	.toggling .moon-icon {
		opacity: 0;
	}

	/* Label styling */
	.theme-label {
		margin-left: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: hsl(var(--muted-foreground));
		font-weight: 500;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.theme-toggle,
		.sun-icon,
		.moon-icon,
		.loading-spinner {
			transition: none;
		}

		.theme-toggle:hover {
			transform: none;
		}

		.sun-icon,
		.moon-icon {
			transform: scale(1) rotate(0deg);
		}

		.sun-icon:not(.visible),
		.moon-icon:not(.visible) {
			transform: scale(1) rotate(0deg);
			opacity: 0;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.theme-toggle {
			border-width: 2px;
		}

		.sun-icon.visible,
		.moon-icon.visible {
			color: hsl(var(--foreground));
		}
	}
</style>