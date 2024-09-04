import mongoose from "mongoose";

const dbConnection = async () => {
  if (process.Env === "development") {
    try {
      const mongoUri =
        process.env.MONGODB_URI || "mongodb://localhost:27017/SetCoffe";

      if (mongoose.connections[0].readyState) return true;

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
  }
};

export default dbConnection;
