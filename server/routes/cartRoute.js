import express from 'express';
import authUser from '../middleware/authUser.js';
import {
  getCart,
  removeFromCart,
  updateCart,
} from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/update', authUser, updateCart);
cartRouter.get('/', authUser, getCart);
cartRouter.post('/remove', authUser, removeFromCart);

export default cartRouter;
