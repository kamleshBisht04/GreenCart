import dotenv from 'dotenv';
dotenv.config(); // ✅ IMPORTANT: no custom path for deployment

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// DB & Configs
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

// ========================
// DB + Cloudinary Connect
// ========================
(async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log('✅ DB & Cloudinary Connected');
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
  }
})();

// ========================
// Middleware
// ========================
app.use(express.json());
app.use(cookieParser());

// ✅ FIXED CORS (local + production)
app.use(
  cors({
    origin: ['http://localhost:5173', process.env.FRONTEND_URL],
    credentials: true,
  }),
);

// ========================
// Health Check Route
// ========================
app.get('/', (req, res) => {
  res.send('✅ API is Working');
});

// ========================
// API Routes
// ========================
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);

// ========================
// ERROR HANDLER (optional but good)
// ========================
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// ========================
// LOCAL vs VERCEL FIX
// ========================

// ❌ DO NOT use app.listen in serverless
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// ========================
// EXPORT FOR VERCEL
// ========================
export default app;
