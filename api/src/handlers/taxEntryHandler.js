const TaxEntry = require("../models/TaxEntry");
const { internalServerError } = require("./handlers");
const { TaxStatus, Role } = require("../models/utils");
const States = require("../models/State");
const User = require("../models/User");

const getTaxEntries = function (req, res) {
  console.log("here" + JSON.stringify(req.body.user));
  if (req.body.user.role == Role.TAX_PAYER) {
    return getTaxEntriesFor(req.body.user.email, res);
  } else {
    return getTaxEntriesForAll(req.body.user.taxPayerIds, res);
  }
};

const getTaxEntriesForAll = function (taxPayerIds, res) {
  return TaxEntry.find(
    { taxPayerId: { $in: taxPayerIds } },
    function (err, taxEntries) {
      if (err) {
        console.log(err);
        return internalServerError(res);
      }
      const response = taxEntries.map((taxEntry) => {
        var currentStatus = taxEntry.status;
        if (
          taxEntry.status == TaxStatus.PENDING &&
          taxEntry.dueAt > new Date()
        ) {
          currentStatus = TaxStatus.OVER_DUE;
        }
        return {
          id: taxEntry.id,
          taxPayerId: taxEntry.taxPayerId,
          createdAt: taxEntry.createdAt,
          dueAt: taxEntry.dueAt,
          status: currentStatus,
          taxableAmount: taxEntry.taxableAmount,
          totalTax: taxEntry.totalTax,
        };
      });
      res.status(200).send(response);
    }
  );
};

const getTaxEntriesFor = function (taxPayerId, res) {
  TaxEntry.find({ taxPayerId: taxPayerId }, function (err, taxEntries) {
    if (err) {
      console.log(err);
      return internalServerError(res);
    }
    const response = taxEntries.map((taxEntry) => {
      var currentStatus = taxEntry.status;
      if (taxEntry.status == TaxStatus.PENDING && taxEntry.dueAt > new Date()) {
        currentStatus = TaxStatus.OVER_DUE;
      }
      return {
        id: taxEntry.id,
        taxPayerId: taxEntry.taxPayerId,
        createdAt: taxEntry.createdAt,
        dueAt: taxEntry.dueAt,
        status: currentStatus,
        taxableAmount: taxEntry.taxableAmount,
        totalTax: taxEntry.totalTax,
      };
    });
    res.status(200).send(response);
  });
};

const makePayment = function (req, res) {
  console.log(req.params);
  console.log(req.body.user.email);
  if (req.body.status == "success") {
    TaxEntry.findOne(
      { taxPayerId: req.body.user.email, id: req.params.entryId },
      function (err, taxEntry) {
        if (err) {
          console.log(err);
          internalServerError(res);
        } else {
          taxEntry.status = TaxStatus.PAID;
          taxEntry.save(function (err) {
            if (err) {
              console.log(err);
              internalServerError(res);
            } else {
              return res.status(200).send("Payment successful");
            }
          });
        }
      }
    );
  }
};

const createTaxEntry = (req, res) => {
  const { taxPayerId, taxableAmount, user } = req.body;
  const dueAt = new Date();
  dueAt.setDate(20);
  dueAt.setMonth(dueAt.getMonth() + 1);

  User.findOne({ email: taxPayerId }, (err, taxPayer) => {
    if (err) {
      internalServerError(res);
    } else {
      States.findOne({ stateId: taxPayer.stateId }, (err, state) => {
        if (err) {
          internalServerError(res);
        } else {
          let totalTax = 0;
          if (!state.isUnionTerritory) {
            totalTax = taxableAmount * (state.stateTax / 100);
          }
          const taxEntry = new TaxEntry({
            taxPayerId,
            createdAt: Date.now(),
            dueAt,
            status: TaxStatus.PENDING,
            taxableAmount,
            totalTax,
          });
          taxEntry.save((err) => {
            if (err) {
              console.log(err);
              internalServerError(res);
            } else {
              res.status(200).send("Successfully created tax entry");
            }
          });
        }
      });
    }
  });
};

module.exports = {
  getTaxEntries,
  makePayment,
  createTaxEntry,
};
