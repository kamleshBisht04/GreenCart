import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary';

// Add product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    const { name, category, price, offerPrice, description, inStock } =
      req.body;

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

    // upload images to cloudinary
    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      }),
    );

    // create product
    const product = await Product.create({
      name,
      category,
      price,
      offerPrice,
      description: JSON.parse(description),
      images: imageUrls,
      inStock,
    });

    return res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get product : /api/product/list

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

// Get single product : /api/product/id

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

// Get product inStock : /api/product/stock

export const changeStock = async (req, res) => {};
