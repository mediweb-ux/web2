<script lang="ts">
	import Icon from './Icon.svelte';

	interface BreadcrumbItem {
		label: string;
		href: string;
		current?: boolean;
	}

	export let items: BreadcrumbItem[] = [];
</script>

<nav aria-label="Breadcrumb" class="flex items-center space-x-2 text-sm">
	<ol class="flex items-center space-x-2">
		{#each items as item, index}
			<li class="flex items-center">
				{#if index > 0}
					<Icon name="chevron-right" size="sm" class="text-muted-foreground mx-2" />
				{/if}
				
				{#if item.current}
					<span class="text-foreground font-medium" aria-current="page">
						{item.label}
					</span>
				{:else}
					<a 
						href={item.href} 
						class="text-muted-foreground hover:text-foreground transition-colors duration-200"
					>
						{item.label}
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>