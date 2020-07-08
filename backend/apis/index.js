const express = require("express");

// Ether routes
const accountroute = require("./account/account.route");

// eslint-disable-next-line
const router = express.Router();

router.use("/", accountroute);

module.exports = router;
