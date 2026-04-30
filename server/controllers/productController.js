import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary';

// CLOUDINARY UPLOAD FUNCTION
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);
      },
    );

    stream.end(fileBuffer);
  });
};

// ADD PRODUCT
export const addProduct = async (req, res) => {
  console.log('FILES:', req.files);

  try {
    const productData = JSON.parse(req.body.productData);

    const { name, category, price, offerPrice, description, inStock } =
      productData;

    const images = req.files;

    // validation
    if (!name || !category || !price || !offerPrice || !description) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Images required',
      });
    }

    // UPLOAD IMAGES TO CLOUDINARY
    const imageUrls = await Promise.all(
      images.map((file) => uploadToCloudinary(file.buffer)),
    );

    // SAVE PRODUCT
    const product = await Product.create({
      name,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      description,
      images: imageUrls,
      inStock,
    });

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
export const productList = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PRODUCT BY ID
export const productById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CHANGE STOCK
export const changeStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { inStock } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PRICE

export const updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, offerPrice } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { price, offerPrice },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Price updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
