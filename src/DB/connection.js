import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 50000,
    });
    console.log("database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connection;
