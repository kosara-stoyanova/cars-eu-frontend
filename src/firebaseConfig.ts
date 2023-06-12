import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmPuQBCjsCD2sEsCMpd7TDGFICJ5GkUl0",
  authDomain: "cars-eu.firebaseapp.com",
  projectId: "cars-eu",
  storageBucket: "cars-eu.appspot.com",
  messagingSenderId: "823906405987",
  appId: "1:823906405987:web:e4b689d1765e41dd9d7256",
  measurementId: "G-HQRDP6Y34S",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const auth = getAuth(app);

auth.onAuthStateChanged((user) => console.log(user?.getIdTokenResult()));
