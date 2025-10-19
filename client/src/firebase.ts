// client/src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// ✅ Extend Window interface for recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier?: any;
  }
}

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCaXv2JzIY-AM7Pat2H8bjDDnvRfUg_4LI",
  authDomain: "shrisheeastro.firebaseapp.com",
  projectId: "shrisheeastro",
  storageBucket: "shrisheeastro.appspot.com",
  messagingSenderId: "630960074300",
  appId: "1:630960074300:web:YOUR_REAL_APP_ID_HERE" // ⚠️ Replace with your real App ID from Firebase Console
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Export RecaptchaVerifier
export { RecaptchaVerifier };

// ✅ Setup invisible reCAPTCHA
export const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {
        console.log("Recaptcha resolved");
      }
    });
  }
};
