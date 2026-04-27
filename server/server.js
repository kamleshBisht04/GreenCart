import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';

const app = express();
const port = process.env.PORT || 4000;
await connectDB();

// Allow multiple orign
const allowedOrigins = ['http://localhost:5173'];

// Middelewere configuration
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => res.send('API is Working!!!'));

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);

app.listen(port, () => {
  console.log(`Server is runing on http://localhost:${port}`);
});
