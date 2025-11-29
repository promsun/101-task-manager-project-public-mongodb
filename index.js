require("dotenv").config();
const app = require("./src/app");
const { nodeEnv, port, serverUrl } = require("./src/config/app.config");
const { connectDB, disconnectDB } = require("./src/services/database.service");

// Start Server
const startServer = async () => {
  const isConnected = await connectDB();

  // Check connection before starting server
  if (!isConnected) {
    console.error("❌ Failed to connect to database. Server not started.");
    process.exit(1);
  }

  const server = app.listen(port, () => {
    console.log(`✅ Server is running at: ${serverUrl}`);
    console.log(`✅ Environment: ${nodeEnv}`);
    console.log(`✅ API Documentation: ${serverUrl}/api-docs`);
  });

  // Graceful shutdown
  const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      console.log("✅ HTTP server closed");
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
};

startServer();
