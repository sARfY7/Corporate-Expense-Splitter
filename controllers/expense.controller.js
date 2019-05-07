const path = require("path");

const Expense = require("../models/expense.model");
const User = require("../models/user.model");

exports.addExpense = (req, res) => {
  res.render("add-expense", { activeNav: "add-expense", message: "" });
};

exports.getProof = (req, res) => {
  const imageName = req.params.image;
  res.sendFile(path.join(__dirname, `../uploads/${imageName}`));
};

exports.getExpense = (req, res) => {
  const loggedInUser = req.session.user;
  if (loggedInUser.isAdmin) {
    Expense.find()
      .then(expenses => {
        res.render("view-expense", {
          expenses: expenses,
          activeNav: "view-expense",
          isAdmin: true
        });
      })
      .catch(error => res.send(error));
  } else {
    User.findOne({ employeeID: loggedInUser.employeeID })
      .populate("expenses")
      .exec((error, user) => {
        if (!user) {
          return res.send("No Expenses created yet!");
        }
        res.render("view-expense", {
          expenses: user.expenses,
          activeNav: "view-expense",
          isAdmin: false
        });
      });
  }
};

exports.postExpense = (req, res) => {
  const {
    exp_name,
    exp_dividedInto,
    exp_dividedAmong,
    exp_amount,
    exp_addedBy
  } = req.body;
  const expense = new Expense({
    name: exp_name,
    dividedInto: exp_dividedInto,
    dividedAmong: exp_dividedAmong,
    amount: exp_amount,
    dividedAmount: exp_amount / exp_dividedInto,
    addedBy: exp_addedBy,
    proof: req.file.filename
  });
  expense.save((error, exp) => {
    if (error) {
      console.log(error);
    }
    disperseExpenses(exp);
    res.render("add-expense", {
      activeNav: "add-expense",
      message: "Expense Added"
    });
  });
};

exports.reimburseExpense = (req, res) => {
  //   console.log(req.params);
  const { expense_id } = req.params;
  Expense.findOneAndUpdate({ _id: expense_id }, { reimbursed: true })
    .then(updatedExpense => {
      if (!updatedExpense) {
        console.error("Expense Reimbursement Error!");
      }
      reimburseExpenses(updatedExpense);
      res.send("Expense Reimbursed!");
    })
    .catch(error => {
      console.error(error);
    });
};

exports.searchExpense = (req, res) => {
  const { expense_name } = req.body;
  Expense.find({ name: expense_name })
    .then(expense => {
      if (expense.length === 0) {
        console.error("No Expense Found!");
        return res.end("No Expense Found!");
      }
      res.send(expense);
    })
    .catch(error => {
      console.error(error);
    });
};

const disperseExpenses = expense => {
  const dividedAmongEmp = expense.dividedAmong;
  dividedAmongEmp.forEach(employee => {
    User.findOneAndUpdate(
      { employeeID: employee },
      { $push: { expenses: expense._id } }
    )
      .then(updatedUser => {
        if (!updatedUser) {
          console.error("Expense Dispersion Error!");
        }
        console.log("Expense Dispersed!");
      })
      .catch(error => {
        console.error(error);
      });
  });
};

const reimburseExpenses = expense => {
  const dividedAmongEmp = expense.dividedAmong;
  dividedAmongEmp.forEach(employee => {
    User.findOneAndUpdate(
      { employeeID: employee },
      {
        $push: { reimbursedExpenses: expense._id },
        $pull: { expenses: expense._id }
      }
    )
      .then(updatedUser => {
        if (!updatedUser) {
          console.error("Expense Reimbursement Error!");
        }
        console.log("Expense Reimbursed!");
      })
      .catch(error => {
        console.error(error);
      });
  });
};

const addExpenseProof = expense => {
  const dividedAmongEmp = expense.dividedAmong;
  dividedAmongEmp.forEach(employee => {
    User.findOneAndUpdate(
      { employeeID: employee },
      {
        $push: { reimbursedExpenses: expense._id },
        $pull: { expenses: expense._id }
      }
    )
      .then(updatedUser => {
        if (!updatedUser) {
          console.error("Expense Reimbursement Error!");
        }
        console.log("Expense Reimbursed!");
      })
      .catch(error => {
        console.error(error);
      });
  });
};
