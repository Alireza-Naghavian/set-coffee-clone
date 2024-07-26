import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    if (mongoose.connections[0].readyState) return false; 

    await mongoose.connect("mongodb://localhost:27017/SetCoffe");
    console.log("mongoDB connected!");
    return true;
  } catch (error) {
    console.error("DB Connection has error ->", error); 
    return false;
  }
};

export default dbConnection;
