const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Expense = require("./expense.model");

const userSchema = new Schema({
  employeeID: { type: String, unique: true },
  name: String,
  password: String,
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
  reimbursedExpenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
  isAdmin: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("User", userSchema);
