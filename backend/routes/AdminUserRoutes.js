const express = require("express");
const userController = require("../controller/AdminUserController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.delete("/:id", userController.deleteUser);

module.exports = router;
