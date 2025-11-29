const mongoose = require("mongoose");
const { mongodbUri } = require("../config/db.config");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodbUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
