// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflix-gpt-48f6b.firebaseapp.com",
  projectId: "netflix-gpt-48f6b",
  storageBucket: "netflix-gpt-48f6b.firebasestorage.app",
  messagingSenderId: "521123841824",
  appId: "1:521123841824:web:61f4b0ecc1446491e03945",
  measurementId: "G-WFKR5L9DGK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
