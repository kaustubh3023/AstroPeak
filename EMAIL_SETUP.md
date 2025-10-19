# Email Service Setup Guide

This guide will help you configure the email service for your Shri Shrree Astro Consultancy website.

## Prerequisites

1. A Gmail account (or any SMTP-compatible email service)
2. App password for your email account (for Gmail)

## Gmail Setup (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### Step 2: Generate App Password
1. In Security settings, find "App passwords"
2. Select "Mail" and your device
3. Copy the generated 16-character password

### Step 3: Configure Environment Variables
Create a `.env` file in your project root with the following variables:

```env
# Email Service Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password

# Admin email address where form submissions will be sent
ADMIN_EMAIL=thebatraanumerology@gmail.com

# Other Environment Variables
NODE_ENV=development
```

## Alternative Email Services

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### Custom SMTP Server
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

## Features

The email service includes:

1. **Contact Form Emails**: Sends form submissions to admin and confirmation to user
2. **Service Request Emails**: Sends detailed service requests to admin and confirmation to user
3. **Welcome Emails**: Sends personalized welcome emails to new users upon registration
4. **Professional Templates**: Beautiful HTML email templates with your branding
5. **Error Handling**: Graceful error handling with user feedback

## Email Templates

The system sends four types of emails:

1. **Admin Notification**: Detailed form data sent to admin email
2. **User Confirmation**: Professional confirmation sent to user
3. **Service Request**: Comprehensive service request details
4. **Welcome Email**: Personalized welcome message for new users with service information

## Testing

To test the email service:

1. Fill out the contact form on your website
2. Submit a service request form
3. Register a new user (with email field if available)
4. Check your admin email for notifications
5. Check user emails for confirmations and welcome messages
6. Verify all emails have proper formatting and content

### Testing Welcome Emails

You can test the welcome email functionality by running:
```bash
npx tsx server/testWelcomeEmail.ts
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify your email and password are correct
   - For Gmail, ensure you're using an app password, not your regular password
   - Check that 2FA is enabled if using Gmail

2. **Connection Timeout**
   - Verify SMTP_HOST and SMTP_PORT are correct
   - Check your firewall settings
   - Try different ports (465 for SSL, 587 for TLS)

3. **Emails Not Received**
   - Check spam/junk folders
   - Verify ADMIN_EMAIL is correct
   - Check server logs for error messages

### Server Logs

Check your server console for email-related messages:
- ✅ "Email service is ready to send messages" - Configuration successful
- ❌ "Email service configuration error" - Check your SMTP settings
- ✅ "Contact emails sent successfully" - Email sent successfully
- ❌ "Error sending contact emails" - Check error details

## Security Notes

1. Never commit your `.env` file to version control
2. Use app passwords instead of regular passwords
3. Keep your SMTP credentials secure
4. Consider using environment-specific configurations

## Support

If you encounter issues:
1. Check the server logs for error messages
2. Verify your SMTP settings
3. Test with a simple email client first
4. Contact your email provider for SMTP settings

## Next Steps

After setting up the email service:
1. Test both contact and service request forms
2. Customize email templates if needed
3. Set up email monitoring/alerts
4. Consider adding email analytics
