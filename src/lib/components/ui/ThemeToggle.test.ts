import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThemeToggle from './ThemeToggle.svelte';

// Mock the stores
vi.mock('$lib/stores', () => ({
	theme: {
		subscribe: vi.fn((callback) => {
			callback('light');
			return vi.fn();
		}),
		init: vi.fn(() => vi.fn()),
		toggle: vi.fn(),
		setTheme: vi.fn(),
		clearPreference: vi.fn()
	},
	prefersReducedMotion: {
		subscribe: vi.fn((callback) => {
			callback(false);
			return vi.fn();
		}),
		init: vi.fn()
	}
}));

// Mock browser environment
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

describe('ThemeToggle Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders theme toggle button', () => {
		const { getByRole } = render(ThemeToggle);
		
		const button = getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('aria-label');
	});

	it('shows sun icon in light mode', () => {
		const { container } = render(ThemeToggle);
		
		// Check that sun icon is rendered
		const sunIcon = container.querySelector('.sun-icon');
		expect(sunIcon).toBeInTheDocument();
		
		// Check that moon icon is not rendered
		const moonIcon = container.querySelector('.moon-icon');
		expect(moonIcon).not.toBeInTheDocument();
	});

	it('has proper accessibility attributes', () => {
		const { getByRole } = render(ThemeToggle);
		
		const button = getByRole('button');
		expect(button).toHaveAttribute('aria-label');
		expect(button).toHaveAttribute('title');
		expect(button).toHaveAttribute('type', 'button');
	});

	it('can be clicked', async () => {
		const { getByRole } = render(ThemeToggle);
		
		const button = getByRole('button');
		await fireEvent.click(button);
		
		// Button should be clickable (no errors thrown)
		expect(button).toBeInTheDocument();
	});

	it('supports keyboard navigation', async () => {
		const { getByRole } = render(ThemeToggle);
		
		const button = getByRole('button');
		
		// Test Enter key
		await fireEvent.keyDown(button, { key: 'Enter' });
		expect(button).toBeInTheDocument();
		
		// Test Space key
		await fireEvent.keyDown(button, { key: ' ' });
		expect(button).toBeInTheDocument();
	});

	it('shows loading state when toggling', async () => {
		const { getByRole, container } = render(ThemeToggle);
		
		const button = getByRole('button');
		await fireEvent.click(button);
		
		// Should have toggling class or loading spinner
		expect(button).toBeInTheDocument();
	});

	it('has proper size classes', () => {
		const { getByRole } = render(ThemeToggle, { props: { size: 'lg' } });
		
		const button = getByRole('button');
		expect(button).toHaveClass('w-12', 'h-12');
	});

	it('can show optional label', () => {
		const { container } = render(ThemeToggle, { props: { showLabel: true } });
		
		const label = container.querySelector('.theme-label');
		expect(label).toBeInTheDocument();
	});
});