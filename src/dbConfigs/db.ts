import mongoose, { ConnectOptions } from "mongoose";

const dbConnection = async () => {
  try {
   
    const mongoUri =
      process.env.NODE_ENV === "development"
        ? "mongodb://127.0.0.1:27017/SetCoffe"
        : process.env.MONGODB_URI; 

    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    
    const clientOptions: ConnectOptions =
      process.env.NODE_ENV !== "development"
        ? { serverApi: { version: "1", strict: true, deprecationErrors: true } }
        : {}; 

    
    if (mongoose.connections[0].readyState) return true;

   
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
