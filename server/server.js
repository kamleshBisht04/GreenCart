import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import contactRouter from './routes/contactRoutes.js';
import newsletterRouter from './routes/newsletterRoutes.js';

const app = express();

// ✅ connect once (no listen)
let isConnected = false;

const connectOnce = async () => {
  if (!isConnected) {
    await connectDB();
    await connectCloudinary();
    isConnected = true;
    console.log('✅ DB & Cloudinary Connected');
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

// Routes
app.get('/', (req, res) => {
  res.send('API is Working');
});

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);

// ✅ Vercel handler
export default async function handler(req, res) {
  try {
    await connectOnce();
    return app(req, res);
  } catch (error) {
    console.error('❌ Server Error:', error);
    res.status(500).json({ error: error.message });
  }
}
