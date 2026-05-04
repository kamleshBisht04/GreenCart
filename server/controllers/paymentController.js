import razorpay from '../configs/razorpay.js';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

//  CREATE RAZORPAY ORDER
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user?.id;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data',
      });
    }

    let amount = 0;

    // calculate amount from DB (IMPORTANT)
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      amount += product.offerPrice * item.quantity;
    }

    const tax = Math.floor(amount * 0.02);
    amount += tax;

    const options = {
      amount: amount * 100, // paise
      currency: 'INR',
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
      amount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  VERIFY PAYMENT + CREATE ORDER
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      address,
    } = req.body;

    const userId = req.user?.id;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment not verified',
      });
    }

    // create order after successful payment
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      amount += product.offerPrice * item.quantity;
    }

    const tax = Math.floor(amount * 0.02);
    amount += tax;

    const order = await Order.create({
      userId,
      items: items.map((i) => ({
        product: i.productId,
        quantity: i.quantity,
      })),
      address,
      amount,
      paymentType: 'ONLINE',
      isPaid: true,
    });

    return res.json({
      success: true,
      message: 'Payment verified & order placed',
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
