const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    adddress: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
