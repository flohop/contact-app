import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYMMancuBKXC0vtJroF6ISorVdaa7RcOY",
  authDomain: "contact-app-4cc57.firebaseapp.com",
  projectId: "contact-app-4cc57",
  storageBucket: "contact-app-4cc57.appspot.com",
  messagingSenderId: "176545633345",
  appId: "1:176545633345:web:fe83127d1b718d509562c0",
  measurementId: "G-8VDLY0H3D1",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
