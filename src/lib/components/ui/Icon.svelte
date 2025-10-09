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

	$: iconPaths = {
		// Common icons used throughout the site
		check:
			'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
		x: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
		menu: 'M3 12h18m-9-9v18',
		sun: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
		moon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
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
		'chevron-down': 'M5 9l7 7 7-7',
		'chevron-up': 'M5 15l7-7 7 7',
		loading:
			'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
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
			'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
	};

	$: path = iconPaths[name as keyof typeof iconPaths];
	$: hasTitle = title || ariaLabel;
</script>

<svg
	class="{sizeClasses[size]} {className}"
	fill={['loading', 'menu', 'chevron-right', 'chevron-left', 'chevron-down', 'chevron-up'].includes(
		name
	)
		? 'none'
		: 'currentColor'}
	stroke={[
		'loading',
		'menu',
		'chevron-right',
		'chevron-left',
		'chevron-down',
		'chevron-up'
	].includes(name)
		? 'currentColor'
		: 'none'}
	stroke-width={[
		'loading',
		'menu',
		'chevron-right',
		'chevron-left',
		'chevron-down',
		'chevron-up'
	].includes(name)
		? '2'
		: '0'}
	viewBox="0 0 20 20"
	xmlns="http://www.w3.org/2000/svg"
	style="color: {color}"
	aria-hidden={ariaHidden ? 'true' : hasTitle ? 'false' : 'true'}
	aria-label={ariaLabel}
	role={hasTitle && !ariaHidden ? 'img' : 'presentation'}
>
	{#if title}
		<title>{title}</title>
	{/if}

	{#if name === 'loading'}
		<circle class="opacity-25" cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"
		></circle>
		<path
			class="opacity-75"
			fill="currentColor"
			d="M2 10a8 8 0 018-8V0C4.477 0 0 4.477 0 10h2zm2 5.291A7.962 7.962 0 012 10H0c0 3.042 1.135 5.824 3 7.938l1-2.647z"
		></path>
	{:else if name === 'menu'}
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M4 6h16M4 12h16M4 18h16"
		/>
	{:else if name === 'chevron-right'}
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M9 5l7 7-7 7"
		/>
	{:else if name === 'chevron-left'}
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M15 5l-7 7 7 7"
		/>
	{:else if name === 'chevron-down'}
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M5 9l7 7 7-7"
		/>
	{:else if name === 'chevron-up'}
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M5 15l7-7 7 7"
		/>
	{:else if name === 'sun'}
		<path
			fill-rule="evenodd"
			d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
			clip-rule="evenodd"
		/>
	{:else if name === 'moon'}
		<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
	{:else if path}
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
