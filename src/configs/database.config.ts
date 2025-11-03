// src/configs/database.config.ts
import mongoose from 'mongoose';
import config from './config';

const { host, port, name } = config.db;
const connectString = `mongodb://${host}:${port}/${name}`;

const connectDB = async (): Promise<void> => {
  try {
    console.log('Đang kết nối MongoDB:', connectString.replace(/\/.*@/, '/***@')); // Ẩn tên DB
    await mongoose.connect(connectString, {
      maxPoolSize: 10,
      minPoolSize: 2,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('Kết nối MongoDB thành công');
  } catch (error: any) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;