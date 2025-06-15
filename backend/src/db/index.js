import mongoose from "mongoose";
import seedAdmin from "../utils/seedAdmin.js";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    await seedAdmin();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

export default connectDB;
