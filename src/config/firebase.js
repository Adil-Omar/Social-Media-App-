// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHSvboeGdn6egt1vsBI7SwYNbCW6Y7Q78",
  authDomain: "social-app-bcfa4.firebaseapp.com",
  projectId: "social-app-bcfa4",
  storageBucket: "social-app-bcfa4.appspot.com",
  messagingSenderId: "618733277087",
  appId: "1:618733277087:web:0ef7a5ad245545dda737aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);
export const auth = getAuth(app);
