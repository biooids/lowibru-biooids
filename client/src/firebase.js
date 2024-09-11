// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lowibru-biooids.firebaseapp.com",
  projectId: "lowibru-biooids",
  storageBucket: "lowibru-biooids.appspot.com",
  messagingSenderId: "968742503218",
  appId: "1:968742503218:web:f4c5f6472f0268d79dcd2b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
