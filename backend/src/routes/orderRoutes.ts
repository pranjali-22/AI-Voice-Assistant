import express, { Request, Response } from 'express';
import { getOrderByNumber } from '../services/orderService'; // Update the path to where you store this

const router = express.Router();

router.get('/order/:orderNumber', async (req: Request, res: Response) => {
    const orderNumber = req.params.orderNumber;
    try {
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
