import express from 'express';
import authUser from '../middleware/authUser.js';
import {
  createOrder,
  verifyPayment,
} from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-order', authUser, createOrder);
paymentRouter.post('/verify', authUser, verifyPayment);

export default paymentRouter;
