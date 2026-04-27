import generateToken from '../utils/generateToken.js';

// Login Seller : /api/seller/login

export const sellerLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    //basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required',
      });
    }
    // match the .env
    if (
      email !== process.env.SELLER_EMAIL ||
      password !== process.env.SELLER_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    // create token
    const token = generateToken({ email, role: 'seller' });

    res.cookie('sellerToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'Seller login successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Seller isAuth : /api/seller/is-auth

export const isSellerAuth = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Seller is authenticated',
    user: req.user,
  });
};

// Seller logout : /api/seller/logout

export const sellerLogout = (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.status(200).json({
      success: true,
      message: 'Seller logged out successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
