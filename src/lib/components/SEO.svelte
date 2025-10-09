<script lang="ts">
	export let title: string = '';
	export let description: string = '';
	export let keywords: string | string[] = '';
	export let ogImage: string = '';
	export let ogType: string = 'website';
	export let canonicalUrl: string = '';
	export let structuredData: any | any[] = null;
	export let noindex: boolean = false;
	export let nofollow: boolean = false;

	// Default values
	const defaultTitle = 'Professional Digital Agency - Web Development, Medical Services & Courses';
	const defaultDescription = 'Transform your ideas into powerful digital solutions. We specialize in modern web development, healthcare technology, and educational platforms.';
	const defaultKeywords = 'web development, medical services, courses, agency, accessibility, performance, digital solutions';
	const defaultOgImage = '/images/og-default.jpg';
	const siteName = 'Agency';
	const twitterHandle = '@agency';

	// Computed values
	$: finalTitle = title || defaultTitle;
	$: finalDescription = description || defaultDescription;
	$: finalKeywords = Array.isArray(keywords) ? keywords.join(', ') : (keywords || defaultKeywords);
	$: finalOgImage = ogImage || defaultOgImage;
	$: robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{finalTitle}</title>
	<meta name="description" content={finalDescription} />
	<meta name="keywords" content={finalKeywords} />
	<meta name="robots" content={robotsContent} />
	
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={finalTitle} />
	<meta property="og:description" content={finalDescription} />
	<meta property="og:type" content={ogType} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content={finalOgImage} />
	<meta property="og:image:alt" content={finalTitle} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	
	{#if canonicalUrl}
		<meta property="og:url" content={canonicalUrl} />
	{/if}

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={twitterHandle} />
	<meta name="twitter:creator" content={twitterHandle} />
	<meta name="twitter:title" content={finalTitle} />
	<meta name="twitter:description" content={finalDescription} />
	<meta name="twitter:image" content={finalOgImage} />
	<meta name="twitter:image:alt" content={finalTitle} />

	<!-- Structured Data -->
	{#if structuredData}
		{#if Array.isArray(structuredData)}
			{#each structuredData as data}
				{@html `<script type="application/ld+json">${JSON.stringify(data)}</script>`}
			{/each}
		{:else}
			{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
		{/if}
	{/if}
</svelte:head>