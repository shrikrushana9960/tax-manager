const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
  stateId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isUnionTerritory: { type: Boolean, required: true, default: false },
  stateTax: { type: Number, required: true },
});

module.exports = mongoose.model("State", StateSchema);
