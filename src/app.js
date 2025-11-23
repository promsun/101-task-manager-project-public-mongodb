const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");
const { corsOrigin, nodeEnv } = require("./config/app.config");
const taskRoutes = require("./routes/task.routes");

// CDN CSS for Swagger UI
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css";

const app = express();

// Middleware
app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(nodeEnv === "development" ? "dev" : "combined"));

// Swagger Documentation
// Add custom CSS due to production build issues with Swagger UI: https://stackoverflow.com/questions/77149997/when-deployed-on-vercel-my-swagger-ui-shows-a-blank-page-nodejs-nestjs-swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager API",
    version: "1.0.0",
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
