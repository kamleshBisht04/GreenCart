import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {

  // console.log('COOKIES:', req.cookies);
  // console.log('HEADERS:', req.headers.authorization);
  try {
    let token;

    // 1. Check token in cookies (preferred method)
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 2. If not in cookies, check Authorization header (Bearer token)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 3. If no token found, user is not authenticated
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized, No Token',
      });
    }

    // 4. Verify JWT token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Validate decoded token data
    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Token',
      });
    }

    // 6. Attach user info to request object for further use
    req.user = { id: decoded.id };

    // 7. Continue to next middleware / controller
    next();
  } catch (error) {
    console.log('AUTH ERROR:', error.message);

    // 8. If token is expired or invalid
    return res.status(401).json({
      success: false,
      message: 'Not Authorized, Token Failed',
    });
  }
};

export default authUser;
