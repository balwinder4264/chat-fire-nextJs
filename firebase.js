// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-TbrNlQgbR0kwkE-pLMHK2g9zmb4amrs",
    authDomain: "blood-app-1542864190901.firebaseapp.com",
    projectId: "blood-app-1542864190901",
    storageBucket: "blood-app-1542864190901.appspot.com",
    messagingSenderId: "729216753285",
    appId: "1:729216753285:web:29435e59cf8b2ff964d3ec",
    measurementId: "G-4Z0R9CQTCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider()
export { db, auth, provider };
