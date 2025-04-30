// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword  } from "firebase/auth";

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
const handleSubmit = async (e, setError) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        console.log(email);
        console.log(password);
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCred.user);
        setError('');
    } catch (err) {
        console.log(err);
        setError('Invalid email or password');
    }
    e.target.reset();
}

export {auth,googleProvider,handleGoogleLogin,handleSubmit}