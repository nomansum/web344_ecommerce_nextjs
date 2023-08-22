import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecom_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
};

export default connectDB;
