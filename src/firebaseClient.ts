import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "<<removed-from-public-repo>>",
  authDomain: "<<removed-from-public-repo>>",
  projectId: "<<removed-from-public-repo>>",
  storageBucket: "<<removed-from-public-repo>>",
  messagingSenderId: "<<removed-from-public-repo>>",
  appId: "<<removed-from-public-repo>>",
  measurementId: "<<removed-from-public-repo>>",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
