import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI.replace('<PASSWORD>', process.env.DB_PASSWORD);

    await mongoose.connect(uri); // पुराने ऑप्शन्स हटा दिए
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // अगर कनेक्शन फेल हो जाए तो सर्वर बंद कर दो
  }
};

export default connectDB;
