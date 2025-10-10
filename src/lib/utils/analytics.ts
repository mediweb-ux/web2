import { browser } from '$app/environment';

// Type-safe interface for global browser objects
interface BrowserGlobals {
	gtag?: (...args: unknown[]) => void;
	document?: {
		title?: string;
	};
	location?: {
		href: string;
	};
}

// Helper function to safely access browser globals
function getBrowserGlobals(): BrowserGlobals | null {
	if (!browser || typeof globalThis === 'undefined') {
		return null;
	}
	return globalThis as unknown as BrowserGlobals;
}

// Helper function to safely call gtag
function callGtag(...args: unknown[]) {
	const globals = getBrowserGlobals();
	if (globals?.gtag) {
		globals.gtag(...args);
	}
}

// Helper function to get page title
function getPageTitle(fallback?: string): string {
	const globals = getBrowserGlobals();
	return globals?.document?.title || fallback || 'Unknown';
}

// Helper function to get current location
function getCurrentLocation(): string {
	const globals = getBrowserGlobals();
	return globals?.location?.href || '';
}

// Google Analytics utility functions
export class Analytics {
	private static measurementId: string;

	static init(measurementId: string) {
		this.measurementId = measurementId;
	}

	// Track page views
	static trackPageView(url: string, title?: string) {
		if (!browser || !this.measurementId || this.measurementId === 'G-XXXXXXXXXX') {
			return;
		}

		callGtag('config', this.measurementId, {
			page_path: url,
			page_title: getPageTitle(title),
			page_location: getCurrentLocation()
		});
	}

	// Track custom events
	static trackEvent(eventName: string, parameters: Record<string, unknown> = {}) {
		if (!browser || !this.measurementId || this.measurementId === 'G-XXXXXXXXXX') {
			return;
		}

		callGtag('event', eventName, {
			...parameters,
			// Add default parameters
			timestamp: new Date().toISOString()
		});
	}

	// Track form submissions
	static trackFormSubmission(formName: string, success: boolean = true) {
		this.trackEvent('form_submit', {
			form_name: formName,
			success: success
		});
	}

	// Track button clicks
	static trackButtonClick(buttonName: string, location?: string) {
		this.trackEvent('button_click', {
			button_name: buttonName,
			location: location || 'unknown'
		});
	}

	// Track service interest
	static trackServiceInterest(serviceName: string) {
		this.trackEvent('service_interest', {
			service_name: serviceName
		});
	}

	// Track contact form interactions
	static trackContactFormStart() {
		this.trackEvent('contact_form_start');
	}

	static trackContactFormComplete(services: string[]) {
		this.trackEvent('contact_form_complete', {
			services: services.join(', '),
			service_count: services.length
		});
	}

	// Track navigation
	static trackNavigation(destination: string, source?: string) {
		this.trackEvent('navigation', {
			destination,
			source: source || 'unknown'
		});
	}

	// Track downloads (if you have any)
	static trackDownload(fileName: string, fileType?: string) {
		this.trackEvent('file_download', {
			file_name: fileName,
			file_type: fileType || 'unknown'
		});
	}

	// Track external link clicks
	static trackExternalLink(url: string, linkText?: string) {
		this.trackEvent('external_link_click', {
			link_url: url,
			link_text: linkText || 'unknown'
		});
	}
}