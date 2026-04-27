import jwt from 'jsonwebtoken';

const authSeller = (req, res, next) => {
  try {
    const { sellerToken } = req.cookies;

    // No token
    if (!sellerToken) {
      return res.status(401).json({
        success: false,
        message: 'Token missing, please login',
      });
    }

    //Verify token
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // Not seller
    if (decoded.email !== process.env.SELLER_EMAIL) {
      return res.status(403).json({
        success: false,
        message: 'Access denied (Seller only)',
      });
    }

    //Attach user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export default authSeller;
