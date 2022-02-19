const State = require("../models/State");
const internalServerError = require("../handlers/handlers");

const getStates = function (req, res) {
  State.find({}, function (err, states) {
    if (err) {
      return internalServerError(res);
    }
    const stateView = states.map((state) => {
      return { stateId: state.stateId, name: state.name };
    });
    return res.status(200).send(stateView);
  });
};

const authorise = (validUserRoles, callbackFun, req, res) => {
  if (validUserRoles.includes(req.body.user.role)) {
    callbackFun(req, res);
  } else {
    res.status(401).send("User role is not valid to perform this action");
  }
};

module.exports = {
  getStates: getStates,
  authorise,
};
