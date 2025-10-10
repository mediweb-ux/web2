# Email Configuration with Resend

This project uses [Resend](https://resend.com) for sending contact form emails.

## Setup

1. **Create a Resend account** at [resend.com](https://resend.com)

2. **Get your API key** from the Resend dashboard

3. **Configure environment variables** in your `.env.local` file:

```env
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_CONTACT_EMAIL=contact@yourdomain.com
```

## Email Flow

When a user submits the contact form:

1. **Business Notification Email** - Sent to `RESEND_TO_CONTACT_EMAIL`
   - Contains all form details
   - Formatted for easy reading
   - Includes customer's email for direct reply

2. **Customer Confirmation Email** - Sent to the customer
   - Confirms receipt of their message
   - Sets expectations for response time
   - Includes their original message for reference

## Email Templates

Both emails use HTML templates with:
- Professional styling
- Responsive design
- Clear information hierarchy
- Brand-consistent colors

## Error Handling

- Failed email sends return appropriate error messages
- Fallback contact information provided to users
- Server-side validation prevents spam

## Domain Configuration

For production use, you'll need to:
1. Verify your sending domain in Resend
2. Set up SPF, DKIM, and DMARC records
3. Update the `RESEND_FROM_EMAIL` to use your verified domain

## Testing

During development, emails are sent using the dummy API key. Replace with your actual Resend API key for testing real email delivery.