import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// DB & Cloud
import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';

// Routes
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

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://green-cart-two-mu.vercel.app'],
    credentials: true,
  }),
);

/* -------------------- HEALTH CHECK -------------------- */
app.get('/', (req, res) => {
  res.send('🚀 GreenCart API is Working');
});

/* -------------------- ROUTES -------------------- */
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);

/* -------------------- DB INIT (IMPORTANT FOR VERCEL) -------------------- */
let isDBConnected = false;

const initDB = async () => {
  try {
    if (!isDBConnected) {
      await connectDB();
      await connectCloudinary();
      isDBConnected = true;
      console.log('✅ DB & Cloudinary Connected');
    }
  } catch (error) {
    console.error('❌ DB Connection Error:', error.message);
  }
};

// run once per cold start
initDB();

/* -------------------- LOCAL SERVER ONLY -------------------- */
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
  });
}

/* -------------------- EXPORT FOR VERCEL -------------------- */
export default app;
