import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const DB = process.env.MONGODB_URI?.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD,
);

if (!DB) {
  throw new Error('MongoDB URI missing in env');
}

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database  connected !');
    });
    await mongoose.connect(DB);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;

