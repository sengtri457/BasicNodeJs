const mongoose = require("mongoose");
const { type } = require("os");
const producSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: [true, "Please Input ProductName..."],
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    description: {
      type: String,
      require: false,
    },
    quantity: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", producSchema);
