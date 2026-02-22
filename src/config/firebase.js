import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9hnuIcgN3Bo1XOe1iu5UFae4EkRPRx3w",
  authDomain: "carsale-68e7d.firebaseapp.com",
  projectId: "carsale-68e7d",
  storageBucket: "carsale-68e7d.firebasestorage.app",
  messagingSenderId: "221295878586",
  appId: "1:221295878586:web:88cf3dbd1adb8294903d83",
  measurementId: "G-X18ZBW43MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
