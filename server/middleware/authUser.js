import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  try {
    const token = req.cookies.sellerToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated (no token)',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export default authUser;
