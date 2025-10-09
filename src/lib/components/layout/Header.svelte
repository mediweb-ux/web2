<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores';
	import ThemeToggle from '../ui/ThemeToggle.svelte';
	import Navigation from './Navigation.svelte';

	// Import logo images
	import logoLight from '$lib/assets/MediWeb_logo_crop.png';
	import logoDark from '$lib/assets/MediWeb_logo_crop_dark.png';

	let mobileMenuOpen = false;
	let headerElement: HTMLElement;
	
	// Reactive logo source based on theme
	$: currentLogo = $theme === 'dark' ? logoDark : logoLight;

	// Handle mobile menu toggle
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;

		// Manage focus for accessibility
		if (mobileMenuOpen) {
			// Focus first navigation item when menu opens
			setTimeout(() => {
				if (headerElement) {
					const firstNavItem = headerElement.querySelector('nav a');
					if (firstNavItem) {
						(firstNavItem as HTMLElement).focus();
					}
				}
			}, 100);
		}
	}

	// Close mobile menu when clicking outside or pressing escape
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && mobileMenuOpen) {
			mobileMenuOpen = false;
			// Return focus to menu button
			if (headerElement) {
				const menuButton = headerElement.querySelector('[aria-expanded]');
				if (menuButton) {
					(menuButton as HTMLElement).focus();
				}
			}
		}
	}

	// Close mobile menu on route change
	$: if (page.url.pathname) {
		mobileMenuOpen = false;
	}

	onMount(() => {
		// Add global keydown listener for escape key
		document.addEventListener('keydown', handleKeydown);

		// Preload both logo images to avoid loading delays when switching themes
		const lightImg = new Image();
		const darkImg = new Image();
		lightImg.src = logoLight;
		darkImg.src = logoDark;

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<svelte:head>
	<!-- Preload both logo images for instant theme switching -->
	<link rel="preload" href={logoLight} as="image" />
	<link rel="preload" href={logoDark} as="image" />
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<!-- Skip to main content link for accessibility -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
>
	Hopp til hovedinnhold
</a>

<header
	bind:this={headerElement}
	class="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<a
					href="/"
					class="flex items-center space-x-3 text-xl font-bold text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm transition-colors duration-200"
					aria-label="MediWeb Solutions - Gå til forsiden"
				>
					<!-- Dynamic logo that changes with theme -->
					<img
						src={currentLogo}
						alt="MediWeb Solutions logo"
						class="h-8 w-auto transition-opacity duration-300"
						loading="eager"
						key={$theme}
					/>
					<!-- Company name (hidden on small screens if you want logo-only) -->
					<span class="hidden sm:block">MediWeb Solutions</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<Navigation />
			</div>

			<!-- Theme Toggle and Mobile Menu Button -->
			<div class="flex items-center space-x-4">
				<ThemeToggle />

				<!-- Mobile menu button -->
				<button
					type="button"
					class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					aria-controls="mobile-menu"
					aria-expanded={mobileMenuOpen}
					aria-label={mobileMenuOpen ? 'Lukk meny' : 'Åpne meny'}
					on:click={toggleMobileMenu}
				>
					<span class="sr-only">{mobileMenuOpen ? 'Lukk meny' : 'Åpne meny'}</span>
					<!-- Hamburger icon -->
					<svg
						class="block h-6 w-6 {mobileMenuOpen ? 'hidden' : 'block'}"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<!-- Close icon -->
					<svg
						class="block h-6 w-6 {mobileMenuOpen ? 'block' : 'hidden'}"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Navigation Menu -->
		{#if mobileMenuOpen}
			<div
				id="mobile-menu"
				class="md:hidden border-t border-border"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="mobile-menu-button"
			>
				<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					<Navigation mobile={true} />
				</div>
			</div>
		{/if}
	</div>
</header>

<style>
	/* Screen reader only class */
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

	.focus\:not-sr-only:focus {
		position: static;
		width: auto;
		height: auto;
		padding: 0.5rem 1rem;
		margin: 0;
		overflow: visible;
		clip: auto;
		white-space: normal;
	}
</style>
