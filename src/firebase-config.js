import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const API_KEY = process.env.REACT_APP_KEY;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "charge-it-8b148.firebaseapp.com",
  databaseURL:
    "https://charge-it-8b148-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "charge-it-8b148",
  storageBucket: "charge-it-8b148.appspot.com",
  messagingSenderId: "646374739944",
  appId: "1:646374739944:web:3273c045d4bc09db6e9e5d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
