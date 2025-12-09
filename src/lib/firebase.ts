import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDj7AP4-fMp0jFJajJUtVM2sf5G0dNewM0",
    authDomain: "e-learning-3794e.firebaseapp.com",
    projectId: "e-learning-3794e",
    storageBucket: "e-learning-3794e.firebasestorage.app",
    messagingSenderId: "910716990376",
    appId: "1:910716990376:web:67b9e0f8697e92a1f4239d",
    measurementId: "G-J9767X9ZRL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
