const express = require("express");
const {
  addManager,
  getManagers,
  signIn,
  deleteManager,
  getManagerById,
  updateManager,
} = require("../controller/ManagerController");

const router = express.Router();

router.post("/add_manager", addManager);
router.get("/managers", getManagers);
router.post("/signin", signIn);
router.delete("/manager_delete/:id", deleteManager);
router.get("/manager_item_order/:id", getManagerById);
router.put("/manager_item_update", updateManager);

module.exports = router;
