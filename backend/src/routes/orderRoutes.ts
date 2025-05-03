import express, { Request, Response } from 'express';
import {getOrderByNumber, addOrder, generateUniqueOrderNumber} from '../services/orderService';
import {getCustomerAddressByEmail} from "../services/userServices"; // Update the path to where you store this

const router = express.Router();

router.post('/order/create', async (req: any, res: any) => {
    // const customerEmail = localStorage.getItem("userEmail") || "example@gmail.com";
    const customerEmail= "john@gmail.com";
    const customerAddress = await getCustomerAddressByEmail(customerEmail);
    const { receiverAddress, modeOfPayment } = req.body;
    const today = new Date();
    const orderDate = today.toLocaleDateString('en-GB');
    const expectedDeliveryDate = new Date(today);
    expectedDeliveryDate.setDate(today.getDate() + 7);
    const formattedExpectedDeliveryDate = expectedDeliveryDate.toLocaleDateString('en-GB');
    const orderNumber = await generateUniqueOrderNumber();
    console.log("hhhh")

    try {
        const newOrder = {
            orderDate: orderDate,
            expectedDeliveryDate: formattedExpectedDeliveryDate,
            amountCharged: "50.00",
            modeOfPayment: modeOfPayment,
            customerEmail: customerEmail,
            senderAddress: customerAddress,
            receiverAddress: receiverAddress,
            orderNumber:orderNumber,
            orderStatus: "Pending"
        };
        console.log(newOrder)
        const orderId = await addOrder(newOrder);

        if (orderId) {
            res.status(201).json({ message: 'Order added successfully', orderId });
        } else {
            res.status(500).json({ error: 'Failed to add the order' });
        }
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/order/:orderNumber', async (req: Request, res: Response) => {
    const orderNumber = req.params.orderNumber;
    try {
        console.log("here")
        const order = await getOrderByNumber(orderNumber);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
