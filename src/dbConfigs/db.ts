import mongoose, { ConnectOptions } from "mongoose";

const dbConnection = async () => {
  try {
    // انتخاب URI مناسب بر اساس محیط
    const mongoUri =
      process.env.NODE_ENV === "development"
        ? "mongodb://localhost:27017/SetCoffe" // دیتابیس محلی
        : process.env.MONGODB_URI; // دیتابیس MongoDB Atlas

    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    // گزینه‌های اتصال به MongoDB Atlas در صورت استفاده از آن
    const clientOptions: ConnectOptions =
      process.env.NODE_ENV !== "development"
        ? { serverApi: { version: "1", strict: true, deprecationErrors: true } }
        : {}; // در حالت لوکال، نیازی به این گزینه‌ها نیست

    // اگر قبلاً متصل شده بود، از اتصال مجدد جلوگیری می‌کند
    if (mongoose.connections[0].readyState) return true;

    // اتصال به دیتابیس
    await mongoose.connect(mongoUri, clientOptions);

    console.log(
      `MongoDB connected successfully in ${process.env.NODE_ENV} mode!`
    );

    return true;
  } catch (error) {
    console.error("DB Connection has error ->", error);
    return false;
  }
};

export default dbConnection;
