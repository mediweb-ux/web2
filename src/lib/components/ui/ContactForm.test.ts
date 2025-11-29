import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import ContactForm from './ContactForm.svelte';

expect.extend(toHaveNoViolations);

// Mock the $app/stores and $app/forms modules
vi.mock('$app/stores', () => ({
	page: {
		subscribe: vi.fn((callback: any) => {
			callback({
				url: new URL('http://localhost:3000/contact'),
				params: {},
				route: { id: '/contact' },
				form: null
			});
			return () => {};
		})
	}
}));

vi.mock('$app/forms', () => ({
	enhance: vi.fn(() => {
		return (_node: HTMLFormElement) => {
			return {
				destroy: () => {}
			};
		};
	})
}));

describe('ContactForm Component', () => {
	it('renders all form fields', () => {
		const { container } = render(ContactForm);
		
		expect(container.querySelector('#name')).toBeInTheDocument();
		expect(container.querySelector('#email')).toBeInTheDocument();
		expect(container.querySelector('#service')).toBeInTheDocument();
		expect(container.querySelector('#message')).toBeInTheDocument();
		expect(container.querySelector('button[type="submit"]')).toBeInTheDocument();
	});

	it('has proper form labels', () => {
		const { container } = render(ContactForm);
		
		expect(container.querySelector('label[for="name"]')).toHaveTextContent('Navn');
		expect(container.querySelector('label[for="email"]')).toHaveTextContent('E-postadresse');
		expect(container.querySelector('legend')).toHaveTextContent('Velg tjeneste(r)');
		expect(container.querySelector('label[for="message"]')).toHaveTextContent('Melding');
	});

	it('marks required fields with asterisk', () => {
		const { container } = render(ContactForm);
		
		const requiredIndicators = container.querySelectorAll('span[aria-label="required"]');
		expect(requiredIndicators).toHaveLength(4);
	});

	it('has proper form attributes', () => {
		const { container } = render(ContactForm);
		
		const form = container.querySelector('form');
		expect(form).toHaveAttribute('aria-label', 'Kontaktskjema');
		expect(form).toHaveAttribute('novalidate');
		
		const nameInput = container.querySelector('#name');
		expect(nameInput).toHaveAttribute('required');
		expect(nameInput).toHaveAttribute('type', 'text');
		
		const emailInput = container.querySelector('#email');
		expect(emailInput).toHaveAttribute('required');
		expect(emailInput).toHaveAttribute('type', 'email');
		
		const serviceCheckboxes = container.querySelectorAll('input[name="services"]');
		expect(serviceCheckboxes.length).toBeGreaterThan(0);
		
		const messageTextarea = container.querySelector('#message');
		expect(messageTextarea).toHaveAttribute('required');
	});

	it('shows validation errors for empty required fields', async () => {
		const { container } = render(ContactForm);
		
		const submitButton = container.querySelector('button[type="submit"]');
		await fireEvent.click(submitButton!);
		
		await waitFor(() => {
			expect(container.querySelector('#name-error')).toHaveTextContent('Navn er påkrevd');
			expect(container.querySelector('#email-error')).toHaveTextContent('E-post er påkrevd');
			expect(container.querySelector('#services-error')).toHaveTextContent('Vennligst velg en eller flere tjenester');
			expect(container.querySelector('#message-error')).toHaveTextContent('Melding er påkrevd');
		});
	});

	it('validates email format', async () => {
		const { container } = render(ContactForm);
		
		const emailInput = container.querySelector('#email') as HTMLInputElement;
		await fireEvent.input(emailInput, { target: { value: 'invalid-email' } });
		
		const submitButton = container.querySelector('button[type="submit"]');
		await fireEvent.click(submitButton!);
		
		await waitFor(() => {
			expect(container.querySelector('#email-error')).toHaveTextContent('Vennligst skriv inn en gyldig e-postadresse');
		});
	});

	it('validates minimum length requirements', async () => {
		const { container } = render(ContactForm);
		
		const nameInput = container.querySelector('#name') as HTMLInputElement;
		const messageInput = container.querySelector('#message') as HTMLTextAreaElement;
		
		await fireEvent.input(nameInput, { target: { value: 'A' } });
		await fireEvent.input(messageInput, { target: { value: 'Short' } });
		
		const submitButton = container.querySelector('button[type="submit"]');
		await fireEvent.click(submitButton!);
		
		await waitFor(() => {
			expect(container.querySelector('#name-error')).toHaveTextContent('Navn må fylles ut og være minst 2 tegn');
			expect(container.querySelector('#message-error')).toHaveTextContent('Du må fylle ut feltet med meldingen din');
		});
	});

	it('allows valid form submission without client-side errors', async () => {
		const { container } = render(ContactForm);
		
		// Fill out form with valid data
		const nameInput = container.querySelector('#name') as HTMLInputElement;
		const emailInput = container.querySelector('#email') as HTMLInputElement;
		const serviceCheckbox = container.querySelector('input[name="services"]') as HTMLInputElement;
		const messageInput = container.querySelector('#message') as HTMLTextAreaElement;
		
		await fireEvent.input(nameInput, { target: { value: 'John Doe' } });
		await fireEvent.input(emailInput, { target: { value: 'john@example.com' } });
		await fireEvent.click(serviceCheckbox);
		await fireEvent.input(messageInput, { target: { value: 'This is a test message that is long enough.' } });
		
		// Verify no validation errors are shown
		expect(container.querySelector('#name-error')).not.toBeInTheDocument();
		expect(container.querySelector('#email-error')).not.toBeInTheDocument();
		expect(container.querySelector('#services-error')).not.toBeInTheDocument();
		expect(container.querySelector('#message-error')).not.toBeInTheDocument();
		
		// Verify form fields have correct values
		expect(nameInput.value).toBe('John Doe');
		expect(emailInput.value).toBe('john@example.com');
		expect(messageInput.value).toBe('This is a test message that is long enough.');
	});

	it('has proper ARIA attributes for error states', async () => {
		const { container } = render(ContactForm);
		
		const submitButton = container.querySelector('button[type="submit"]');
		await fireEvent.click(submitButton!);
		
		await waitFor(() => {
			const nameInput = container.querySelector('#name');
			expect(nameInput).toHaveAttribute('aria-invalid', 'true');
			expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
			
			const errorMessage = container.querySelector('#name-error');
			expect(errorMessage).toHaveAttribute('role', 'alert');
		});
	});

	it('should not have accessibility violations - empty form', async () => {
		const { container } = render(ContactForm);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('should not have accessibility violations - form with errors', async () => {
		const { container } = render(ContactForm);
		
		const submitButton = container.querySelector('button[type="submit"]');
		await fireEvent.click(submitButton!);
		
		await waitFor(() => {
			expect(container.querySelector('#name-error')).toBeInTheDocument();
		});
		
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});