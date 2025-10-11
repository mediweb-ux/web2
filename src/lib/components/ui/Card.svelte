<script lang="ts">
	import ResponsiveImage from './ResponsiveImage.svelte';
	
	// Make all props optional and provide defaults
	export let title: string = '';
	export let description: string = '';
	export let href: string | undefined = undefined;
	export let image: string | undefined = undefined;
	export let imageAlt: string = '';
	export let features: string[] = [];
	
	// Allow custom classes to be passed in
	let className: string = '';
	export { className as class };

	$: baseClasses = 'bg-background border border-border rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6';
	$: interactiveClasses = href ? 'hover:shadow-xl cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2' : '';
	$: classes = `${baseClasses} ${interactiveClasses} ${className}`;
</script>

<article class={classes}>
	{#if href && title}
		<a {href} class="block focus:outline-none" aria-describedby={`${title.replace(/\s+/g, '-').toLowerCase()}-description`}>
			{#if image}
				<div class="mb-4">
					<ResponsiveImage
						src={image}
						alt={imageAlt}
						className="w-full h-48 object-cover rounded-md"
						aspectRatio="16/9"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
						formats={[]}
					/>
				</div>
			{/if}
			{#if title}
				<header class="mb-3">
					<h3 class="text-heading-lg font-semibold text-foreground">{title}</h3>
				</header>
			{/if}
			{#if description}
				<div id={`${title.replace(/\s+/g, '-').toLowerCase()}-description`} class="text-muted-foreground mb-4">
					{description}
				</div>
			{/if}
			{#if features.length > 0}
				<ul class="space-y-2" aria-label="Key features">
					{#each features as feature}
						<li class="flex items-start">
							<svg class="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span class="text-body-sm text-muted-foreground">{feature}</span>
						</li>
					{/each}
				</ul>
			{/if}
			<slot />
		</a>
	{:else}
		{#if image}
			<div class="mb-4">
				<ResponsiveImage
					src={image}
					alt={imageAlt}
					className="w-full h-48 object-cover rounded-md"
					aspectRatio="16/9"
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
					formats={[]}
				/>
			</div>
		{/if}
		{#if title}
			<header class="mb-3">
				<h3 class="text-heading-lg font-semibold text-foreground">{title}</h3>
			</header>
		{/if}
		{#if description}
			<div class="text-muted-foreground mb-4">
				{description}
			</div>
		{/if}
		{#if features.length > 0}
			<ul class="space-y-2" aria-label="Key features">
				{#each features as feature}
					<li class="flex items-start">
						<svg class="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span class="text-body-sm text-muted-foreground">{feature}</span>
					</li>
				{/each}
			</ul>
		{/if}
		<slot />
	{/if}
</article>