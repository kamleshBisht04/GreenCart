import express from 'express';
import upload from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';
import {
  addProduct,
  changeStock,
  productById,
  productList,
  updatePrice,
} from '../controllers/productController.js';

const productRoucter = express.Router();

productRoucter.post('/add', upload.array('images'), authSeller, addProduct);
productRoucter.get('/list', productList);
productRoucter.get('/:id', productById);
productRoucter.patch('/stock/:id', authSeller, changeStock);
productRoucter.patch('/price/:id', authSeller, updatePrice);

export default productRoucter;
