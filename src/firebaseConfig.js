import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6lMGWNqXiFxDdsn1oOIBwoJ16xks9CUc",
  authDomain: "soulmegle-e75ef.firebaseapp.com",
  projectId: "soulmegle-e75ef",
  storageBucket: "soulmegle-e75ef.firebasestorage.app",
  messagingSenderId: "1030369852356",
  appId: "1:1030369852356:web:0f755e3a7404ca8af28291",
  measurementId: "G-R8PR8PZPKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider;

export{auth, googleProvider};