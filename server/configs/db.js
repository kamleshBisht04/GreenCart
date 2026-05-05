import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './config.env' });
}

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const password = process.env.DB_PASSWORD;

    // ✅ Safety checks (VERY IMPORTANT)
    if (!uri) throw new Error('MONGODB_URI missing');
    if (!password) throw new Error('DB_PASSWORD missing');

    // ✅ Replace only if placeholder exists
    const DB = uri.includes('<PASSWORD>')
      ? uri.replace('<PASSWORD>', password)
      : uri;

    await mongoose.connect(DB);

    console.log('✅ Database connected!');
  } catch (error) {
    console.error('❌ DB Error:', error.message);
    throw error; // important for Vercel logs
  }
};

export default connectDB;
