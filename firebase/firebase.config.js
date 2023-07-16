// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmDavnVVkRZ3FpZzZXxl42MZXJYWokkjk",
  authDomain: "recipeapp-809f4.firebaseapp.com",
  projectId: "recipeapp-809f4",
  storageBucket: "recipeapp-809f4.appspot.com",
  messagingSenderId: "200249068393",
  appId: "1:200249068393:web:e2e89867acb5d690facbf8",
  measurementId: "G-MTKSB3Y343",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


// IOS: 200249068393-f6smhn4nkjargdlltmm1cmbig0fvgopm.apps.googleusercontent.com
// Android: 200249068393-aqm94tt70pkcod6ovlb07flnuc8dhf82.apps.googleusercontent.com