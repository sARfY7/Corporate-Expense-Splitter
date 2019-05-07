const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

const expenseController = require("../controllers/expense.controller");
const isAuth = require("../middlewares/is-authenticated");

router.get("/expense", isAuth, expenseController.getExpense);

router.post(
  "/expense",
  isAuth,
  upload.single("exp_proof"),
  expenseController.postExpense
);

router.get("/expense/add", isAuth, expenseController.addExpense);

router.get(
  "/expense/reimburse/:expense_id",
  isAuth,
  expenseController.reimburseExpense
);

router.get("/proof/:image", expenseController.getProof);

router.post("/expense/search", isAuth, expenseController.searchExpense);

module.exports = router;
