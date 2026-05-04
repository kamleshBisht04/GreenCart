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
import paymentRouter from './routes/paymentRoute.js';
import contactRouter from './routes/contactRoutes.js';
import newsletterRouter from './routes/newsletterRoutes.js';

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
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);

app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);


app.listen(port, () => {
  console.log(`Server is runing on http://localhost:${port}`);
});
