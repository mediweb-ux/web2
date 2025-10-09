import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Store for online/offline status
export const isOnline = writable(true);

// Store for offline message visibility
export const showOfflineMessage = writable(false);

// Initialize offline detection
export function initOfflineDetection() {
	if (!browser) return;

	// Set initial state
	isOnline.set(navigator.onLine);

	// Handle online event
	const handleOnline = () => {
		isOnline.set(true);
		showOfflineMessage.set(false);
		
		// Show brief "back online" message
		setTimeout(() => {
			showOfflineMessage.set(false);
		}, 3000);
	};

	// Handle offline event
	const handleOffline = () => {
		isOnline.set(false);
		showOfflineMessage.set(true);
	};

	// Add event listeners
	window.addEventListener('online', handleOnline);
	window.addEventListener('offline', handleOffline);

	// Return cleanup function
	return () => {
		window.removeEventListener('online', handleOnline);
		window.removeEventListener('offline', handleOffline);
	};
}

// Check if a network request failed due to being offline
export function isNetworkError(error: Error): boolean {
	return (
		error.message.includes('Failed to fetch') ||
		error.message.includes('Network request failed') ||
		error.message.includes('NetworkError') ||
		(browser && !navigator.onLine)
	);
}

// Retry a function when back online
export function retryWhenOnline<T>(
	fn: () => Promise<T>,
	maxRetries: number = 3
): Promise<T> {
	return new Promise((resolve, reject) => {
		let retryCount = 0;

		const attempt = async () => {
			try {
				const result = await fn();
				resolve(result);
			} catch (error) {
				if (error instanceof Error && isNetworkError(error) && retryCount < maxRetries) {
					retryCount++;
					
					if (browser && !navigator.onLine) {
						// Wait for online event
						const handleOnline = () => {
							window.removeEventListener('online', handleOnline);
							setTimeout(attempt, 1000); // Small delay after coming online
						};
						window.addEventListener('online', handleOnline);
					} else {
						// Retry with exponential backoff
						setTimeout(attempt, Math.pow(2, retryCount) * 1000);
					}
				} else {
					reject(error);
				}
			}
		};

		attempt();
	});
}

// Queue actions to perform when back online
class OfflineQueue {
	private queue: Array<() => Promise<void>> = [];
	private isProcessing = false;

	add(action: () => Promise<void>) {
		this.queue.push(action);
		this.processQueue();
	}

	private async processQueue() {
		if (this.isProcessing || (browser && !navigator.onLine)) return;

		this.isProcessing = true;

		while (this.queue.length > 0 && (!browser || navigator.onLine)) {
			const action = this.queue.shift();
			if (action) {
				try {
					await action();
				} catch (error) {
					console.error('Failed to process queued action:', error);
					// Re-queue the action if it failed due to network issues
					if (error instanceof Error && isNetworkError(error)) {
						this.queue.unshift(action);
						break;
					}
				}
			}
		}

		this.isProcessing = false;
	}

	// Process queue when coming back online
	onOnline() {
		this.processQueue();
	}

	clear() {
		this.queue = [];
	}

	get length() {
		return this.queue.length;
	}
}

export const offlineQueue = new OfflineQueue();

// Initialize queue processing when online
if (browser) {
	window.addEventListener('online', () => {
		offlineQueue.onOnline();
	});
}