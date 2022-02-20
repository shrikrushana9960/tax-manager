const { Role } = require("../models/utils");
const { internalServerError } = require("./handlers");
const User = require("../models/User");

const getTaxAccountants = (req, res) => {
  User.find({ role: Role.TAX_ACCOUNTANT }, function (err, taxAccountants) {
    if (err) {
      internalServerError(res);
    } else {
      const taxAccountantsView = taxAccountants.map((taxAccountant) => {
        return { name: taxAccountant.name, email: taxAccountant.email };
      });
      return res.status(200).send(taxAccountantsView);
    }
  });
};

const getTaxPayers = (req, res) => {
  const taxAccountantEmail = req.body.user.email;
  User.findOne({ email: taxAccountantEmail }, function (err, taxAccountant) {
    if (err) {
      internalServerError(res);
    } else {
      const taxPayerIds = taxAccountant.taxPayerIds;
      console.log("taxpayrids" + taxPayerIds);
      User.find({ email: { $in: taxPayerIds } }, function (err, taxPayers) {
        if (err) {
          internalServerError(res);
        }
        const taxPayerDetails = taxPayers.map((taxPayer) => {
          return { name: taxPayer.name, email: taxPayer.email };
        });
        return res.status(200).send(taxPayerDetails);
      });
    }
  });
};

const registerTaxPayer = (req, res) => {
  const { name, email, stateId, panNumber, password, user } = req.body;
  const taxPayer = new User({
    name,
    email,
    stateId,
    password,
    role: Role.TAX_PAYER,
    panNumber,
  });
  taxPayer.save(function (err) {
    if (err) {
      console.log(err);
      internalServerError(res, "Error registering new tax payer!");
    } else {
      User.findOne({ email: user.email }, (err, taxAccountant) => {
        if (err) {
          internalServerError(
            res,
            "Error registering new tax payer against accountant!"
          );
        } else {
          console.log("aaccountat" + taxAccountant.taxPayerIds);
          taxAccountant.taxPayerIds = [...taxAccountant.taxPayerIds, email];
          taxAccountant.save(() => {
            res.status(200).send("Successfully registered new tax payer!");
          });
        }
      });
    }
  });
};

const registerTaxAccountant = (req, res) => {
  const { name, email, stateId, panNumber, password } = req.body;
  const user = new User({
    email,
    name,
    password,
    role: Role.TAX_ACCOUNTANT,
    taxPayerIds: [],
    stateId,
    panNumber,
  });
  user.save(function (err) {
    if (err) {
      console.log(err);
      internalServerError(res, "Error registering new tax accountant!");
    } else {
      res.status(200).send("Successfully registered new tax accountant!");
    }
  });
};

module.exports = {
  getTaxAccountants,
  getTaxPayers,
  registerTaxPayer,
  registerTaxAccountant,
};
