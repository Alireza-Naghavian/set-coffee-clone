import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    if (mongoose.connections[0].readyState) return true;

    const mongoUri = process.env.NODE_ENV === "development"
      ? "mongodb://localhost:27017/SetCoffe" 
      : process.env.MONGODB_URI; 

    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    // اتصال به دیتابیس
    await mongoose.connect(mongoUri, {
    });

    console.log(`MongoDB connected in ${process.env.NODE_ENV} mode!`);
    return true;
  } catch (error) {
    console.error("DB Connection has error ->", error);
    return false;
  }
};

export default dbConnection;
