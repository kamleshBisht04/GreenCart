import express from 'express';
import authUser from '../middleware/authUser.js';
import {
  getAllOrder,
  getUserOrders,
  placeOrderCOD,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authUser, getAllOrder);

export default orderRouter;
