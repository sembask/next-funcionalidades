import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.PUBLIC_API_KEY,
  authDomain: "tomorrow-sembask.firebaseapp.com",
  projectId: "tomorrow-sembask",
  storageBucket: "tomorrow-sembask.firebasestorage.app",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.API_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };
