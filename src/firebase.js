// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDD4OgrqevAbzPxUp6Gn5G3XDlczR42MT0",
    authDomain: "app-react-fa5ff.firebaseapp.com",
    projectId: "app-react-fa5ff",
    storageBucket: "app-react-fa5ff.firebasestorage.app",
    messagingSenderId: "995272326597",
    appId: "1:995272326597:web:e2fd183520f7e2be061fac",
    measurementId: "G-95VHPZKKY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);