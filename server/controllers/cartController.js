import User from '../models/User.js';

// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.user.id; // FIXED

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({
      success: true,
      message: 'Cart Updated',
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      cart: user.cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove item from cart

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);

    user.cartItems = user.cartItems.filter(
      (item) => item.productId.toString() !== productId,
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Item removed',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
