const { createSchema } = require("../../common/createJoiSwaggerSchema");
const joi = require("@hapi/joi");

const account = createSchema("Account", {
  address: joi.string().required(),
});

const accountCardStatus = createSchema("AccountCardStatus", {
  newState: joi.string().max(30).required(),
});

module.exports = {
  account,
  accountCardStatus,
};
