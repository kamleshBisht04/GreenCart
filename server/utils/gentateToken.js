import jwt from 'jsonwebtoken';
// generate tokken
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;
