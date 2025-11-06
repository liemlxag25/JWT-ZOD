// src/configs/database.config.ts
import mongoose from 'mongoose';
import config from './config';

const { host, port, name } = config.db;
const connectString = `mongodb://${host}:${port}/${name}`;

const connectDB = async (): Promise<void> => {
  try {
    console.log('Connecting to MongoDB:', connectString.replace(/\/.*@/, '/***@'));
    await mongoose.connect(connectString, {
      maxPoolSize: 10,
      minPoolSize: 2,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;