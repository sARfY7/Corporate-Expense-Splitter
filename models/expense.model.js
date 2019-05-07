const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  name: { type: String, required: true },
  dividedInto: { type: Number, required: true, default: 0 },
  dividedAmong: [String],
  proof: { type: String, default: "Not Uploaded" },
  amount: { type: Number, default: 0 },
  dividedAmount: Number,
  addedBy: String,
  reimbursed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Expense", expenseSchema);
