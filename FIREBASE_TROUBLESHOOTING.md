# Firebase Phone Authentication Troubleshooting

## Current Issue: "Failed to send OTP"

### Quick Fixes to Try:

## 1. Update Firebase App ID

The main issue is likely the fake App ID in your Firebase configuration.

**Steps to fix:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `shrisheeastro`
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Find your web app and copy the real `appId`
6. Update `client/src/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyCaXv2JzIY-AM7Pat2H8bjDDnvRfUg_4LI",
  authDomain: "shrisheeastro.firebaseapp.com",
  projectId: "shrisheeastro",
  storageBucket: "shrisheeastro.appspot.com",
  messagingSenderId: "630960074300",
  appId: "YOUR_REAL_APP_ID_HERE" // Replace this with the real one
};
```

## 2. Enable Phone Authentication

Make sure phone authentication is enabled in Firebase:

1. Go to Firebase Console → Authentication
2. Click on "Sign-in method" tab
3. Enable "Phone" provider
4. Configure it if needed

## 3. Add Authorized Domains

Add your domain to authorized domains:

1. Firebase Console → Authentication → Settings
2. Add your domain (e.g., `localhost:5500`, your production domain)

## 4. Check Browser Console

Open browser developer tools and check the console for specific error messages. The updated code now provides more detailed error information.

## 5. Test with a Different Phone Number

Sometimes Firebase has restrictions on certain phone numbers or regions.

## 6. Check Firebase Project Status

Make sure your Firebase project is active and not suspended.

## Common Error Codes and Solutions:

- `auth/project-not-found`: Update the App ID
- `auth/invalid-phone-number`: Check phone number format
- `auth/captcha-check-failed`: Refresh the page and try again
- `auth/too-many-requests`: Wait a few minutes before trying again
- `auth/operation-not-allowed`: Enable phone authentication in Firebase Console

## Testing Steps:

1. Update the App ID in `firebase.ts`
2. Restart your development server
3. Open browser console to see detailed error messages
4. Try sending OTP with a valid phone number
5. Check the console logs for specific error details

## Alternative: Use Test Phone Numbers

For development, you can use Firebase test phone numbers:
- Phone: `+1 650-555-3434`
- OTP: `123456`

To enable test phone numbers:
1. Firebase Console → Authentication → Sign-in method
2. Click on "Phone" provider
3. Add test phone numbers in the "Phone numbers for testing" section

## Need Help?

If the issue persists, please:
1. Check the browser console for specific error messages
2. Verify your Firebase project settings
3. Make sure all required services are enabled in Firebase Console
