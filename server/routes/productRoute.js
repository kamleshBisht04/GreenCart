import express from 'express';
import upload from '../configs/multer';
import authSeller from '../middleware/authSeller';
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from '../controllers/productController';

const productRoucter = express.Router();

productRoucter.post('/add', upload.array('images'), authSeller, addProduct);
productRoucter.get('/list', productList);
productRoucter.get('/:id', productById);
productRoucter.patch('/stock/:id', authSeller, changeStock);

export default productRoucter;
