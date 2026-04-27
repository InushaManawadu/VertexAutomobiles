# Firebase App Check Setup

This app initializes Firebase App Check with the reCAPTCHA v3 provider when
`VITE_RECAPTCHA_V3_SITE_KEY` is present.

## Setup

1. In the reCAPTCHA Admin Console, create a reCAPTCHA v3 site key for the app
   domains, including localhost for development if needed.
2. In Firebase Console > App Check, register the web app with the reCAPTCHA v3
   provider and paste the matching secret key.
3. Create a local `.env` file from `.env.example` and set:

   ```bash
   VITE_RECAPTCHA_V3_SITE_KEY=your_recaptcha_v3_site_key
   ```

4. Deploy the app. Firebase requests will include App Check tokens.
5. Monitor App Check metrics for Cloud Firestore in Firebase Console.
6. Enable enforcement for Cloud Firestore once legitimate traffic is healthy.

## Local Debug

For local development, you can temporarily add:

```bash
VITE_FIREBASE_APPCHECK_DEBUG_TOKEN=true
```

Open the browser console, copy the printed App Check debug token, and register it
in Firebase Console > App Check > Debug tokens. Remove this setting when you are
done testing.
