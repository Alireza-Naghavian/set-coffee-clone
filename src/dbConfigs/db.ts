import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    if (mongoose.connections[0].readyState) return true; // اگر قبلا متصل شده، نیازی به اتصال دوباره نیست

    await mongoose.connect("mongodb://localhost:27017/SetCoffe");
    console.log("mongoDB connected!");
    return true;
  } catch (error) {
    console.error("DB Connection has error ->", error); // استفاده از console.error برای نمایش خطاها
    return false;
  }
};

export default dbConnection;
