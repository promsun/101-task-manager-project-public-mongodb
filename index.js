require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");
const { nodeEnv, port, serverUrl } = require("./src/config/app.config");
const { mongodbUri } = require("./src/config/db.config");

// Connect to MongoDB
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

// Start Server
const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`✅ Server is running at: ${serverUrl}`);
    console.log(`✅ Environment: ${nodeEnv}`);
    console.log(`✅ API Documentation: ${serverUrl}/api-docs`);
  });
};

startServer();
