const express = require("express");
const logger = require("express-logger");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});

// eslint-disable-next-line
const router = express.Router();

module.exports = {
  router,
  joiValidator,
};
