import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import type { Actions } from './$types';

// Environment variables with fallbacks
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_dummy_api_key_replace_with_real_key';
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@mediweb.no';
const RESEND_TO_CONTACT_EMAIL = process.env.RESEND_TO_CONTACT_EMAIL || 'post@mediweb.no';

const resend = new Resend(RESEND_API_KEY);

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const email = data.get('email') as string;
		const services = data.getAll('services') as string[];
		const message = data.get('message') as string;

		// Validation
		const errors: Record<string, string> = {};

		if (!name?.trim()) {
			errors.name = 'Navn er påkrevd';
		} else if (name.trim().length < 2) {
			errors.name = 'Navn må fylles ut og være minst 2 tegn';
		}

		if (!email?.trim()) {
			errors.email = 'E-post er påkrevd';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			errors.email = 'Vennligst skriv inn en gyldig e-postadresse';
		}

		if (!services || services.length === 0) {
			errors.services = 'Vennligst velg en eller flere tjenester';
		}

		if (!message?.trim()) {
			errors.message = 'Melding er påkrevd';
		} else if (message.trim().length < 10) {
			errors.message = 'Du må fylle ut feltet med meldingen din';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, {
				errors,
				data: { name, email, services, message }
			});
		}

		try {
			// Debug: Log environment variables (remove in production)
			console.log('RESEND_API_KEY:', RESEND_API_KEY ? 'Set' : 'Not set');
			console.log('RESEND_FROM_EMAIL:', RESEND_FROM_EMAIL);
			console.log('RESEND_TO_CONTACT_EMAIL:', RESEND_TO_CONTACT_EMAIL);

			// Map service values to readable names
			const serviceNames = services.map(service => {
				switch (service) {
					case 'webutvikling': return 'Webutvikling';
					case 'legetjenester': return 'Legetjenester';
					case 'kursvirksomhet': return 'Kursvirksomhet';
					case 'annet': return 'Annet';
					default: return service;
				}
			});

			// Send notification email to business
			console.log('Attempting to send business email...');
			const businessEmailResult = await resend.emails.send({
				from: RESEND_FROM_EMAIL,
				to: [RESEND_TO_CONTACT_EMAIL],
				subject: `Ny henvendelse fra ${name}`,
				html: `
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
							Ny kontaktforespørsel
						</h2>
						
						<div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
							<h3 style="margin-top: 0; color: #374151;">Kontaktinformasjon</h3>
							<p><strong>Navn:</strong> ${name}</p>
							<p><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
							<p><strong>Interessert i følgende tjeneste(r):</strong> ${serviceNames.join(', ')}</p>
						</div>

						<div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
							<h3 style="margin-top: 0; color: #374151;">Melding</h3>
							<p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
						</div>

						<div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px; border-left: 4px solid #2563eb;">
							<p style="margin: 0; color: #1e40af; font-size: 14px;">
								<strong>Tips:</strong> Svar på denne e-posten for å kontakte kunden direkte.
							</p>
						</div>
					</div>
				`
			});

			console.log('Business email result:', businessEmailResult);

			// Send confirmation email to customer
			console.log('Attempting to send customer email...');
			const customerEmailResult = await resend.emails.send({
				from: RESEND_FROM_EMAIL,
				to: [email],
				subject: 'Takk for din henvendelse - MediWeb Solutions',
				html: `
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #e5e7eb;">
							<h1 style="color: #2563eb; margin: 0;">MediWeb Solutions</h1>
						</div>

						<div style="padding: 30px 0;">
							<h2 style="color: #374151;">Hei ${name}!</h2>
							
							<p style="color: #6b7280; line-height: 1.6;">
								Takk for din henvendelse. Vi har mottatt meldingen din og vil svare så snart som mulig, 
								vanligvis innen 24-48 timer.
							</p>

							<div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
								<h3 style="margin-top: 0; color: #374151;">Din henvendelse</h3>
								<p><strong>Tjeneste(r) du er interessert i:</strong> ${serviceNames.join(', ')}</p>
								<p><strong>Din melding:</strong></p>
								<p style="white-space: pre-wrap; line-height: 1.6; color: #6b7280;">${message}</p>
							</div>

							<div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
								<h3 style="margin-top: 0; color: #1e40af;">Hva skjer nå?</h3>
								<ul style="color: #1e40af; margin: 0; padding-left: 20px;">
									<li>Vi gjennomgår din henvendelse grundig</li>
									<li>Vi forbereder et skreddersydd forslag for ditt prosjekt</li>
									<li>Du hører fra oss innen 24-48 timer</li>
								</ul>
							</div>

							<p style="color: #6b7280; line-height: 1.6; margin-top: 30px;">
								Har du spørsmål i mellomtiden? Du kan svare direkte på denne e-posten eller 
								kontakte oss på <a href="mailto:post@mediweb.no" style="color: #2563eb;">post@mediweb.no</a>.
							</p>
						</div>

						<div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px;">
							<p>Med vennlig hilsen,<br><strong>MediWeb Solutions</strong></p>
							<p>Lektor Musums gate 17, 7650 Verdal</p>
						</div>
					</div>
				`
			});

			console.log('Customer email result:', customerEmailResult);

			// Check if both emails were sent successfully
			if (businessEmailResult.error || customerEmailResult.error) {
				console.error('Email sending errors:', {
					business: businessEmailResult.error,
					customer: customerEmailResult.error
				});
				throw new Error('Feil ved sending av en eller flere e-poster');
			}

			return {
				success: true,
				message: 'Takk for meldingen din! Vi har sendt deg en bekreftelse på e-post og vil svare deg så snart som mulig.'
			};

		} catch (error) {
			// Log error for debugging (in production, use proper logging)
			console.error('Email sending error:', error);
			
			return fail(500, {
				error: 'Beklager, det oppsto en feil under innsending av meldingen din. Vennligst forsøk igjen eller kontakt oss direkte på post@mediweb.no.',
				data: { name, email, services, message }
			});
		}
	}
};