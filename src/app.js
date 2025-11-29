const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");
const { corsOrigin, nodeEnv, app: appConfig } = require("./config/app.config");
const taskRoutes = require("./routes/task.routes");

const app = express();

// Middleware
app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(nodeEnv === "development" ? "dev" : "combined"));

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: appConfig.name,
    version: appConfig.version,
    description: appConfig.description,
    status: "running",
    timestamp: new Date().toISOString(),
    environment: nodeEnv,
    documentation: "/api-docs",
  });
});

// API Routes
app.use("/api", taskRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  // Show stack trace only in development
  if (nodeEnv === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
});

module.exports = app;
