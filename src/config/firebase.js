import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9hnuIcgN3Bo1XOe1iu5UFae4EkRPRx3w",
  authDomain: "carsale-68e7d.firebaseapp.com",
  projectId: "carsale-68e7d",
  storageBucket: "carsale-68e7d.firebasestorage.app",
  messagingSenderId: "221295878586",
  appId: "1:221295878586:web:88cf3dbd1adb8294903d83",
  measurementId: "G-X18ZBW43MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const appCheckSiteKey = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY;
const appCheckDebugToken = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN;

if (appCheckDebugToken && typeof self !== "undefined") {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = appCheckDebugToken === "true" ? true : appCheckDebugToken;
}

export const appCheck = appCheckSiteKey
  ? initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    })
  : null;

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage for admin vehicle photo uploads
export const storage = getStorage(app);
