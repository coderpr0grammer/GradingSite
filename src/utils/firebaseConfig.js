// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNbAjoE9QwXJJLm8WE5o-oZiQPoQihlFo",
  authDomain: "gradingsite-yrhacks.firebaseapp.com",
  projectId: "gradingsite-yrhacks",
  storageBucket: "gradingsite-yrhacks.appspot.com",
  messagingSenderId: "196939820365",
  appId: "1:196939820365:web:c89948f3ea35c9aa9e5b04",
  measurementId: "G-RMVDXQYLHC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);