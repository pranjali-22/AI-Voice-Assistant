// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword  } from "firebase/auth";
import {addDoc, collection, query, where, getDocs } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAfxt3kkVGyCplzC0KkG1qMRK43m3qq5TI",
    authDomain: "customer-service-agent-96d77.firebaseapp.com",
    projectId: "customer-service-agent-96d77",
    storageBucket: "customer-service-agent-96d77.firebasestorage.app",
    messagingSenderId: "85664327777",
    appId: "1:85664327777:web:ca663aa7479ea6275e2220",
    measurementId: "G-EPSGR3TEN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const handleGoogleLogin = async (setError) => {
    try{
        const result = await signInWithPopup(auth,googleProvider);
        console.log(result.user);
        setError('');
    } catch (error){
        console.log(error);
        setError('Google sign-in failed');
    }
}
const handleSubmit = async (e, setError, navigate) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        const user = await getUserByEmail(email);
        if (user && user.name) {
            // Store username in localStorage
            localStorage.setItem("username", user.name);
            console.log("Username saved to localStorage:", user.name);
            navigate("/home")

        } else {
            console.log("User not found or name not available");
        }
    } catch (error) {
        setError(error.message);
    }
};
async function addUser(email: string, name: string) {
    console.log("inside add");
    try {
        const docRef = await addDoc(collection(db, "user"), {
            email: email,
            name: name,
            createdAt: new Date()
        });

        console.log("User added with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding user:", error);
    }
}
async function getUserByEmail(email: string) {
    try {
        // Query the 'user' collection for a document with the specified email
        const userQuery = query(
            collection(db, "user"),  // replace "user" with the actual collection name
            where("email", "==", email)
        );

        // Execute the query
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            console.log("No user found with email:", email);
            return null;
        }

        // Assuming email is unique, get the first matched document
        const user = querySnapshot.docs[0].data();
        console.log("User found:", user);
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
}
const db = getFirestore(app);
export {auth,googleProvider,handleGoogleLogin,handleSubmit,db}