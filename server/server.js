import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
// dotenv.config();
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
const PORT = process.env.PORT || 4000;

// Connect DB & Cloudinary
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log(' DB & Cloudinary Connected');

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Server Start Failed:', error.message);
    process.exit(1);
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://green-cart-two-mu.vercel.app'],
    credentials: true,
  }),
);

// Health Check Route
app.get('/', (req, res) => {
  res.send('API is Working ');
});

//  API Routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);

// Start Server
startServer();

export default app;
