// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNllwAlDUkSZ7yjkIrB-4bkGJdNz5xLZk",
  authDomain: "week7-kinsey.firebaseapp.com",
  projectId: "week7-kinsey",
  storageBucket: "week7-kinsey.appspot.com",
  messagingSenderId: "632243177230",
  appId: "1:632243177230:web:3827abb1429b7ed387f95f"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();