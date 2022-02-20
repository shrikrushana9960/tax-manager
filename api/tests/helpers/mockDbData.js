const State = require("../../src/models/State");
const User = require("../../src/models/User");

const createStates = () => {
  const state = {
    stateId: "goa",
    name: "Goa",
    isUnionTerritory: false,
    stateTax: 6,
  };
  State.create(state);
};

const createAdminUser = () => {
  const user = new User({
    name: "Admin",
    email: "admin@gmail.com",
    password: "$2b$10$eSaWdJ2RiQefs2W50.S5/.3aav5of2tozE.OvbBWD8tVdS942eMXW",
    role: "ADMIN",
    taxPayerIds: [],
    panNumber: "TEST",
    stateId: "goa",
  });
  User.create(user, (err, res) => {
    console.log("Error is : Maheshs");
    console.log(err);
  });
};

module.exports = {
  createStates,
  createAdminUser,
};
