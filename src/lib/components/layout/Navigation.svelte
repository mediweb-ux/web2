<script lang="ts">
	import { page } from '$app/state';
	import { Analytics } from '$lib/utils/analytics';

	export let mobile = false;

	// Navigation items
	const navItems = [
		{ href: '/', label: 'Hjem' },
		{ href: '/tjenester', label: 'Tjenester' },
		{ href: '/om-oss', label: 'Om oss' },
		{ href: '/kontakt', label: 'Kontakt' }
	];

	// Check if current page matches the nav item
	function isCurrentPage(href: string): boolean {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		// For services, match both /tjenester and /tjenester/[slug]
		if (href === '/tjenester') {
			return page.url.pathname === '/tjenester' || page.url.pathname.startsWith('/tjenester/');
		}
		return page.url.pathname.startsWith(href);
	}

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent, index: number) {
		const navLinks = document.querySelectorAll(
			`nav[aria-label="${mobile ? 'Mobil navigasjon' : 'Navigasjon'}"] a`
		);

		switch (event.key) {
			case 'ArrowDown':
			case 'ArrowRight':
				event.preventDefault();
				const nextIndex = (index + 1) % navLinks.length;
				(navLinks[nextIndex] as HTMLElement).focus();
				break;
			case 'ArrowUp':
			case 'ArrowLeft':
				event.preventDefault();
				const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
				(navLinks[prevIndex] as HTMLElement).focus();
				break;
			case 'Home':
				event.preventDefault();
				(navLinks[0] as HTMLElement).focus();
				break;
			case 'End':
				event.preventDefault();
				(navLinks[navLinks.length - 1] as HTMLElement).focus();
				break;
		}
	}
</script>

<nav aria-label={mobile ? 'Mobil navigasjon' : 'Navigasjon'}>
	<ul class={mobile ? 'flex flex-col space-y-1' : 'flex items-center space-x-8'}>
		{#each navItems as item, index}
			<li>
				<a
					href={item.href}
					on:click={() => Analytics.trackNavigation(item.label.toLowerCase(), mobile ? 'mobile_nav' : 'desktop_nav')}
					class={`
						${
							mobile
								? 'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
								: 'text-sm font-medium transition-colors duration-200'
						}
						${
							isCurrentPage(item.href)
								? mobile
									? 'bg-primary text-primary-foreground'
									: 'text-primary border-b-2 border-primary'
								: mobile
									? 'text-foreground hover:bg-accent hover:text-accent-foreground'
									: 'text-muted-foreground hover:text-foreground'
						}
						focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm
					`}
					aria-current={isCurrentPage(item.href) ? 'page' : undefined}
					on:keydown={(event) => handleKeydown(event, index)}
					tabindex="0"
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
