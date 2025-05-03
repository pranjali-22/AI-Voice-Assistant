// Firebase SDK imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
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
        console.log(querySnapshot);

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
async function addOrder(order: any) {
    try {
        // Add a new document to the "order" collection
        const docRef = await addDoc(collection(db, "order"), order);
        console.log("Order added with ID:", docRef.id);
        return docRef.id; // Returning the ID of the newly created order
    } catch (error) {
        console.error("Error adding order:", error);
        return null;
    }
}
function generateOrderNumber() {
    // Generate a random 4-digit number and ensure it’s always 4 digits with leading zeros
    return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}

// Function to check if an order number already exists
async function orderNumberExists(orderNumber: string) {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("orderNumber", "==", orderNumber));

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;  // Return true if order number exists
}

// Function to generate a unique order number
async function generateUniqueOrderNumber() {
    let newOrderNumber = generateOrderNumber();

    // Check if the generated order number already exists
    while (await orderNumberExists(newOrderNumber)) {
        console.log(`Order number ${newOrderNumber} already exists. Generating a new one...`);
        newOrderNumber = generateOrderNumber();  // Generate a new one if it exists
    }

    console.log(`Generated unique order number: ${newOrderNumber}`);
    return newOrderNumber;
}
export { db, getOrderByNumber,addOrder,generateUniqueOrderNumber };
