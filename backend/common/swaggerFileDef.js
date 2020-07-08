const swaggerJSDoc = require("swagger-jsdoc");
const j2s = require("joi-to-swagger");
const swaggerParser = require("swagger-parser");
const logger = require("express-logger");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Microservicio",
    version: "1.0.0",
    description:
      "Microservicio responsable por alta de Consulta de cuenta es Etheereum",
  },
};

/**
 * Compiles, Generates and valdiates swagger json doc
 * There are 2 ways for generate documentation parts:
 * 1- Paths, schemas, parameters, etc using JsDoc with @swagger tag see https://www.npmjs.com/package/swagger-jsdoc
 * 2- Create a schema using ./createJoiSwaggerSchema
 * Swagger schemas created with JSDoc will be override by Joi schemas, pay attetion to names.
 */

function generateDoc(apis) {
  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition,
    apis,
  });

  const { generatedJoiSchemas } = require("./createJoiSwaggerSchema");

  const { components: joiSchemasToSwaggerComponents } = j2s(
    generatedJoiSchemas
  );
  // merge Joi schemas with swagger definition
  swaggerSpec.components.schemas = {
    ...swaggerSpec.components.schemas,
    ...joiSchemasToSwaggerComponents.schemas,
  };
  swaggerParser.validate(swaggerSpec, (err, api) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.info("Swagger is valid", { message: "Swagger Valid!" });
    }
  });
  return swaggerSpec;
}
module.exports = { generateDoc };
