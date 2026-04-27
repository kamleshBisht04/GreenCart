import jwt from 'jsonwebtoken';

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
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // create token


    
  } catch (error) {}
};
