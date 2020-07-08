const joi = require("@hapi/joi");
const logger = require("../common/routerBootstrap");

const generatedJoiSchemas = [];

/**
 * Creates a new Joi object that will be transformed to a new swagger schema
 * @param {Strig} className the Schema keyname
 * @param {Object} schema an plain javascript Object containing Joi elements
 * @example
 * const User = { id: joi.string()}
 * swaggerSchema('User', user)
 * // can be referenced as "#components/schemas/User"
 */

function createSchema(className, schema) {
  try {
    Object.keys(schema).forEach((key) => {
      if (!schema[key].isJoi) {
        throw new Error(`Property ${key} must be an instance of Joi`);
      }
    });
    const joiSchema = joi.object().keys(schema).meta({ className });
    generatedJoiSchemas.push(joiSchema);
    return joiSchema;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

module.exports = { createSchema, generatedJoiSchemas };
