// Firebase SDK imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, addDoc,orderBy,limit } from "firebase/firestore";
import firebase from "firebase/compat";
import increment = firebase.database.ServerValue.increment;
import FieldValue = firebase.firestore.FieldValue;

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAfxt3kkVGyCplzC0KkG1qMRK43m3qq5TI",
    authDomain: "customer-service-agent-96d77.firebaseapp.com",
    projectId: "customer-service-agent-96d77",
    storageBucket: "customer-service-agent-96d77.firebasestorage.app",
    messagingSenderId: "85664327777",
    appId: "1:85664327777:web:ca663aa7479ea6275e2220",
    measurementId: "G-EPSGR3TEN1"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import { getAuth, onAuthStateChanged } from "firebase/auth";

async function addQuery(query: any) {
    try {
        const docRef = await addDoc(collection(db, "query"), query);
        return docRef.id;
    } catch (error) {
        console.error("Error adding query:", error);
        return null;
    }
}
async function latestQueryBasedOnEmail(email: any) {
    try {
        const q = query(
            collection(db, "query"),
            where("email", "==", email),
            orderBy("date", "desc"),
            limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No queries found for email:", email);
            return null;
        }

        const latestQuery = querySnapshot.docs[0].data();
        return latestQuery;
    } catch (error) {
        console.error("Error fetching latest query:", error);
        return null;
    }
}


export { db,addQuery,latestQueryBasedOnEmail  };
