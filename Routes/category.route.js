const express = require("express");
const router = express.Router();
const {
  getCategory,
  addCategory,
} = require("../Controllers/categoryController");

router.get("/", getCategory);
router.post("/", addCategory);

module.exports = router;
