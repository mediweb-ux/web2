<script lang="ts">
	import Button from './Button.svelte';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	export let selectedService: string = '';

	interface FormData {
		name: string;
		email: string;
		service: string;
		message: string;
	}

	interface FormErrors {
		name?: string;
		email?: string;
		service?: string;
		message?: string;
	}

	let formData: FormData = {
		name: '',
		email: '',
		service: '',
		message: ''
	};

	let errors: FormErrors = {};
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let submitMessage = '';

	const services = [
		{ value: '', label: 'Select a service' },
		{ value: 'web-development', label: 'Web Development' },
		{ value: 'medical-services', label: 'Medical Services' },
		{ value: 'courses', label: 'Courses' }
	];

	// Handle server-side form results
	$: if (page.form) {
		if (page.form.success) {
			submitStatus = 'success';
			submitMessage = page.form.message;
			// Reset form on success
			formData = { name: '', email: '', service: selectedService || '', message: '' };
			errors = {};
		} else if (page.form.errors) {
			errors = page.form.errors;
			submitStatus = 'error';
			if (page.form.data) {
				formData = { ...formData, ...page.form.data };
			}
		} else if (page.form.error) {
			submitStatus = 'error';
			submitMessage = page.form.error;
		}
	}

	// Set the selected service when component mounts or selectedService prop changes
	onMount(() => {
		if (selectedService) {
			formData.service = selectedService;
		}
	});

	$: if (selectedService && formData.service !== selectedService) {
		formData.service = selectedService;
	}

	function validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function validateForm(): boolean {
		errors = {};

		if (!formData.name.trim()) {
			errors.name = 'Name is required';
		} else if (formData.name.trim().length < 2) {
			errors.name = 'Name must be at least 2 characters';
		}

		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!validateEmail(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		if (!formData.service) {
			errors.service = 'Please select a service';
		}

		if (!formData.message.trim()) {
			errors.message = 'Message is required';
		} else if (formData.message.trim().length < 10) {
			errors.message = 'Message must be at least 10 characters';
		}

		return Object.keys(errors).length === 0;
	}

	function clearFieldError(field: keyof FormErrors) {
		if (errors[field]) {
			errors = { ...errors };
			delete errors[field];
		}
	}

	function handleClientSideSubmit(event: Event) {
		// Only prevent default if JavaScript validation fails
		if (!validateForm()) {
			event.preventDefault();
			// Focus on first error field
			const firstErrorField = Object.keys(errors)[0];
			if (firstErrorField) {
				const element = document.getElementById(firstErrorField);
				element?.focus();
			}
			return false;
		}
		
		// Clear any previous client-side errors since server will handle validation
		errors = {};
		submitStatus = 'idle';
		return true;
	}
</script>

<form
	method="POST" 
	on:submit={handleClientSideSubmit} 
	use:enhance={({ formElement: enhanceFormElement, formData: _formData, action: _action, cancel: _cancel, submitter: _submitter }: {
		formElement: HTMLFormElement;
		formData: FormData;
		action: URL;
		cancel: () => void;
		submitter: HTMLElement | null;
	}) => {
		isSubmitting = true;
		submitStatus = 'idle';
		
		return async ({ result, update }: {
			result: any;
			update: () => Promise<void>;
		}) => {
			isSubmitting = false;
			
			if (result.type === 'success') {
				submitStatus = 'success';
				submitMessage = String(result.data?.['message'] || 'Thank you for your message! We\'ll get back to you soon.');
				// Reset form
				enhanceFormElement.reset();
				formData = { name: '', email: '', service: selectedService || '', message: '' };
				errors = {};
			} else if (result.type === 'failure') {
				submitStatus = 'error';
				if (result.data?.['errors']) {
					errors = result.data['errors'];
				}
				if (result.data?.['error']) {
					submitMessage = String(result.data['error']);
				}
			} else {
				submitStatus = 'error';
				submitMessage = 'Sorry, there was an error sending your message. Please try again.';
			}
			
			await update();
		};
	}}
	class="space-y-6" 
	novalidate 
	aria-label="Contact form"
>
	{#if submitStatus === 'success'}
		<div class="p-4 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800" role="alert" aria-live="polite">
			<div class="flex">
				<svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
				</svg>
				<p class="ml-3 text-sm text-green-700 dark:text-green-300">{submitMessage}</p>
			</div>
		</div>
	{/if}

	{#if submitStatus === 'error'}
		<div class="p-4 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800" role="alert" aria-live="polite">
			<div class="flex">
				<svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L10 10.414l1.707-1.707a1 1 0 111.414 1.414L11.414 12l1.707 1.707a1 1 0 01-1.414 1.414L10 13.414l-1.707 1.707a1 1 0 01-1.414-1.414L8.586 12 6.879 10.293a1 1 0 011.414-1.414L10 10.586l1.707-1.707z" clip-rule="evenodd" />
				</svg>
				<p class="ml-3 text-sm text-red-700 dark:text-red-300">{submitMessage}</p>
			</div>
		</div>
	{/if}

	<div>
		<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
			Name <span class="text-red-500" aria-label="required">*</span>
		</label>
		<input
			type="text"
			id="name"
			name="name"
			bind:value={formData.name}
			on:input={() => clearFieldError('name')}
			class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
			class:border-red-500={errors.name}
			class:focus:ring-red-500={errors.name}
			class:focus:border-red-500={errors.name}
			aria-invalid={errors.name ? 'true' : 'false'}
			aria-describedby={errors.name ? 'name-error' : undefined}
			aria-required="true"
			required
		/>
		{#if errors.name}
			<p id="name-error" class="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
				{errors.name}
			</p>
		{/if}
	</div>

	<div>
		<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
			Email <span class="text-red-500" aria-label="required">*</span>
		</label>
		<input
			type="email"
			id="email"
			name="email"
			bind:value={formData.email}
			on:input={() => clearFieldError('email')}
			class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
			class:border-red-500={errors.email}
			class:focus:ring-red-500={errors.email}
			class:focus:border-red-500={errors.email}
			aria-invalid={errors.email ? 'true' : 'false'}
			aria-describedby={errors.email ? 'email-error' : undefined}
			aria-required="true"
			required
		/>
		{#if errors.email}
			<p id="email-error" class="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
				{errors.email}
			</p>
		{/if}
	</div>

	<div>
		<label for="service" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
			Service Interest <span class="text-red-500" aria-label="required">*</span>
		</label>
		<select
			id="service"
			name="service"
			bind:value={formData.service}
			on:change={() => clearFieldError('service')}
			class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
			class:border-red-500={errors.service}
			class:focus:ring-red-500={errors.service}
			class:focus:border-red-500={errors.service}
			aria-invalid={errors.service ? 'true' : 'false'}
			aria-describedby={errors.service ? 'service-error' : undefined}
			aria-required="true"
			required
		>
			{#each services as service}
				<option value={service.value}>{service.label}</option>
			{/each}
		</select>
		{#if errors.service}
			<p id="service-error" class="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
				{errors.service}
			</p>
		{/if}
	</div>

	<div>
		<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
			Message <span class="text-red-500" aria-label="required">*</span>
		</label>
		<textarea
			id="message"
			name="message"
			rows="4"
			bind:value={formData.message}
			on:input={() => clearFieldError('message')}
			class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
			class:border-red-500={errors.message}
			class:focus:ring-red-500={errors.message}
			class:focus:border-red-500={errors.message}
			aria-invalid={errors.message ? 'true' : 'false'}
			aria-describedby={errors.message ? 'message-error' : undefined}
			placeholder="Tell us about your project or inquiry..."
			aria-required="true"
			required
		></textarea>
		{#if errors.message}
			<p id="message-error" class="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
				{errors.message}
			</p>
		{/if}
	</div>

	<div>
		<Button
			type="submit"
			variant="primary"
			size="lg"
			disabled={isSubmitting}
			loading={isSubmitting}
			ariaLabel={isSubmitting ? 'Sending message...' : 'Send message'}
		>
			{isSubmitting ? 'Sending...' : 'Send Message'}
		</Button>
	</div>
</form>