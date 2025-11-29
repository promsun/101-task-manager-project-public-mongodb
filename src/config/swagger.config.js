const swaggerJSDoc = require("swagger-jsdoc");
const { nodeEnv, serverUrl, appInfo } = require("./app.config");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: appInfo.name,
    version: appInfo.version,
    description: appInfo.description,
  },
  servers: [
    {
      url: serverUrl,
      description:
        nodeEnv === "production" ? "Production server" : "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
