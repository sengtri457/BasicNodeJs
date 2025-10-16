const express = require("express");
const router = express.Router();
const {
  AddProduct,
  GetProduct,
  DeletedProduct,
  GetProductByID,
  UpdateProduct,
} = require("../Controllers/productController");

router.post("/", AddProduct);
router.get("/", GetProduct);
router.delete("/:id", DeletedProduct);
router.get("/:id", GetProductByID);
router.put("/:id", UpdateProduct);
module.exports = router;
