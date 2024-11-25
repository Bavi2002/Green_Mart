const ItemModel = require("../models/ItemModel");

// Get all items
const getItems = async (req, res) => {
  try {
    const data = await ItemModel.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create item
const createItem = async (req, res) => {
  try {
    const data = new ItemModel(req.body);
    await data.save();
    res.send({ success: true, message: "Data created successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// Update item
const updateItem = async (req, res) => {
  const { id, ...rest } = req.body;
  try {
    const data = await ItemModel.updateOne({ _id: id }, rest);
    res.send({ success: true, message: "Updated successfully", data: data });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await ItemModel.deleteOne({ _id: id });
    res.send({ success: true, message: "Deleted successfully", data: data });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// Get item count
const getItemCount = async (req, res) => {
  try {
    const users = await ItemModel.find({});
    return res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// Get single item by id
const getItemById = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await ItemModel.findById(id);
    if (!order) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    res.send({ success: true, message: "User fetched successfully", data: order });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItemCount,
  getItemById,
};
