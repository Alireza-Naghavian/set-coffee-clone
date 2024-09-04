import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    // استفاده از متغیر محیطی برای مشخص کردن آدرس دیتابیس
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/SetCoffe";

    // اگر قبلاً به دیتابیس متصل شده بود، از اتصال مجدد جلوگیری کنید
    if (mongoose.connections[0].readyState) return true;

    // اتصال به دیتابیس
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("MongoDB connected!");
    return true;
  } catch (error) {
    console.error("DB Connection has error ->", error);
    return false;
  }
};

export default dbConnection;
