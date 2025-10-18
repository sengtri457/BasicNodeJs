const mongoose = require("mongoose");
const { type } = require("os");

const supplierSchema = new mongoose.Schema(
  {
    supplieerName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    tell: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Supplier", supplierSchema);
