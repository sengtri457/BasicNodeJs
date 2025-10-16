const Category = require("../Models/Category");

const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (category.length === 0) {
      res.status(404).json({ error: "Category Not Found!!" });
    }
    res.status(202).json(category);
  } catch (error) {
    console.error("Display Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(202).json(category);
  } catch (error) {
    console.error("Error adding Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCategory, addCategory };
