import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ContactPage from './+page.svelte';

// Mock the $app/stores module
vi.mock('$app/stores', () => ({
	page: {
		subscribe: vi.fn((callback: any) => {
			callback({
				url: new URL('http://localhost:3000/contact'),
				params: {},
				route: { id: '/contact' }
			});
			return () => {};
		})
	}
}));

describe('Contact Page', () => {
	it('renders the contact page with proper heading', () => {
		render(ContactPage);
		
		expect(screen.getByRole('heading', { name: /get in touch/i, level: 1 })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /send us a message/i, level: 2 })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /contact information/i, level: 2 })).toBeInTheDocument();
	});

	it('displays contact information with proper structure', () => {
		render(ContactPage);
		
		// Check for email link
		const emailLink = screen.getByRole('link', { name: /send email to hello@agency\.com/i });
		expect(emailLink).toBeInTheDocument();
		expect(emailLink).toHaveAttribute('href', 'mailto:hello@agency.com');

		// Check for phone link
		const phoneLink = screen.getByRole('link', { name: /call \+1 \(555\) 123-4567/i });
		expect(phoneLink).toBeInTheDocument();
		expect(phoneLink).toHaveAttribute('href', 'tel:+1(555)123-4567');

		// Check for address using partial text matching
		expect(screen.getByText(/123 Business Ave/)).toBeInTheDocument();
		expect(screen.getByText(/Tech City, TC 12345/)).toBeInTheDocument();
	});

	it('displays business hours information', () => {
		render(ContactPage);
		
		expect(screen.getByText('Business Hours')).toBeInTheDocument();
		expect(screen.getByText('Monday - Friday: 9:00 AM - 6:00 PM')).toBeInTheDocument();
		expect(screen.getByText('Saturday - Sunday: Closed')).toBeInTheDocument();
	});

	it('displays what to expect section', () => {
		render(ContactPage);
		
		expect(screen.getByText('What to expect')).toBeInTheDocument();
		expect(screen.getByText('Response within 24 hours')).toBeInTheDocument();
		expect(screen.getByText('Free initial consultation')).toBeInTheDocument();
		expect(screen.getByText('Detailed project proposal')).toBeInTheDocument();
		expect(screen.getByText('No obligation to proceed')).toBeInTheDocument();
	});

	it('includes proper meta tags and structured data', () => {
		render(ContactPage);
		
		// Check that the page title is set
		expect(document.title).toBe('Contact Us - Agency');
		
		// Check for structured data script
		const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
		expect(structuredDataScript).toBeInTheDocument();
		
		if (structuredDataScript) {
			const structuredData = JSON.parse(structuredDataScript.textContent || '{}');
			expect(structuredData['@type']).toBe('Organization');
			expect(structuredData.name).toBe('Agency');
			expect(structuredData.contactPoint).toBeInstanceOf(Array);
			expect(structuredData.contactPoint[0].email).toBe('hello@agency.com');
		}
	});

	it('renders the contact form component', () => {
		render(ContactPage);
		
		// Check that the form is present
		expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument();
		
		// Check for form fields using more specific selectors
		expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
		expect(screen.getByRole('combobox', { name: /service interest/i })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
	});

	it('has proper accessibility attributes', () => {
		render(ContactPage);
		
		// Check for proper heading hierarchy
		const h1 = screen.getByRole('heading', { level: 1 });
		const h2Elements = screen.getAllByRole('heading', { level: 2 });
		const h3Elements = screen.getAllByRole('heading', { level: 3 });
		
		expect(h1).toBeInTheDocument();
		expect(h2Elements.length).toBeGreaterThan(0);
		expect(h3Elements.length).toBeGreaterThan(0);

		// Check for proper address element using querySelector since it doesn't have a specific accessible name
		const address = document.querySelector('address');
		expect(address).toBeInTheDocument();
	});
});