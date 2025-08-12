import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-IqaW6N-29qdOKLV4C0mdwxpahhq6G5o",
    authDomain: "reactlinks-e81ff.firebaseapp.com",
    projectId: "reactlinks-e81ff",
    storageBucket: "reactlinks-e81ff.firebasestorage.app",
    messagingSenderId: "937964832961",
    appId: "1:937964832961:web:6ae9530f715e87e2d8ac40"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};