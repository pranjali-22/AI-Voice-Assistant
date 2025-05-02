// Firebase SDK imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

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

// Function to get order by number
async function getOrderByNumber(orderNumber: string | null) {
    if (!orderNumber) return null;

    try {
        console.log("Fetching order:", orderNumber);

        const orderQuery = query(
            collection(db, "order"),
            where("orderNumber", "==", orderNumber)
        );

        const querySnapshot = await getDocs(orderQuery);

        if (querySnapshot.empty) {
            console.log("No order found with orderNumber:", orderNumber);
            return null;
        }

        const order = querySnapshot.docs[0].data();
        console.log("Order found:", order);
        return order;
    } catch (error) {
        console.error("Error fetching order by orderNumber:", error);
        return null;
    }
}

export { db, getOrderByNumber };
