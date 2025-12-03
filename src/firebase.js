 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

 
const firebaseConfig = {
  apiKey: "AIzaSyBfYb_tRM9_fQTlEAx9gIBUzZ28hZlXn80",
  authDomain: "internship-ai-tracker.firebaseapp.com",
  projectId: "internship-ai-tracker",
  storageBucket: "internship-ai-tracker.firebasestorage.app",
  messagingSenderId: "558348829384",
  appId: "1:558348829384:web:caa77585ebbbe615491bfd",
  measurementId: "G-D3EELPLPQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
//export firebase service
export const auth= getAuth(app);
export const db= getFirestore(app);