import express, { Request, Response } from 'express';
import {getOrderByNumber, addOrder, generateUniqueOrderNumber} from '../services/orderService';
import {getCustomerByEmail,updateCustomerDetails} from "../services/userServices";
import {latestQueryBasedOnEmail} from "../services/queries"; // Update the path to where you store this

const router = express.Router();

router.get('/user/details/:email', async (req: any, res: any) => {
    const email = req.params.email;
    try {
        const customer = await getCustomerByEmail(email);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/user/query/:email', async (req: any, res: any) => {
    const email = req.params.email;
    try {
        const query = await latestQueryBasedOnEmail(email);
        console.log(query)
        if (query) {
            res.status(200).json({query:query.typeOfQuery,
            queryQuestion:query.question});
        } else {
            res.status(200).json({ query:"null" , queryQuestion:"null"});
        }
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/user/update', async (req: any, res: any) => {
    const { email, name, address } = req.body;  // Assuming you're sending 'email', 'name', and 'address' in the request body
    console.log(email)
    if (!email || !name || !address) {
        return res.status(400).json({ error: 'Missing required fields (email, name, address)' });
    }

    try {
        const updatedCustomer = await updateCustomerDetails(email, { name, address });

        if (updatedCustomer) {
            res.status(200).json({ updatedCustomer });
        } else {
            res.status(500).json({ error: 'Failed to update customer details' });
        }
    } catch (error) {
        console.error('Error updating customer details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
