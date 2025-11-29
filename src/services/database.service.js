const mongoose = require("mongoose");
const { mongodbUri } = require("../config/db.config");

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUri);
    console.log("✅ MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    return false;
  }
};

const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log("✅ MongoDB Disconnected");
};

module.exports = { connectDB, disconnectDB };
