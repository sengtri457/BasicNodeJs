const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config(); // ✅ Make sure environment variables load

// -------------------------------
// Generate Token (Login Simulation)
// -------------------------------
router.post("/login", async (req, res) => {
  try {
    // In real use, verify email/password here
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create token payload
    const payload = { id: user._id, name: user.name };

    // ✅ Sign token with your secret key from .env
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -------------------------------
// Get all users (Protected)
// -------------------------------
router.get("/", authenticateToken, paginatedResults(User), async (req, res) => {
  try {
    const search = req.query.search || "";
    const regex = new RegExp(search, "i");

    const users = await User.find({ name: regex });
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(res.paginatedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/filtered", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.filter((user) => user.name === req.user.name));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -------------------------------
// Create user
// -------------------------------
router.post("/", async (req, res) => {
  try {
    const userCreated = await User.create(req.body);
    return res.status(201).json(userCreated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -------------------------------
// Get user by ID
// -------------------------------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({ error: "User Not Found" });
    }
    return res.status(200).json(findUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -------------------------------
// Update user
// -------------------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User Not Found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -------------------------------
// Delete user
// -------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User Not Found" });
    }
    return res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -------------------------------
// JWT Auth Middleware
// -------------------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}
module.exports = router;
