import express, { Request, Response } from 'express';
import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', orderRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
