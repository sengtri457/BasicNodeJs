const Supplier = require("../Models/supplier");

const getSupplier = async (req, res) => {
  const suppiers = await Supplier.find();
  if (suppiers.length <= 0) {
    res.status(404).json({ error: "supplier Not found" });
  }
  res.status(202).json(suppiers);
};

const addSupplier = async (req, res) => {
  try {
    const suppliers = await Supplier.create(req.body);
    res.status(202).json("Supplier Add Successful!!");
  } catch (error) {
    res.status(404).json({ error: "Fail to Add Suppliers...." });
  }
};

module.exports = { getSupplier, addSupplier };
