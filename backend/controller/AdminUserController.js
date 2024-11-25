const User = require("../models/AdminUsers");

// Get all users
exports.getAllUsers = async (req, res) => {
  const { search, sort } = req.query;
  const query = {};

  if (search) {
    query.name = new RegExp(search, "i");
  }

  const sortOptions = {};

  if (sort === "asc") {
    sortOptions.name = 1;
  } else if (sort === "desc") {
    sortOptions.name = -1;
  } else if (sort === "createdAtAsc") {
    sortOptions.createdAt = 1;
  } else if (sort === "createdAtDesc") {
    sortOptions.createdAt = -1;
  }

  try {
    const users = await User.find(query).sort(sortOptions).exec();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
