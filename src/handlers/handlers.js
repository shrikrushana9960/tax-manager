require('dotenv').config();
const User = require('../models/User');
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const invalidUserError = (res) => {
  res.status(401)
    .json({
      error: 'User validation failed'
    });
};

const internalServerError = (res, message = "") => {
  res.status(500)
    .json({
      error: `Internal error please try again : ${message}`
    });
};

const authenticate = (req, res) => {
  const {email, user, password} = req.body;
  user.isCorrectPassword(password, function (err, same) {
    if (err) {
      internalServerError(res, "Password mis-matched");
    } else if (!same) {
      invalidUserError(res);
    } else {
      const payload = {email};
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });
      res.status(200).cookie('token', token, {httpOnly: true}).json({name: user.name});
    }
  });
};

const extractUserDetails = (request, response, next) => {
  const email = request.email || request.body.email;
  User.findOne({email}, function (err, user) {
    if (err) {
      internalServerError(response);
    } else if (!user) {
      invalidUserError(response);
    } else {
      request.body.user = user;
      next();
    }
  });
};

const logout = function (req, res) {
  res.clearCookie("token");
  return res.sendStatus(200);
};

const logger = function (req, res, next) {
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  console.log("Cookie:", req.cookies);
  console.log("-------------------------------------------------------------");
  next();
};

module.exports = {logout, authenticate,internalServerError, extractUserDetails, logger};
