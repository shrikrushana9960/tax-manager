const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { getStates, authorise } = require("./src/handlers/stateHandlers");
const {
  getTaxEntries,
  makePayment,
  createTaxEntry,
} = require("./src/handlers/taxEntryHandler");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");
const State = require("./src/models/State");
const withAuth = require("./src/middleware/middleware");
const {
  authenticate,
  logout,
  extractUserDetails,
  internalServerError,
  logger,
  getUserDetails,
} = require("./src/handlers/handlers");
const {
  getTaxAccountants,
  getTaxPayers,
  registerTaxPayer,
  registerTaxAccountant,
} = require("./src/handlers/userHandler");
const { Role } = require("./src/models/utils");
const mongo_uri = process.env.MONGODB_URI;
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger);

if (process.env.NODE_ENV != "test") {
  mongoose.connect(mongo_uri, { useNewUrlParser: true }, function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  });
}

const server = app.listen(PORT, () => {
  console.log("listening on", PORT);
});

app.get("/healthcheck", (req, res) => res.send({ status: "UP" }).status(200));
app.post("/api/signup", function (req, res) {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  user.save(function (err) {
    if (err) {
      internalServerError(res, "Error registering new user");
    } else {
      res.status(200).send("Registration successful");
    }
  });
});

app.post("/api/authenticate", getUserDetails.bind(null, null), authenticate);
app.post("/api/logout", logout);
app.get("/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});

app.get(
  "/states",
  extractUserDetails,
  authorise.bind(null, [Role.ADMIN, Role.TAX_ACCOUNTANT], getStates)
);

app.post(
  "/tax-payer/register",
  extractUserDetails,
  authorise.bind(null, [Role.TAX_ACCOUNTANT], registerTaxPayer)
);

app.post(
  "/tax-accountant/register",
  extractUserDetails,
  authorise.bind(null, [Role.ADMIN], registerTaxAccountant)
);

app.get(
  "/taxAccountants",
  extractUserDetails,
  authorise.bind(null, [Role.ADMIN], getTaxAccountants)
);

app.post(
  "/taxEntry",
  extractUserDetails,
  authorise.bind(null, [Role.TAX_ACCOUNTANT], createTaxEntry)
);

app.get(
  "/taxEntries",
  extractUserDetails,
  authorise.bind(null, [Role.TAX_ACCOUNTANT, Role.TAX_PAYER], getTaxEntries)
);

app.get(
  "/taxPayers",
  extractUserDetails,
  authorise.bind(null, [Role.TAX_ACCOUNTANT], getTaxPayers)
);

app.post(
  "/taxEntries/:entryId/pay",
  extractUserDetails,
  authorise.bind(null, [Role.TAX_PAYER], makePayment)
);

const createDefaultUsers = () => {
  const path = "./.deploy/users.json";
  fs.readFile(path, "utf8", function (err, data) {
    if (err) return console.error(err);
    const usersConf = JSON.parse(data);
    usersConf.users.forEach((user) => User.create(user));
  });
};
const createStates = () => {
  const path = "./.deploy/states.json";
  fs.readFile(path, "utf8", function (err, data) {
    if (err) return console.error(err);
    const stateConf = JSON.parse(data);
    stateConf.states.forEach((state) => State.create(state));
  });
};

const startup = () => {
  createDefaultUsers();
  createStates();
};

startup();

module.exports = { app, server };
