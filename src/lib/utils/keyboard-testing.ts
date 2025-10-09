import { fireEvent } from '@testing-library/svelte';

/**
 * Keyboard navigation test utilities
 */

export const KeyCodes = {
	TAB: 'Tab',
	SHIFT_TAB: 'Tab',
	ENTER: 'Enter',
	SPACE: ' ',
	ESCAPE: 'Escape',
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	ARROW_LEFT: 'ArrowLeft',
	ARROW_RIGHT: 'ArrowRight',
	HOME: 'Home',
	END: 'End'
} as const;

/**
 * Simulate keyboard navigation through focusable elements
 */
export function simulateTabNavigation(container: Element, forward: boolean = true): Element[] {
	const focusableElements = getFocusableElements(container);
	const focusedElements: Element[] = [];

	focusableElements.forEach((element) => {
		if (forward) {
			fireEvent.keyDown(element, { key: KeyCodes.TAB });
		} else {
			fireEvent.keyDown(element, { key: KeyCodes.TAB, shiftKey: true });
		}
		
		if (document.activeElement === element) {
			focusedElements.push(element);
		}
	});

	return focusedElements;
}

/**
 * Get all focusable elements in a container
 */
export function getFocusableElements(container: Element): Element[] {
	const focusableSelectors = [
		'a[href]',
		'button:not([disabled])',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'[tabindex]:not([tabindex="-1"])',
		'[contenteditable="true"]'
	].join(', ');

	return Array.from(container.querySelectorAll(focusableSelectors))
		.filter(element => {
			// Check if element is visible
			const style = window.getComputedStyle(element);
			return style.display !== 'none' && 
				   style.visibility !== 'hidden' && 
				   style.opacity !== '0';
		});
}

/**
 * Test if element has visible focus indicator
 */
export function hasVisibleFocusIndicator(element: Element): boolean {
	const style = window.getComputedStyle(element);
	
	// Check for outline
	if (style.outline && style.outline !== 'none' && style.outline !== '0px') {
		return true;
	}
	
	// Check for box-shadow (common focus indicator)
	if (style.boxShadow && style.boxShadow !== 'none') {
		return true;
	}
	
	// Check for border changes
	if (style.border && style.borderWidth !== '0px') {
		return true;
	}
	
	return false;
}

/**
 * Test keyboard activation (Enter/Space)
 */
export async function testKeyboardActivation(element: Element): Promise<boolean> {
	let activated = false;
	
	const handleClick = () => {
		activated = true;
	};
	
	element.addEventListener('click', handleClick);
	
	// Test Enter key
	fireEvent.keyDown(element, { key: KeyCodes.ENTER });
	const enterActivated = activated;
	
	activated = false;
	
	// Test Space key (for buttons)
	if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
		fireEvent.keyDown(element, { key: KeyCodes.SPACE });
	}
	
	const spaceActivated = activated;
	
	element.removeEventListener('click', handleClick);
	
	return enterActivated || spaceActivated;
}

/**
 * Test escape key handling for modals/dropdowns
 */
export function testEscapeKeyHandling(element: Element, expectedBehavior: () => boolean): boolean {
	fireEvent.keyDown(element, { key: KeyCodes.ESCAPE });
	return expectedBehavior();
}

/**
 * Test arrow key navigation for menus/lists
 */
export function testArrowKeyNavigation(
	container: Element, 
	direction: 'horizontal' | 'vertical' = 'vertical'
): Element[] {
	const focusableElements = getFocusableElements(container);
	const navigatedElements: Element[] = [];
	
	if (focusableElements.length === 0) return navigatedElements;
	
	// Focus first element
	if (focusableElements[0]) {
		(focusableElements[0] as HTMLElement).focus();
		navigatedElements.push(focusableElements[0]);
	}
	
	// Navigate through elements
	for (let i = 0; i < focusableElements.length - 1; i++) {
		const key = direction === 'vertical' ? KeyCodes.ARROW_DOWN : KeyCodes.ARROW_RIGHT;
		fireEvent.keyDown(document.activeElement!, { key });
		
		if (document.activeElement && focusableElements.includes(document.activeElement)) {
			navigatedElements.push(document.activeElement);
		}
	}
	
	return navigatedElements;
}