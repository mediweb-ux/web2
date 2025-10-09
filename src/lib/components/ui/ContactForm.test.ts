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
		
		expect(container.querySelector('label[for="name"]')).toHaveTextContent('Name');
		expect(container.querySelector('label[for="email"]')).toHaveTextContent('Email');
		expect(container.querySelector('label[for="service"]')).toHaveTextContent('Service Interest');
		expect(container.querySelector('label[for="message"]')).toHaveTextContent('Message');
	});

	it('marks required fields with asterisk', () => {
		const { container } = render(ContactForm);
		
		const requiredIndicators = container.querySelectorAll('span[aria-label="required"]');
		expect(requiredIndicators).toHaveLength(4);
	});

	it('has proper form attributes', () => {
		const { container } = render(ContactForm);
		
		const form = container.querySelector('form');
		expect(form).toHaveAttribute('aria-label', 'Contact form');
		expect(form).toHaveAttribute('novalidate');
		
		const nameInput = container.querySelector('#name');
		expect(nameInput).toHaveAttribute('required');
		expect(nameInput).toHaveAttribute('type', 'text');
		
		const emailInput = container.querySelector('#email');
		expect(emailInput).toHaveAttribute('required');
		expect(emailInput).toHaveAttribute('type', 'email');
		
		const serviceSelect = container.querySelector('#service');
		expect(serviceSelect).toHaveAttribute('required');
		
		const messageTextarea = container.querySelector('#message');
		expect(messageTextarea).toHaveAttribute('required');
	});

	it('shows validation errors for empty required fields', async () => {
		const { container } = render(ContactForm);
		
		const submitButton = container.querySelector('button[type="submit"]');
		await fireEvent.click(submitButton!);
		
		await waitFor(() => {
			expect(container.querySelector('#name-error')).toHaveTextContent('Name is required');
			expect(container.querySelector('#email-error')).toHaveTextContent('Email is required');
			expect(container.querySelector('#service-error')).toHaveTextContent('Please select a service');
			expect(container.querySelector('#message-error')).toHaveTextContent('Message is required');
		});
	});

	it('validates email format', async () => {
		const { container } = render(ContactForm);
		
		const emailInput = container.querySelector('#email') as HTMLInputElement;
		await fireEvent.input(emailInput, { target: { value: 'invalid-email' } });
		
		const submitButton = container.querySelector('button[type="submit"]');
		await fireEvent.click(submitButton!);
		
		await waitFor(() => {
			expect(container.querySelector('#email-error')).toHaveTextContent('Please enter a valid email address');
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
			expect(container.querySelector('#name-error')).toHaveTextContent('Name must be at least 2 characters');
			expect(container.querySelector('#message-error')).toHaveTextContent('Message must be at least 10 characters');
		});
	});

	it('allows valid form submission without client-side errors', async () => {
		const { container } = render(ContactForm);
		
		// Fill out form with valid data
		const nameInput = container.querySelector('#name') as HTMLInputElement;
		const emailInput = container.querySelector('#email') as HTMLInputElement;
		const serviceSelect = container.querySelector('#service') as HTMLSelectElement;
		const messageInput = container.querySelector('#message') as HTMLTextAreaElement;
		
		await fireEvent.input(nameInput, { target: { value: 'John Doe' } });
		await fireEvent.input(emailInput, { target: { value: 'john@example.com' } });
		await fireEvent.change(serviceSelect, { target: { value: 'web-development' } });
		await fireEvent.input(messageInput, { target: { value: 'This is a test message that is long enough.' } });
		
		// Verify no validation errors are shown
		expect(container.querySelector('#name-error')).not.toBeInTheDocument();
		expect(container.querySelector('#email-error')).not.toBeInTheDocument();
		expect(container.querySelector('#service-error')).not.toBeInTheDocument();
		expect(container.querySelector('#message-error')).not.toBeInTheDocument();
		
		// Verify form fields have correct values
		expect(nameInput.value).toBe('John Doe');
		expect(emailInput.value).toBe('john@example.com');
		expect(serviceSelect.value).toBe('web-development');
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