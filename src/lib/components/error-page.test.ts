import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ErrorPage from '../../routes/+error.svelte';

// Mock the $app/stores
vi.mock('$app/stores', () => ({
	page: {
		subscribe: (fn: (value: any) => void) => {
			fn({
				error: {
					status: 404,
					message: 'Not found'
				}
			});
			return () => {};
		}
	}
}));

describe('Error Page', () => {
	it('renders 404 error page', () => {
		render(ErrorPage);

		expect(screen.getByText('Page Not Found')).toBeInTheDocument();
		expect(screen.getByText("The page you're looking for doesn't exist or has been moved.")).toBeInTheDocument();
	});

	it('has proper navigation links', () => {
		render(ErrorPage);

		expect(screen.getByRole('button', { name: 'Go Home' })).toHaveAttribute('href', '/');
		expect(screen.getByRole('navigation', { name: 'Site navigation' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
	});

	it('has proper accessibility attributes', () => {
		render(ErrorPage);

		expect(screen.getByRole('main')).toHaveAttribute('aria-labelledby', 'error-heading');
		expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('id', 'error-heading');
	});
});