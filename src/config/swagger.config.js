const swaggerJSDoc = require("swagger-jsdoc");
const { nodeEnv, serverUrl, app } = require("./app.config");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: app.name,
    version: app.version,
    description: app.description,
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
