<script lang="ts">
	import { theme, prefersReducedMotion } from '$lib/stores';
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

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
	<!-- Theme Icon -->
	{#if currentTheme === 'light'}
		<Icon
			name="sun"
			size="md"
			class="theme-icon sun-icon"
			ariaHidden={true}
		/>
	{:else}
		<Icon
			name="moon"
			size="md"
			class="theme-icon moon-icon"
			ariaHidden={true}
		/>
	{/if}

	<!-- Loading indicator -->
	{#if isToggling}
		<Icon
			name="loading"
			size="sm"
			class="loading-spinner"
			ariaHidden={true}
		/>
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
	.theme-icon {
		transition: all 0.3s ease;
		transform: scale(1) rotate(0deg);
	}

	.sun-icon {
		color: rgb(251 191 36); /* yellow-400 */
	}

	.moon-icon {
		color: rgb(147 197 253); /* blue-300 */
	}

	/* Loading spinner */
	.loading-spinner {
		position: absolute;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.toggling :global(.loading-spinner) {
		opacity: 1;
	}

	.toggling :global(.theme-icon) {
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
		.theme-icon,
		.loading-spinner {
			transition: none;
		}

		.theme-toggle:hover {
			transform: none;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.theme-toggle {
			border-width: 2px;
		}

		.theme-icon {
			color: hsl(var(--foreground));
		}
	}
</style>