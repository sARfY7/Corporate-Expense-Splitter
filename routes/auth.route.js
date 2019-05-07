const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator/check");

const authController = require("../controllers/auth.controller");

router.get("/", authController.getLogin);

router.post(
  "/login",
  [check("pass").isLength({ min: 8 })],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

module.exports = router;
