import mongoose from 'mongoose';
import authUser from '../middleware/authUser.js';
import {
  getCart,
  removeFromCart,
  updateCart,
} from '../controllers/cartController.js';

const cartRouter = mongoose.Router();

cartRouter.post('/update', authUser, updateCart);
cartRouter.get('/', authUser, getCart);
cartRouter.post('/remove', authUser, removeFromCart);

export default cartRouter;
