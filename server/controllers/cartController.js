import User from '../models/User.js';

// Update Cart  /api/user/
export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, {
      cartItems: cartItems || {},
    });

    return res.json({
      success: true,
      message: 'Cart Updated',
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      cartItems: user.cartItems || {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.cartItems = user.cartItems || {};

    if (user.cartItems[productId]) {
      delete user.cartItems[productId];
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Item removed successfully',
      cartItems: user.cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
