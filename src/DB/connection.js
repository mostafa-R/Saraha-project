import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connection;
