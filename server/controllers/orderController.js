import Product from '../models/Product.js';
import Order from '../models/Order.js';

//  * PLACE ORDER (COD) POST /api/order/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized user',
      });
    }

    const { items, address } = req.body;

    if (!items || items.length === 0 || !address) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data',
      });
    }

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      amount += product.offerPrice * item.quantity;
    }

    const tax = Math.floor(amount * 0.02);
    amount += tax;

    const order = await Order.create({
      userId,
      items: items.map((i) => ({
        product: i.productId, //  IMPORTANT FIX (schema match)
        quantity: i.quantity,
      })),
      address,
      amount,
      paymentType: 'COD',
      isPaid: false,
    });

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    console.log('ORDER ERROR:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  * GET USER ORDERS

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized user',
      });
    }

    const orders = await Order.find({ userId })
      .populate('items.product')
      .populate('address')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log('GET USER ORDERS ERROR:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  GET ALL ORDERS (ADMIN/SELLER)

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.product')
      .populate('address')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log('GET ALL ORDERS ERROR:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
