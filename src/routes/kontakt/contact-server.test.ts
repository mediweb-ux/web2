import { describe, it, expect } from 'vitest';
import { actions } from './+page.server';

describe('Contact Form Server Action', () => {
	it('validates required fields', async () => {
		const formData = new FormData();
		formData.append('name', '');
		formData.append('email', '');
		formData.append('service', '');
		formData.append('message', '');

		const request = new Request('http://localhost:3000/contact', {
			method: 'POST',
			body: formData
		});

		if (!actions.default) {
			throw new Error('actions.default is not defined');
		}
		
		const result = await actions.default({ request } as any);

		expect(result).toHaveProperty('status', 400);
		expect(result).toHaveProperty('data');
		if (result && typeof result === 'object' && 'data' in result && result.data) {
			expect(result.data.errors).toHaveProperty('name', 'Name is required');
			expect(result.data.errors).toHaveProperty('email', 'Email is required');
			expect(result.data.errors).toHaveProperty('service', 'Please select a service');
			expect(result.data.errors).toHaveProperty('message', 'Message is required');
		}
	});

	it('validates email format', async () => {
		const formData = new FormData();
		formData.append('name', 'John Doe');
		formData.append('email', 'invalid-email');
		formData.append('service', 'web-development');
		formData.append('message', 'This is a test message that is long enough.');

		const request = new Request('http://localhost:3000/contact', {
			method: 'POST',
			body: formData
		});

		if (!actions.default) {
			throw new Error('actions.default is not defined');
		}
		
		const result = await actions.default({ request } as any);

		expect(result).toHaveProperty('status', 400);
		if (result && typeof result === 'object' && 'data' in result && result.data) {
			expect(result.data.errors).toHaveProperty('email', 'Please enter a valid email address');
		}
	});

	it('validates minimum length requirements', async () => {
		const formData = new FormData();
		formData.append('name', 'A');
		formData.append('email', 'john@example.com');
		formData.append('service', 'web-development');
		formData.append('message', 'Short');

		const request = new Request('http://localhost:3000/contact', {
			method: 'POST',
			body: formData
		});

		if (!actions.default) {
			throw new Error('actions.default is not defined');
		}
		
		const result = await actions.default({ request } as any);

		expect(result).toHaveProperty('status', 400);
		if (result && typeof result === 'object' && 'data' in result && result.data) {
			expect(result.data.errors).toHaveProperty('name', 'Name must be at least 2 characters');
			expect(result.data.errors).toHaveProperty('message', 'Message must be at least 10 characters');
		}
	});

	it('processes valid form submission successfully', async () => {
		const formData = new FormData();
		formData.append('name', 'John Doe');
		formData.append('email', 'john@example.com');
		formData.append('service', 'web-development');
		formData.append('message', 'This is a test message that is long enough for validation.');

		const request = new Request('http://localhost:3000/contact', {
			method: 'POST',
			body: formData
		});

		if (!actions.default) {
			throw new Error('actions.default is not defined');
		}
		
		const result = await actions.default({ request } as any);

		expect(result).toHaveProperty('success', true);
		expect(result).toHaveProperty('message', 'Thank you for your message! We\'ll get back to you soon.');
	});

	it('handles form data with whitespace correctly', async () => {
		const formData = new FormData();
		formData.append('name', '  John Doe  ');
		formData.append('email', '  john@example.com  ');
		formData.append('service', 'web-development');
		formData.append('message', '  This is a test message that is long enough for validation.  ');

		const request = new Request('http://localhost:3000/contact', {
			method: 'POST',
			body: formData
		});

		if (!actions.default) {
			throw new Error('actions.default is not defined');
		}
		
		const result = await actions.default({ request } as any);

		expect(result).toHaveProperty('success', true);
		expect(result).toHaveProperty('message', 'Thank you for your message! We\'ll get back to you soon.');
	});
});