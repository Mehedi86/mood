// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvTF_qoCsuWPKXKnRcwhj8Kfo1iiDKmNo",
    authDomain: "mood-18af8.firebaseapp.com",
    projectId: "mood-18af8",
    storageBucket: "mood-18af8.firebasestorage.app",
    messagingSenderId: "1076997067862",
    appId: "1:1076997067862:web:0c2f807dbe763b1e8e97f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }