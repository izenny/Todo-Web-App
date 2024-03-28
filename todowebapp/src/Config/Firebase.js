// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTKia75b9Tiu4wU5j8gqshP6ATiViIpd8",
  authDomain: "todo-web-app-d7135.firebaseapp.com",
  projectId: "todo-web-app-d7135",
  storageBucket: "todo-web-app-d7135.appspot.com",
  messagingSenderId: "466085942284",
  appId: "1:466085942284:web:5d9c34c459ba228c7a4a29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);