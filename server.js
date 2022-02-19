const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const mongoose = require("mongoose");
const User = require("./src/models/User");
const withAuth = require("./src/middleware/middleware");
const {
  authenticate, logout, extractUserDetails, internalServerError, logger
} = require("./src/handlers/handlers");

const mongo_uri = process.env.MONGODB_URI
const PORT = process.env.PORT

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger);

mongoose.connect(mongo_uri, {useNewUrlParser: true}, function (err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.listen(PORT, () => {
  console.log("listening on", PORT);
});

app.post("/api/signup", function (req, res) {
  const {name, email, password} = req.body;
  const user = new User({name, email, password});
  user.save(function (err) {
    if (err) {
      internalServerError(res, "Error registering new user");
    } else {
      res.status(200).send("Registration successful");
    }
  });
});

app.post("/api/authenticate", extractUserDetails, authenticate);
app.post("/api/logout", logout);
app.get('/checkToken', withAuth, function (req, res) {
  res.sendStatus(200);
});
app.use(extractUserDetails);