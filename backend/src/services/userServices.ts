// Firebase SDK imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, doc, setDoc  } from "firebase/firestore";

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

async function getCustomerAddressByEmail(email: any) {
    try {
        const customersRef = collection(db, "user");
        const q = query(customersRef, where("email", "==", email));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No customer found with email:", email);
            return null;
        }

        const customerDoc = querySnapshot.docs[0];
        const customerData = customerDoc.data();

        const customerAddress = customerData.address;
        console.log("Customer's address:", customerAddress);
        return customerAddress;

    } catch (error) {
        console.error("Error fetching customer address:", error);
        return null;
    }
}
async function getCustomerByEmail(email: any) {
    try {
        const customersRef = collection(db, "user");
        const q = query(customersRef, where("email", "==", email));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No customer found with email:", email);
            return null;
        }

        const customerDoc = querySnapshot.docs[0];
        const customerData = customerDoc.data();

        console.log("Customer's address:", customerData);
        return customerData;

    } catch (error) {
        console.error("Error fetching customer address:", error);
        return null;
    }
}
async function updateCustomerDetails(email: string, updatedData: { name: string; address: string }) {
    try {
        // Reference to the user document based on the email
        const usersRef = collection(db, 'user');
        const q = query(usersRef, where('email', '==', email));
        // Step 2: Fetch the query results
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            throw new Error('Customer not found');
        }
        const userDoc = querySnapshot.docs[0]; // Assuming only one user per email
        const userRef = doc(db, 'user', userDoc.id);

        // Update the customer details
        await setDoc(userRef, updatedData, { merge: true }); // Merge will only update the fields that are provided

        // Return the updated customer data
        return { email, ...updatedData };
    } catch (error) {
        console.error('Error updating customer details:', error);
        throw new Error('Failed to update customer details');
    }
}

export { db,getCustomerByEmail,getCustomerAddressByEmail,updateCustomerDetails };
