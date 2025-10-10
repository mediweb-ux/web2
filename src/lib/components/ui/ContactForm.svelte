<script lang="ts">
	import Button from './Button.svelte';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { Analytics } from '$lib/utils/analytics';

	export let selectedService: string = '';

	interface FormData {
		name: string;
		email: string;
		services: string[];
		message: string;
	}

	interface FormErrors {
		name?: string;
		email?: string;
		services?: string;
		message?: string;
	}

	let formData: FormData = {
		name: '',
		email: '',
		services: [],
		message: ''
	};

	let errors: FormErrors = {};
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let submitMessage = '';

	const services = [
		{ value: 'webutvikling', label: 'Webutvikling' },
		{ value: 'legetjenester', label: 'Legetjenester' },
		{ value: 'kursvirksomhet', label: 'Kursvirksomhet' },
		{ value: 'annet', label: 'Annet' }
	];

	// Handle server-side form results
	$: if (page.form) {
		if (page.form.success) {
			submitStatus = 'success';
			submitMessage = page.form.message;
			// Reset form on success
			formData = {
				name: '',
				email: '',
				services: selectedService ? [selectedService] : [],
				message: ''
			};
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
			formData.services = [selectedService];
			// Track service interest from URL parameter
			Analytics.trackServiceInterest(selectedService);
		}
		
		// Track contact form start when component loads
		Analytics.trackContactFormStart();
	});

	$: if (selectedService && !formData.services.includes(selectedService)) {
		formData.services = [selectedService];
	}

	function validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function validateForm(): boolean {
		errors = {};

		if (!formData.name.trim()) {
			errors.name = 'Navn er påkrevd';
		} else if (formData.name.trim().length < 2) {
			errors.name = 'Navn må fylles ut og være minst 2 tegn';
		}

		if (!formData.email.trim()) {
			errors.email = 'E-post er påkrevd';
		} else if (!validateEmail(formData.email)) {
			errors.email = 'Vennligst skriv inn en gyldig e-postadresse';
		}

		if (formData.services.length === 0) {
			errors.services = 'Vennligst velg en eller flere tjenester';
		}

		if (!formData.message.trim()) {
			errors.message = 'Melding er påkrevd';
		} else if (formData.message.trim().length < 10) {
			errors.message = 'Du må fylle ut feltet med meldingen din';
		}

		return Object.keys(errors).length === 0;
	}

	function clearFieldError(field: keyof FormErrors) {
		if (errors[field]) {
			errors = { ...errors };
			delete errors[field];
		}
	}

	function handleServiceChange(serviceValue: string, checked: boolean) {
		if (checked) {
			formData.services = [...formData.services, serviceValue];
			// Track service interest
			Analytics.trackServiceInterest(serviceValue);
		} else {
			formData.services = formData.services.filter((s) => s !== serviceValue);
		}
		clearFieldError('services');
	}

	function handleClientSideSubmit(event: Event) {
		// Only prevent default if JavaScript validation fails
		if (!validateForm()) {
			event.preventDefault();
			// Focus on first error field
			const firstErrorField = Object.keys(errors)[0];
			if (firstErrorField) {
				if (firstErrorField === 'services') {
					// Focus on first checkbox for services
					const firstCheckbox = document.querySelector(
						'input[name="services"]'
					) as HTMLInputElement;
					firstCheckbox?.focus();
				} else {
					const element = document.getElementById(firstErrorField);
					element?.focus();
				}
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
	use:enhance={({
		formElement: enhanceFormElement,
		formData: _formData,
		action: _action,
		cancel: _cancel,
		submitter: _submitter
	}: {
		formElement: HTMLFormElement;
		formData: FormData;
		action: URL;
		cancel: () => void;
		submitter: HTMLElement | null;
	}) => {
		isSubmitting = true;
		submitStatus = 'idle';

		return async ({ result, update }: { result: any; update: () => Promise<void> }) => {
			isSubmitting = false;

			if (result.type === 'success') {
				submitStatus = 'success';
				submitMessage = String(
					result.data?.['message'] ||
						'Takk for meldingen din! Vi vil nå se på den og svare deg så fort vi kan!'
				);
				
				// Track successful form completion
				Analytics.trackContactFormComplete(formData.services);
				Analytics.trackFormSubmission('contact_form', true);
				
				// Reset form
				enhanceFormElement.reset();
				formData = {
					name: '',
					email: '',
					services: selectedService ? [selectedService] : [],
					message: ''
				};
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
				submitMessage =
					'Beklager, det oppsto en feil under innsending av meldingen din. Vennligst forsøk igjen.';
				
				// Track failed form submission
				Analytics.trackFormSubmission('contact_form', false);
			}

			await update();
		};
	}}
	class="space-y-6"
	novalidate
	aria-label="Kontaktskjema"
>
	{#if submitStatus === 'success'}
		<div
			class="p-4 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800"
			role="alert"
			aria-live="polite"
		>
			<div class="flex">
				<svg
					class="w-5 h-5 text-green-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clip-rule="evenodd"
					/>
				</svg>
				<p class="ml-3 text-body-sm text-green-700 dark:text-green-300">{submitMessage}</p>
			</div>
		</div>
	{/if}

	{#if submitStatus === 'error'}
		<div
			class="p-4 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800"
			role="alert"
			aria-live="polite"
		>
			<div class="flex">
				<svg
					class="w-5 h-5 text-red-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L10 10.414l1.707-1.707a1 1 0 111.414 1.414L11.414 12l1.707 1.707a1 1 0 01-1.414 1.414L10 13.414l-1.707 1.707a1 1 0 01-1.414-1.414L8.586 12 6.879 10.293a1 1 0 011.414-1.414L10 10.586l1.707-1.707z"
						clip-rule="evenodd"
					/>
				</svg>
				<p class="ml-3 text-body-sm text-red-700 dark:text-red-300">{submitMessage}</p>
			</div>
		</div>
	{/if}

	<div>
		<label for="name" class="block text-body font-medium text-foreground mb-1">
			Navn <span class="text-destructive" aria-label="required">*</span>
		</label>
		<input
			type="text"
			id="name"
			name="name"
			bind:value={formData.name}
			on:input={() => clearFieldError('name')}
			class="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder:text-muted-foreground"
			class:border-destructive={errors.name}
			class:focus:ring-destructive={errors.name}
			class:focus:border-destructive={errors.name}
			aria-invalid={errors.name ? 'true' : 'false'}
			aria-describedby={errors.name ? 'name-error' : undefined}
			aria-required="true"
			required
		/>
		{#if errors.name}
			<p id="name-error" class="mt-1 text-body-sm text-destructive" role="alert">
				{errors.name}
			</p>
		{/if}
	</div>

	<div>
		<label for="email" class="block text-body font-medium text-foreground mb-1">
			E-postadresse <span class="text-destructive" aria-label="required">*</span>
		</label>
		<input
			type="email"
			id="email"
			name="email"
			bind:value={formData.email}
			on:input={() => clearFieldError('email')}
			class="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder:text-muted-foreground"
			class:border-destructive={errors.email}
			class:focus:ring-destructive={errors.email}
			class:focus:border-destructive={errors.email}
			aria-invalid={errors.email ? 'true' : 'false'}
			aria-describedby={errors.email ? 'email-error' : undefined}
			aria-required="true"
			required
		/>
		{#if errors.email}
			<p id="email-error" class="mt-1 text-body-sm text-destructive" role="alert">
				{errors.email}
			</p>
		{/if}
	</div>

	<div>
		<fieldset class="space-y-3">
			<legend class="block text-body font-medium text-foreground mb-3">
				Velg tjeneste(r) <span class="text-destructive" aria-label="required">*</span>
			</legend>

			<div
				class="space-y-3"
				role="group"
				aria-describedby={errors.services ? 'services-error' : undefined}
			>
				{#each services as service}
					<label
						class="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200 bg-card"
					>
						<input
							type="checkbox"
							name="services"
							value={service.value}
							checked={formData.services.includes(service.value)}
							on:change={(e) => handleServiceChange(service.value, e.currentTarget.checked)}
							class="w-4 h-4 text-primary bg-background border-input rounded focus:ring-2 focus:ring-ring"
							class:border-destructive={errors.services}
							class:focus:ring-destructive={errors.services}
							aria-invalid={errors.services ? 'true' : 'false'}
						/>
						<span class="text-body font-medium text-foreground select-none">
							{service.label}
						</span>
					</label>
				{/each}
			</div>
		</fieldset>

		{#if errors.services}
			<p id="services-error" class="mt-1 text-body-sm text-destructive" role="alert">
				{errors.services}
			</p>
		{/if}
	</div>

	<div>
		<label for="message" class="block text-body font-medium text-foreground mb-1">
			Melding <span class="text-destructive" aria-label="required">*</span>
		</label>
		<textarea
			id="message"
			name="message"
			rows="4"
			bind:value={formData.message}
			on:input={() => clearFieldError('message')}
			class="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder:text-muted-foreground"
			class:border-destructive={errors.message}
			class:focus:ring-destructive={errors.message}
			class:focus:border-destructive={errors.message}
			aria-invalid={errors.message ? 'true' : 'false'}
			aria-describedby={errors.message ? 'message-error' : undefined}
			placeholder="Fortell om ditt prosjekt eller spørsmål..."
			aria-required="true"
			required
		></textarea>
		{#if errors.message}
			<p id="message-error" class="mt-1 text-body-sm text-destructive" role="alert">
				{errors.message}
			</p>
		{/if}
	</div>

	<!-- Hidden inputs for selected services to ensure proper form submission -->
	{#each formData.services as selectedServiceValue}
		<input type="hidden" name="services" value={selectedServiceValue} />
	{/each}

	<div>
		<Button
			type="submit"
			variant="primary"
			size="lg"
			disabled={isSubmitting}
			loading={isSubmitting}
			ariaLabel={isSubmitting ? 'Sender melding...' : 'Send melding'}
		>
			{isSubmitting ? 'Sender...' : 'Send melding'}
		</Button>
	</div>
</form>
