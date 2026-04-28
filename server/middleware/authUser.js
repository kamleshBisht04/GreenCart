import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    let token;

    // Cookie se token
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    // Header se token (Bearer)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized, No Token',
      });
    }

    //Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // id missing
    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Token',
      });
    }
    //User attach
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.log('AUTH ERROR:', error.message);

    return res.status(401).json({
      success: false,
      message: 'Not Authorized, Token Failed',
    });
  }
};

export default authUser;
