const swaggerJSDoc = require("swagger-jsdoc");
const { nodeEnv, serverUrl } = require("./app.config");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Task Manager API",
    version: "1.0.0",
    description:
      "A simple Task Manager API built with Express and MongoDB to manage tasks",
  },
  servers: [
    {
      url: serverUrl,
      description:
        nodeEnv === "production" ? "Production server" : "Development server",
    },
  ],
  tags: [
    {
      name: "Tasks",
      description: "Task management endpoints",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
