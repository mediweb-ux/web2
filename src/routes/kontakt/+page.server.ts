import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const email = data.get('email') as string;
		const service = data.get('service') as string;
		const message = data.get('message') as string;

		// Validation
		const errors: Record<string, string> = {};

		if (!name?.trim()) {
			errors.name = 'Name is required';
		} else if (name.trim().length < 2) {
			errors.name = 'Name must be at least 2 characters';
		}

		if (!email?.trim()) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			errors.email = 'Please enter a valid email address';
		}

		if (!service) {
			errors.service = 'Please select a service';
		}

		if (!message?.trim()) {
			errors.message = 'Message is required';
		} else if (message.trim().length < 10) {
			errors.message = 'Message must be at least 10 characters';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, {
				errors,
				data: { name, email, service, message }
			});
		}

		// Here you would typically send the email or save to database
		// For now, we'll simulate a successful submission
		try {
			// Simulate processing time
			await new Promise(resolve => setTimeout(resolve, 500));
			
			// In a real application, you would:
			// - Send email using a service like SendGrid, Mailgun, etc.
			// - Save to database
			// - Send confirmation email to user
			
			console.log('Contact form submission:', { name, email, service, message });
			
			return {
				success: true,
				message: 'Thank you for your message! We\'ll get back to you soon.'
			};
		} catch (error) {
			return fail(500, {
				error: 'Sorry, there was an error sending your message. Please try again.',
				data: { name, email, service, message }
			});
		}
	}
};