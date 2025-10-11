<script lang="ts">
	import { page } from '$app/state';
	import { Analytics } from '$lib/utils/analytics';
	import Icon from '$lib/components/ui/Icon.svelte';

	export let mobile = false;

	let showServicesDropdown = false;
	let dropdownTimeout: ReturnType<typeof setTimeout>;

	// Services for dropdown
	const services = [
		{ href: '/tjenester/webutvikling', label: 'Webutvikling', icon: 'code' },
		{ href: '/tjenester/legetjenester', label: 'Legetjenester', icon: 'heart' },
		{ href: '/tjenester/kursvirksomhet', label: 'Kursvirksomhet', icon: 'book' }
	];

	// Check if current page matches the nav item (reactive)
	$: isCurrentPage = (href: string): boolean => {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		// For services, match both /tjenester and /tjenester/[slug]
		if (href === '/tjenester') {
			return page.url.pathname === '/tjenester' || page.url.pathname.startsWith('/tjenester/');
		}
		return page.url.pathname.startsWith(href);
	};

	// Check if services dropdown should be active
	$: isServicesActive =
		page.url.pathname === '/tjenester' || page.url.pathname.startsWith('/tjenester/');

	// Handle dropdown toggle
	function toggleServicesDropdown() {
		showServicesDropdown = !showServicesDropdown;
	}

	// Handle dropdown hover with delay
	function handleDropdownEnter() {
		clearTimeout(dropdownTimeout);
		showServicesDropdown = true;
	}

	function handleDropdownLeave() {
		clearTimeout(dropdownTimeout);
		dropdownTimeout = setTimeout(() => {
			showServicesDropdown = false;
		}, 150); // Small delay to allow mouse movement between button and dropdown
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('[data-dropdown="services"]')) {
			showServicesDropdown = false;
		}
	}

	// Handle keyboard navigation for dropdown
	function handleDropdownKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			showServicesDropdown = false;
		}
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

<svelte:window on:click={handleClickOutside} on:keydown={handleDropdownKeydown} />

<nav aria-label={mobile ? 'Mobil navigasjon' : 'Navigasjon'}>
	<ul class={mobile ? 'flex flex-col space-y-1' : 'flex items-center space-x-8'}>
		<!-- Home -->
		<li>
			<a
				href="/"
				on:click={() => Analytics.trackNavigation('hjem', mobile ? 'mobile_nav' : 'desktop_nav')}
				class={`
					${
						mobile
							? 'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
							: 'text-sm font-medium transition-colors duration-200'
					}
					${
						isCurrentPage('/')
							? mobile
								? 'bg-primary text-primary-foreground'
								: 'text-primary border-b-2 border-primary'
							: mobile
								? 'text-foreground hover:bg-accent hover:text-accent-foreground'
								: 'text-muted-foreground hover:text-foreground'
					}
					focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm
				`}
				aria-current={isCurrentPage('/') ? 'page' : undefined}
				on:keydown={(event) => handleKeydown(event, 0)}
				tabindex="0"
			>
				Hjem
			</a>
		</li>

		<!-- Services Dropdown -->
		<li class="relative" data-dropdown="services">
			{#if mobile}
				<!-- Mobile: Expandable section -->
				<button
					type="button"
					on:click={toggleServicesDropdown}
					class={`
						w-full text-left block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
						${
							isServicesActive
								? 'bg-primary text-primary-foreground'
								: 'text-foreground hover:bg-accent hover:text-accent-foreground'
						}
						focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
					`}
					aria-expanded={showServicesDropdown}
					aria-haspopup="true"
				>
					<span class="flex items-center justify-between">
						Tjenester
						<Icon
							name="chevron-down"
							size="sm"
							class="ml-2 transition-transform duration-200 {showServicesDropdown
								? 'rotate-180'
								: ''}"
						/>
					</span>
				</button>

				{#if showServicesDropdown}
					<div class="ml-4 mt-1 space-y-1">
						<a
							href="/tjenester"
							on:click={() => Analytics.trackNavigation('tjenester_overview', 'mobile_nav')}
							class="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
						>
							Alle tjenester
						</a>
						{#each services as service}
							<a
								href={service.href}
								on:click={() =>
									Analytics.trackNavigation(service.label.toLowerCase(), 'mobile_nav_dropdown')}
								class="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
							>
								{service.label}
							</a>
						{/each}
					</div>
				{/if}
			{:else}
				<!-- Desktop: Hover dropdown -->
				<div
					on:mouseenter={handleDropdownEnter}
					on:mouseleave={handleDropdownLeave}
					class="relative"
					role="button"
					tabindex="0"
				>
					<button
						type="button"
						on:click={toggleServicesDropdown}
						class={`
							text-sm font-medium transition-colors duration-200 flex items-center
							${
								isServicesActive
									? 'text-primary border-b-2 border-primary'
									: 'text-muted-foreground hover:text-foreground'
							}
							focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm
						`}
						aria-expanded={showServicesDropdown}
						aria-haspopup="true"
					>
						Tjenester
						<Icon
							name="chevron-down"
							size="sm"
							class="ml-1 transition-transform duration-200 {showServicesDropdown
								? 'rotate-180'
								: ''}"
						/>
					</button>

					{#if showServicesDropdown}
						<div
							class="absolute top-full left-0 pt-1 w-56 z-50"
							role="menu"
							aria-label="Tjenester meny"
							tabindex="-1"
						>
							<div class="bg-background border border-border rounded-md shadow-lg">
								<div class="py-2">
									<a
										href="/tjenester"
										on:click={() =>
											Analytics.trackNavigation('tjenester_overview', 'desktop_nav_dropdown')}
										class="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 font-medium"
									>
										Alle tjenester
									</a>
									<div class="border-t border-border my-1"></div>
									{#each services as service}
										<a
											href={service.href}
											on:click={() =>
												Analytics.trackNavigation(
													service.label.toLowerCase(),
													'desktop_nav_dropdown'
												)}
											class="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
										>
											{service.label}
										</a>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</li>

		<!-- Om oss -->
		<li>
			<a
				href="/om-oss"
				on:click={() => Analytics.trackNavigation('om oss', mobile ? 'mobile_nav' : 'desktop_nav')}
				class={`
					${
						mobile
							? 'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
							: 'text-sm font-medium transition-colors duration-200'
					}
					${
						isCurrentPage('/om-oss')
							? mobile
								? 'bg-primary text-primary-foreground'
								: 'text-primary border-b-2 border-primary'
							: mobile
								? 'text-foreground hover:bg-accent hover:text-accent-foreground'
								: 'text-muted-foreground hover:text-foreground'
					}
					focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm
				`}
				aria-current={isCurrentPage('/om-oss') ? 'page' : undefined}
				on:keydown={(event) => handleKeydown(event, 2)}
				tabindex="0"
			>
				Om oss
			</a>
		</li>

		<!-- Kontakt -->
		<li>
			<a
				href="/kontakt"
				on:click={() => Analytics.trackNavigation('kontakt', mobile ? 'mobile_nav' : 'desktop_nav')}
				class={`
					${
						mobile
							? 'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
							: 'text-sm font-medium transition-colors duration-200'
					}
					${
						isCurrentPage('/kontakt')
							? mobile
								? 'bg-primary text-primary-foreground'
								: 'text-primary border-b-2 border-primary'
							: mobile
								? 'text-foreground hover:bg-accent hover:text-accent-foreground'
								: 'text-muted-foreground hover:text-foreground'
					}
					focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm
				`}
				aria-current={isCurrentPage('/kontakt') ? 'page' : undefined}
				on:keydown={(event) => handleKeydown(event, 3)}
				tabindex="0"
			>
				Kontakt
			</a>
		</li>
	</ul>
</nav>
