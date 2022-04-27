const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  url: { type: String, required: true },

});

module.exports = mongoose.model("State", FavSchema);
