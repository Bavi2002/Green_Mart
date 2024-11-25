// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW7jfkIgvCubpa9gSSHeRHz2DvVqvIguY",
  authDomain: "mern-register.firebaseapp.com",
  projectId: "mern-register",
  storageBucket: "mern-register.appspot.com",
  messagingSenderId: "280653021246",
  appId: "1:280653021246:web:c6defd2fd7f274b6dd916f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);