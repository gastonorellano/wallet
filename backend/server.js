const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const apis = require("./apis");
const bodyParser = require("body-parser");
const logger = require("express-logger");
const swaggerUi = require("swagger-ui-express");
const { generateDoc } = require("./common/swaggerFileDef");

const corsOptions = {
  origin: "http://localhost:4200",
};

app.use(
  express.json({
    limit: config.get("limit") || "7mb",
    type: ["application/json", "text/plain"],
  })
);

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//log
app.use(logger({ path: config.get("logfile") }));

// application routes
app.use("/", apis);

// swagger
// ToDo: Check
// const swaggerDoc = generateDoc(["./apis/**/*.js"]);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// app.use("/api-docs.json", (req, res) => res.json(swaggerDoc));

app.listen(config.get("port"));
console.log("Listening on http://localhost:" + config.get("port"));
