import express from 'express';
 // Authentication middleware (ensure user is logged in)
import {
  addAddress,
  getAddresses,
  deleteAddress,
} from '../controllers/addressController.js';
import authUser from '../middleware/authUser.js';

const addressRouter = express.Router();

// Protected routes (only for logged-in users)
addressRouter.post('/add', authUser, addAddress);
addressRouter.get('/get', authUser, getAddresses);
addressRouter.delete('/delete/:addressId', authUser, deleteAddress);

export default addressRouter;
