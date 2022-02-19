const mongoose = require("mongoose");
const { TaxStatus } = require("./utils");
const { v4 } = require("uuid");

const TaxEntrySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: v4() },
  taxPayerId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  dueAt: { type: Date, required: true },
  status: { type: TaxStatus, required: true },
  taxableAmount: { type: TaxStatus, required: true },
  totalTax: { type: TaxStatus, required: true },
});

module.exports = mongoose.model("TaxEntry", TaxEntrySchema);
