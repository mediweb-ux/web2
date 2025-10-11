<script lang="ts">
	import { Analytics } from '$lib/utils/analytics';
	import Icon from './Icon.svelte';

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
		sm: 'px-3 py-1.5 text-body-sm',
		md: 'px-4 py-2 text-body',
		lg: 'px-6 py-3 text-body-lg'
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
			<Icon name="loading" size="sm" class="animate-spin -ml-1 mr-2" ariaHidden={true} />
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
			<Icon name="loading" size="sm" class="animate-spin -ml-1 mr-2" ariaHidden={true} />
		{/if}
		<slot />
	</button>
{/if}