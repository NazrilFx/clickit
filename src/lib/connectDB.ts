import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(MONGODB_URI, {} as mongoose.ConnectOptions);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
