require("dotenv").config();
const app = require("./src/app");
const { nodeEnv, port, serverUrl } = require("./src/config/app.config");
const { connectDB } = require("./src/services/database.service");

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
