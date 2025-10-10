<script lang="ts">
	import { Analytics } from '$lib/utils/analytics';

	// Props
	export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let href: string | undefined = undefined;
	export let ariaLabel: string | undefined = undefined;
	export let ariaDescribedBy: string | undefined = undefined;
	export let onclick: (() => void) | undefined = undefined;
	export let trackingName: string | undefined = undefined;
	
	// Allow custom classes to be passed in
	let className: string = '';
	export { className as class };

	// Reactive classes
	$: baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
	
	$: variantClasses = {
		primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-md hover:shadow-lg',
		secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary shadow-md hover:shadow-lg',
		outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary bg-background'
	}[variant];

	$: sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	}[size];

	$: classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;
</script>

{#if href && !disabled}
	<a
		{href}
		class={classes}
		role="button"
		aria-label={ariaLabel}
		aria-describedby={ariaDescribedBy}
		on:click={() => {
			if (trackingName) {
				Analytics.trackButtonClick(trackingName, href);
			}
			if (onclick) onclick();
		}}
	>
		{#if loading}
			<svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		{/if}
		<slot />
	</a>
{:else}
	<button
		{type}
		{disabled}
		class={classes}
		aria-label={ariaLabel}
		aria-describedby={ariaDescribedBy}
		aria-disabled={disabled}
		on:click={() => {
			if (trackingName) {
				Analytics.trackButtonClick(trackingName, 'button');
			}
			if (onclick) onclick();
		}}
	>
		{#if loading}
			<svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		{/if}
		<slot />
	</button>
{/if}