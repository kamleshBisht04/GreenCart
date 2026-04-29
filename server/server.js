import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import { connect } from 'mongoose';
import connectCloudinary from './configs/cloudinary.js';
import productRoucter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;
await connectDB();
await connectCloudinary();

// Allow multiple orign
const allowedOrigins = ['http://localhost:5173'];

// Middelewere configuration
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => res.send('API is Working!!!'));

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRoucter);
app.use('/api/cart', cartRouter);

app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log(`Server is runing on http://localhost:${port}`);
});
