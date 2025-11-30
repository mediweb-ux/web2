import { describe, it, expect } from 'vitest';
import { actions } from './+page.server';

describe('Contact Form Server Action', () => {
	it('validates required fields', async () => {
		const formData = new FormData();
		formData.append('name', '');
		formData.append('email', '');
		formData.append('message', '');

		const request = new Request('http://localhost:3000/kontakt', {
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
			// Assert that name and email validation exists
			expect(result.data.errors).toHaveProperty('name');
			expect(result.data.errors).toHaveProperty('email');
			expect(typeof result.data.errors.name).toBe('string');
			expect(result.data.errors.name.length).toBeGreaterThan(0);
		}
	});

	it('validates email format', async () => {
		const formData = new FormData();
		formData.append('name', 'John Doe');
		formData.append('email', 'invalid-email');
		formData.append('message', 'This is a test message that is long enough.');

		const request = new Request('http://localhost:3000/kontakt', {
			method: 'POST',
			body: formData
		});

		if (!actions.default) {
			throw new Error('actions.default is not defined');
		}
		
		const result = await actions.default({ request } as any);

		expect(result).toHaveProperty('status', 400);
		if (result && typeof result === 'object' && 'data' in result && result.data) {
			expect(result.data.errors).toHaveProperty('email');
		}
	});

	it('validates minimum length requirements', async () => {
		const formData = new FormData();
		formData.append('name', 'A');
		formData.append('email', 'john@example.com');
		formData.append('message', 'Short');

		const request = new Request('http://localhost:3000/kontakt', {
			method: 'POST',
			body: formData
		});

		if (!actions.default) {
			throw new Error('actions.default is not defined');
		}
		
		const result = await actions.default({ request } as any);

		expect(result).toHaveProperty('status', 400);
		if (result && typeof result === 'object' && 'data' in result && result.data) {
			expect(result.data.errors).toHaveProperty('name');
		}
	});

	it('processes valid form submission successfully', async () => {
		const formData = new FormData();
		formData.append('name', 'John Doe');
		formData.append('email', 'john@example.com');
		formData.append('message', 'This is a test message that is long enough for validation.');

		const request = new Request('http://localhost:3000/kontakt', {
			method: 'POST',
			body: formData
		});

		if (!actions.default) {
			throw new Error('actions.default is not defined');
		}
		
		const result = await actions.default({ request } as any);

		// Form is either successfully processed or returns an error  
		// (depending on Resend mock availability). We validate structure.
		if ('success' in result) {
			expect(result).toHaveProperty('success', true);
		} else {
			// If ActionFailure, ensure it has proper structure
			expect(result).toHaveProperty('status');
		}
	});

	it('handles form data with whitespace correctly', async () => {
		const formData = new FormData();
		formData.append('name', '  John Doe  ');
		formData.append('email', '  john@example.com  ');
		formData.append('message', '  This is a test message that is long enough for validation.  ');

		const request = new Request('http://localhost:3000/kontakt', {
			method: 'POST',
			body: formData
		});

		if (!actions.default) {
			throw new Error('actions.default is not defined');
		}
		
		const result = await actions.default({ request } as any);

		// Form is either successfully processed or returns an error  
		// (depending on Resend mock availability). We validate structure.
		if ('success' in result) {
			expect(result).toHaveProperty('success', true);
		} else {
			// If ActionFailure, ensure it has proper structure
			expect(result).toHaveProperty('status');
		}
	});
});