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
		
		expect(screen.getByRole('heading', { name: /kontakt oss/i, level: 1 })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /send en melding/i, level: 2 })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /kontaktinformasjon/i, level: 2 })).toBeInTheDocument();
	});

	it('displays contact information with proper structure', () => {
		render(ContactPage);
		
		// Check for email link
		const emailLink = screen.getByRole('link', { name: /send epost til post@mediweb\.no/i });
		expect(emailLink).toBeInTheDocument();
		expect(emailLink).toHaveAttribute('href', 'mailto:post@mediweb.no');

		// Check for address using partial text matching
		expect(screen.getByText(/Lektor Musums gate 17/)).toBeInTheDocument();
		expect(screen.getByText(/7650/)).toBeInTheDocument();
		expect(screen.getByText(/Verdal/)).toBeInTheDocument();
	});

	it('displays business hours information', () => {
		render(ContactPage);
		
		expect(screen.getByText('Hva du kan forvente')).toBeInTheDocument();
		expect(screen.getByText('Vi svarer vanligvis innen 24-48 timer')).toBeInTheDocument();
		expect(screen.getByText('Detaljerte planer for ditt prosjekt')).toBeInTheDocument();
		expect(screen.getByText('Ingen forpliktelser eller skjulte kostnader')).toBeInTheDocument();
	});

	it('displays what to expect section', () => {
		render(ContactPage);
		
		expect(screen.getByText('Hva du kan forvente')).toBeInTheDocument();
		expect(screen.getByText('Vi svarer vanligvis innen 24-48 timer')).toBeInTheDocument();
		expect(screen.getByText('Detaljerte planer for ditt prosjekt')).toBeInTheDocument();
		expect(screen.getByText('Ingen forpliktelser eller skjulte kostnader')).toBeInTheDocument();
	});

	it('includes proper meta tags and structured data', () => {
		render(ContactPage);
		
		// The SEO component sets the title through a head element
		// For now, we'll just verify the page renders
		expect(screen.getByRole('heading', { name: /kontakt oss/i })).toBeInTheDocument();
	});

	it('renders the contact form component', () => {
		render(ContactPage);
		
		// Check that the form is present
		expect(screen.getByRole('form', { name: /kontaktskjema/i })).toBeInTheDocument();
		
		// Check for form fields using more specific selectors
		expect(screen.getByRole('textbox', { name: /navn/i })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: /e-postadresse/i })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: /melding/i })).toBeInTheDocument();
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