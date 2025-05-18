// firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNjolHRLlJTNjkKA23nBC-OqSWNEHsE-o",
  authDomain: "fir-authapp-d5611.firebaseapp.com",
  projectId: "fir-authapp-d5611",
  storageBucket: "fir-authapp-d5611.appspot.com",
  messagingSenderId: "686736400172",
  appId: "1:686736400172:android:ad63b09aca9e47a4df9689",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
