const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const session = require("express-session");
mongoose.connect(
  "mongodb://localhost:27017/corporate-expense-splitter",
  {
    useNewUrlParser: true
  },
  error => {
    if (!error) {
      console.log("MongoDB Server Connection Established");
    } else {
      console.log("Error: MongoDB Connection Error");
    }
  }
);

// Routes
const authRoutes = require("./routes/auth.route");
const expenseRoutes = require("./routes/expense.route");

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.set("view engine", "ejs");

// Using Routes
app.use(authRoutes);
app.use(expenseRoutes);

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
