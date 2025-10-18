const express = require("express");
const router = express.Router();
const {
  getSupplier,
  addSupplier,
} = require("../Controllers/supplierController");

router.get("/", getSupplier);
router.post("/", addSupplier);
module.exports = router;
