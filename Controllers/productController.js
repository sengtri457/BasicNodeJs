const Product = require("../Models/Product");
const { find } = require("../Models/User");

const AddProduct = async (req, res) => {
  try {
    const productAdd = await Product.create(req.body);
    res.status(200).json(productAdd);
  } catch (error) {
    console.error("Error adding Products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetProduct = async (req, res) => {
  try {
    const product = await Product.find();
    if (product.length == 0) {
      res.status(404).json({ error: "Product Not Foud" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error Display Products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    const FindPro = await Product.findById(id);
    if (!FindPro) {
      res.status(404).json({ error: "Product Not Foud" });
    }
    res.status(200).json(FindPro);
  } catch (error) {
    console.error("Error Display Products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeletedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDeletd = await Product.findByIdAndDelete(id);
    if (!productDeletd) {
      res.status(404).json({ error: "Product Not Foud" });
    }
    res.status(200).json({ message: "Deleted Product Successful" });
  } catch (error) {
    console.error("Error Deleted Products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const UpdateProduct = await Product.findByIdAndUpdate(id, req.body);
    if (!UpdateProduct) {
      res.status(404).json({ error: "Product Not Foud" });
    }
    const FindProduct = await Product.findById(id);
    res.status(200).json(FindProduct);
  } catch (error) {
    console.error("Error Updated Products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  AddProduct,
  GetProduct,
  DeletedProduct,
  GetProductByID,
  UpdateProduct,
};
