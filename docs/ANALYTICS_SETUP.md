# Google Analytics Setup

This project includes a comprehensive Google Analytics 4 (GA4) implementation with privacy compliance and detailed event tracking.

## Setup

1. **Create a Google Analytics 4 property** at [analytics.google.com](https://analytics.google.com)

2. **Get your Measurement ID** (format: G-XXXXXXXXXX)

3. **Configure environment variables** in your `.env.local` file:

```env
GA_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID_HERE
```

## Features

### 🔒 **Privacy Compliant**

- Cookie consent banner with accept/decline options
- Analytics only loads after user consent
- Respects user privacy choices
- GDPR/CCPA compliant implementation

### 📊 **Comprehensive Tracking**

#### **Automatic Tracking:**

- Page views on route changes
- User sessions and engagement
- Bounce rate and session duration

#### **Custom Event Tracking:**

- **Navigation**: Header logo clicks, menu navigation
- **Contact Form**: Form start, service selection, completion/failure
- **Button Clicks**: CTA buttons with custom tracking names
- **Service Interest**: When users select services
- **External Links**: Clicks to external websites
- **File Downloads**: PDF downloads, etc.

### 🎯 **Event Categories**

#### **Contact Form Events:**

- `contact_form_start` - User starts filling the form
- `contact_form_complete` - Successful form submission
- `form_submit` - Form submission attempt (success/failure)
- `service_interest` - User selects a service

#### **Navigation Events:**

- `navigation` - Menu clicks and page navigation
- `button_click` - CTA and action button clicks
- `external_link_click` - External website clicks

#### **Privacy Events:**

- `cookie_consent_accepted` - User accepts analytics cookies
- `privacy_policy_clicked` - Privacy policy link clicks

## Implementation Details

### **Components:**

1. **GoogleAnalytics.svelte** - Main GA4 integration
2. **CookieConsent.svelte** - Privacy-compliant consent banner
3. **Analytics utility** - Helper functions for event tracking

### **Usage Examples:**

```typescript
import { Analytics } from '$lib/utils/analytics';

// Track custom events
Analytics.trackEvent('custom_event', {
	category: 'engagement',
	value: 1
});

// Track button clicks
Analytics.trackButtonClick('cta_button', '/contact');

// Track form interactions
Analytics.trackContactFormStart();
Analytics.trackContactFormComplete(['webutvikling', 'legetjenester']);
```

### **Button Tracking:**

Add `trackingName` prop to Button components:

```svelte
<Button href="/contact" trackingName="hero_cta" variant="primary">Get Started</Button>
```

## Data Privacy

### **Cookie Consent:**

- Users can accept or decline analytics cookies
- Consent is stored in localStorage
- Analytics only runs with user consent
- Consent version tracking for policy updates

### **Data Collection:**

- Only anonymized data is collected
- No personally identifiable information (PII)
- IP addresses are anonymized
- Respects Do Not Track headers

### **Compliance:**

- GDPR compliant with explicit consent
- CCPA compliant with opt-out option
- Cookie policy integration ready
- Privacy policy link included

## Analytics Dashboard

### **Key Metrics to Monitor:**

- Page views and unique visitors
- Contact form conversion rate
- Service interest by type
- User journey and drop-off points
- Mobile vs desktop usage
- Traffic sources and campaigns

### **Custom Reports:**

Set up custom reports in GA4 for:

- Contact form funnel analysis
- Service interest tracking
- Button click performance
- User engagement by page

## Testing

### **Development:**

- Uses dummy measurement ID in development
- Console warnings for missing consent
- Event tracking works without GA4 connection

### **Production:**

- Replace dummy ID with real measurement ID
- Verify event tracking in GA4 Real-time reports
- Test cookie consent flow
- Validate privacy compliance

## Troubleshooting

### **Common Issues:**

1. **Events not showing**: Check measurement ID and consent status
2. **Consent not working**: Verify localStorage and browser compatibility
3. **Missing events**: Check Analytics utility imports and function calls

### **Debug Mode:**

Enable GA4 debug mode by adding to the measurement ID configuration:

```javascript
gtag('config', 'GA_MEASUREMENT_ID', {
	debug_mode: true
});
```
