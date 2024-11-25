const Manager = require("../models/ManagerModel");

const addManager = async (req, res) => {
  const { username, dili_address, dili_date, dili_status, dili_method, dili_cost, assignes_personal, notes } = req.body;

  try {
    const newManager = new Manager({
      username,
      dili_address,
      dili_date,
      dili_status,
      dili_method,
      dili_cost,
      assignes_personal,
      notes,
    });

    const savedManager = await newManager.save();
    res.status(201).json({ success: true, message: "Manager added successfully", data: savedManager });
  } catch (error) {
    console.error("Error adding manager:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

const getManagers = async (req, res) => {
  try {
    const managers = await Manager.find();
    res.status(200).json({ success: true, message: "Managers fetched successfully", data: managers });
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await Manager.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    res.status(200).json({ success: true, message: "Login successful", data: user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

const deleteManager = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Manager.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Deleted successfully", data });
  } catch (error) {
    console.error("Error deleting manager:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

const getManagerById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Manager.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User fetched successfully", data: order });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

const updateManager = async (req, res) => {
  const { id, ...rest } = req.body;

  try {
    const data = await Manager.updateOne({ _id: id }, rest);
    res.status(200).json({ success: true, message: "Updated successfully", data });
  } catch (error) {
    console.error("Error updating manager:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = {
  addManager,
  getManagers,
  signIn,
  deleteManager,
  getManagerById,
  updateManager,
};
