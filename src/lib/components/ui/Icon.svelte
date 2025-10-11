<script lang="ts">
	export let name: string;
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let color: string = 'currentColor';
	export let ariaLabel: string | undefined = undefined;
	export let ariaHidden: boolean = false;
	export let title: string | undefined = undefined;

	// Support both class and className for compatibility
	let className: string = '';
	export { className as class };

	$: sizeClasses = {
		xs: 'w-3 h-3',
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6',
		xl: 'w-8 h-8'
	};

	// Heroicons path data (extracted from heroicons/24/outline)
	$: heroiconPaths = {
		'bars-3': 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5',
		'x-mark': 'M6 18 18 6M6 6l12 12',
		'chevron-down': 'm19.5 8.25-7.5 7.5-7.5-7.5',
		'sun': 'M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z',
		'moon': 'M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z',
		'loading': 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99',
		// Aliases for backward compatibility
		'menu': 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5', // Same as bars-3
		'x': 'M6 18 18 6M6 6l12 12', // Same as x-mark
	};

	// Legacy icon paths for backward compatibility (20x20 viewBox)
	$: legacyIconPaths = {
		// Common icons used throughout the site
		check:
			'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
		code: 'M13 6l3 6-3 6M7 6l-3 6 3 6',
		heart:
			'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
		book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
		mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		phone:
			'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
		location:
			'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
		'external-link': 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
		'arrow-right': 'M13 7l5 5m0 0l-5 5m5-5H6',
		'chevron-right': 'M9 5l7 7-7 7',
		'chevron-left': 'M15 5l-7 7 7 7',
		'chevron-up': 'M5 15l7-7 7 7',
		target: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		users:
			'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m-13.8 0A6 6 0 003 15v6m0 0v-5.197',
		zap: 'M13 10V3L4 14h7v7l9-11h-7z',
		mobile: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
		layers: 'M12 2l3.09 6.26L22 9l-5.91.74L12 16l-4.09-6.26L2 9l5.91-.74L12 2z',
		search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
		accessibility:
			'M16 4a4 4 0 11-8 0 4 4 0 018 0zM23 20c0 1-1 2-1 2H2s-1-1-1-2 1-4 6-4 6 3 6 4zm-6-8a2 2 0 11-4 0 2 2 0 014 0z',
		edit: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7m-1.5-9.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z',
		shield:
			'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
		video:
			'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
		'bar-chart':
			'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
		link: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
		smartphone: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
		'graduation-cap':
			'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
		play: 'M14.828 14.828a4 4 0 01-5.656 0M9 10a1 1 0 011.683-.748l5.658 4.706 2.227 1.85c.511.425.511 1.267 0 1.692l-2.227 1.85-5.658 4.706A1 1 0 019 22V10z',
		'trending-up': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
		file: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
		award:
			'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
		'message-circle':
			'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
		'map-pin':
			'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
		// Missing icons for Om oss page
		briefcase:
			'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
		building:
			'M4 21V9l8-4 8 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1zM9 9h1a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1a1 1 0 011-1zM9 14h1a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1a1 1 0 011-1zM14 9h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1a1 1 0 011-1z',
		star: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z',
		terminal:
			'M7 7l3.5 3.5-3.5 3.5M13 14h4M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z',
		database:
			'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
		// Modern framework icons
		svelte:
			'M15.62 3.596L7.815 1.336a2.177 2.177 0 00-2.387.648 2.177 2.177 0 00-.648 2.387l2.26 7.805a2.177 2.177 0 002.387.648 2.177 2.177 0 00.648-2.387L7.815 2.632l7.805 2.26a2.177 2.177 0 002.387-.648 2.177 2.177 0 00.648-2.387L16.395 9.662a2.177 2.177 0 00-2.387-.648 2.177 2.177 0 00-.648 2.387l2.26 7.805M10 18a8 8 0 100-16 8 8 0 000 16z',
		react:
			'M10 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 18c4.418 0 8-1.79 8-4s-3.582-4-8-4-8 1.79-8 4 3.582 4 8 4zM6.09 15.5c2.209-3.827 5.603-6.5 7.91-6.5s5.701 2.673 7.91 6.5c-2.209 3.827-5.603 6.5-7.91 6.5s-5.701-2.673-7.91-6.5zM13.91 15.5c2.209 3.827 2.209 6.5 0 6.5s-5.701-2.673-7.91-6.5c2.209-3.827 5.603-6.5 7.91-6.5s2.209 2.673 0 6.5z'
	};

	// Determine if this is a Heroicon or legacy icon
	$: isHeroicon = heroiconPaths.hasOwnProperty(name);
	$: path = isHeroicon 
		? heroiconPaths[name as keyof typeof heroiconPaths] 
		: legacyIconPaths[name as keyof typeof legacyIconPaths];
	$: viewBox = isHeroicon ? '0 0 24 24' : '0 0 20 20';
	$: strokeWidth = isHeroicon ? '1.5' : '2';
	$: hasTitle = title || ariaLabel;
</script>

<svg
	class="{sizeClasses[size]} {className}"
	fill={isHeroicon ? 'none' : 'currentColor'}
	stroke={isHeroicon ? 'currentColor' : 'none'}
	stroke-width={isHeroicon ? strokeWidth : '0'}
	viewBox={viewBox}
	xmlns="http://www.w3.org/2000/svg"
	style="color: {color}"
	aria-hidden={ariaHidden ? 'true' : hasTitle ? 'false' : 'true'}
	aria-label={ariaLabel}
	role={hasTitle && !ariaHidden ? 'img' : 'presentation'}
>
	{#if title}
		<title>{title}</title>
	{/if}

	{#if isHeroicon}
		<!-- Heroicons use stroke-based rendering -->
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d={path}
		/>
	{:else if path}
		<!-- Legacy icons use fill-based rendering -->
		<path fill-rule="evenodd" d={path} clip-rule="evenodd" />
	{:else}
		<!-- Fallback for unknown icons -->
		<rect
			x="2"
			y="2"
			width="16"
			height="16"
			rx="2"
			stroke="currentColor"
			stroke-width="2"
			fill="none"
		/>
		<text x="10" y="14" text-anchor="middle" font-size="8" fill="currentColor">?</text>
	{/if}
</svg>