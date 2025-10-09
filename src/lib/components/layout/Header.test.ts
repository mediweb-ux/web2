import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Header from './Header.svelte';

// Mock the page store
vi.mock('$app/stores', () => ({
	page: {
		subscribe: vi.fn((callback: (value: any) => void) => {
			callback({ url: { pathname: '/' } });
			return () => {};
		})
	}
}));

// Mock ThemeToggle component
vi.mock('../ui/ThemeToggle.svelte', () => ({
	default: class MockThemeToggle {
		constructor() {}
		$$render() {
			return '<button data-testid="theme-toggle">Theme Toggle</button>';
		}
	}
}));

// Mock Navigation component
vi.mock('./Navigation.svelte', () => ({
	default: class MockNavigation {
		constructor() {}
		$$render() {
			return '<nav data-testid="navigation">Navigation</nav>';
		}
	}
}));

describe('Header Component', () => {
	beforeEach(() => {
		document.head.innerHTML = '';
		document.body.innerHTML = '';
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders header with proper semantic structure', () => {
		render(Header);
		
		const header = screen.getByRole('banner');
		expect(header).toBeInTheDocument();
	});

	it('includes skip to main content link', () => {
		render(Header);
		
		const skipLink = screen.getByText('Skip to main content');
		expect(skipLink).toBeInTheDocument();
		expect(skipLink).toHaveAttribute('href', '#main-content');
	});

	it('renders logo with proper accessibility attributes', () => {
		render(Header);
		
		const logoLink = screen.getByLabelText('Agency homepage');
		expect(logoLink).toBeInTheDocument();
		expect(logoLink).toHaveAttribute('href', '/');
	});

	it('shows mobile menu button', () => {
		render(Header);
		
		const menuButton = screen.getByLabelText('Open main menu');
		expect(menuButton).toBeInTheDocument();
		expect(menuButton).toHaveAttribute('aria-expanded', 'false');
		expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
	});

	it('toggles mobile menu when button is clicked', async () => {
		render(Header);
		
		const menuButton = screen.getByLabelText('Open main menu');
		
		// Initially closed
		expect(menuButton).toHaveAttribute('aria-expanded', 'false');
		
		// Click to open
		await fireEvent.click(menuButton);
		
		await waitFor(() => {
			expect(menuButton).toHaveAttribute('aria-expanded', 'true');
			expect(menuButton).toHaveAttribute('aria-label', 'Close main menu');
		});
	});

	it('includes theme toggle component', () => {
		render(Header);
		
		const themeToggle = screen.getByTestId('theme-toggle');
		expect(themeToggle).toBeInTheDocument();
	});

	it('includes navigation component', () => {
		render(Header);
		
		const navigation = screen.getByTestId('navigation');
		expect(navigation).toBeInTheDocument();
	});

	it('has proper accessibility attributes', () => {
		render(Header);
		
		const menuButton = screen.getByLabelText('Open main menu');
		expect(menuButton).toHaveAttribute('type', 'button');
		expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
		expect(menuButton).toHaveAttribute('aria-expanded');
	});
});