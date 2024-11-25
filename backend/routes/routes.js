const express = require("express");
const {
  login,
  logout,
  signup,
  verifySignup,
  google,
} = require("../controller/controller.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/verifySignup", verifySignup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", google);

module.exports = router;
