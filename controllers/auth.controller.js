const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  if (req.session.isLoggedIn) {
    return res.render("dashboard", { activeNav: "dashboard" });
  }
  res.render("login", {
    employee: "",
    error: false,
    error_msg: "",
    error_field: ""
  });
};

exports.postLogin = (req, res) => {
  const { emp_id, pass } = req.body;
  User.findOne({ employeeID: emp_id })
    .then(user => {
      if (!user) {
        return res.render("login", {
          employee: "",
          error: true,
          error_msg: "Invalid Employee ID!",
          error_field: "emp_id"
        });
      }
      bcrypt
        .compare(pass, user.password)
        .then(doMatch => {
          if (!doMatch) {
            return res.render("login", {
              employee: user.employeeID,
              error: true,
              error_msg: "Invalid Password!",
              error_field: "pass"
            });
          }
          req.session.isLoggedIn = true;
          req.session.user = user;
          res.render("dashboard", { activeNav: "dashboard" });
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error =>
      res.status(500).render("login", {
        employee: "",
        error: true,
        error_msg: error,
        error_field: ""
      })
    );
};

exports.postLogout = (req, res) => {
  req.session.destroy(error => {
    res.render("login", {
      employee: "",
      error: false,
      error_msg: "",
      error_field: ""
    });
  });
};

exports.getSignup = (req, res) => {
  res.render("signup", { error: false, error_msg: "", error_field: "" });
};

exports.postSignup = (req, res) => {
  const { emp_id, emp_name, pass } = req.body;
  User.findOne({ employeeID: emp_id })
    .then(emp => {
      if (emp) {
        return res.send("Employee Already Added!");
      }
      return bcrypt
        .hash(pass, 12)
        .then(hashedPassword => {
          const user = new User({
            employeeID: emp_id,
            name: emp_name,
            password: hashedPassword,
            createdOn: Date.now()
          });
          return user.save();
        })
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => console.error(error));
};
