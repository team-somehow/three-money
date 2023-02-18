import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDAp2T8K2Uqb4x5NcyPmSrlkBhNGk24SRY",
  authDomain: "three-credit-d5e85.firebaseapp.com",
  projectId: "three-credit-d5e85",
  storageBucket: "three-credit-d5e85.appspot.com",
  messagingSenderId: "94163712322",
  appId: "1:94163712322:web:c602475511bc2d094370db",
};

export const Firebase = initializeApp(firebaseConfig);
export const db = getFirestore(Firebase);
