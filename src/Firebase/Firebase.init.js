// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

/*apiKey: "AIzaSyDm_OOwTCKAcP0Gq5JEll5d6CJKDBlbe7s",
  authDomain: "interiordesign-d389c.firebaseapp.com",
  projectId: "interiordesign-d389c",
  storageBucket: "interiordesign-d389c.appspot.com",
  messagingSenderId: "521004567807",
  appId: "1:521004567807:web:650e950b532a9949e550ca", */

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
