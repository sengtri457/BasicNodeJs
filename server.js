require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
// import Router

const userRote = require("./Routes/user.route");
const productRoute = require("./Routes/product.route");
const categoryRoute = require("./Routes/category.route");
app.use(cors());
app.use(express.json());
app.use("/api/users", userRote);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
// Connect to MongoDB and then start the server
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });
