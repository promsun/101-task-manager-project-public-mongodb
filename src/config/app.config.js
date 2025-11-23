const port = process.env.PORT || 3000;

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: port,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  serverUrl: process.env.SERVER_URL || `http://localhost:${port}`,
  app: {
    name: "Task Manager API",
    version: "1.0.0",
    description: "A simple task manager REST API with MongoDB",
  },
};
