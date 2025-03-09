import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import { orderRoutes } from './routes/orderRoutes.js';
import { wishlistRoutes } from './routes/WishlistRoutes.js';
import { productRoutes } from './routes/ProductRoutes.js';
import { cartRoutes } from './routes/CartRoutes.js';
import { userRoutes } from './routes/AuthRoutes.js';
import { connectDB } from './config/db.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB()

app.use('/v1/user', userRoutes)
app.use('/v1/cart', cartRoutes)
app.use('/v1/product', productRoutes)
app.use('/v1/wishlist', wishlistRoutes)
app.use('/api/v1/order', orderRoutes)

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


