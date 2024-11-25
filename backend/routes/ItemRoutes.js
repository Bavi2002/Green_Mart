const express = require("express");
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItemCount,
  getItemById,
} = require("../controller/ItemController");

const router = express.Router();

router.get("/item", getItems);
router.post("/item_create", createItem);
router.put("/item_update", updateItem);
router.delete("/item_delete/:id", deleteItem);
router.get("/item_count", getItemCount);
router.get("/item_order/:id", getItemById);

module.exports = router;
