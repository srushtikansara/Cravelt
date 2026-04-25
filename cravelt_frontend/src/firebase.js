import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALYCLpF50-Peweow3E8_M9XKOuEhkN6vs",
  authDomain: "cravelt-13c63.firebaseapp.com",
  projectId: "cravelt-13c63",
  storageBucket: "cravelt-13c63.firebasestorage.app",
  messagingSenderId: "96120775105",
  appId: "1:96120775105:web:3503f24389adf36e1f4f40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();