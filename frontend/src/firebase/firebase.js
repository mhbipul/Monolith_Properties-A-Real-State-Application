// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-state-application.firebaseapp.com",
  projectId: "real-state-application",
  storageBucket: "real-state-application.firebasestorage.app",
  messagingSenderId: "220790498734",
  appId: "1:220790498734:web:52548dd72991023f02543f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);