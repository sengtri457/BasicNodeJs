const { triggerAsyncId } = require("async_hooks");
const mongoose = require("mongoose");
const { type } = require("os");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
