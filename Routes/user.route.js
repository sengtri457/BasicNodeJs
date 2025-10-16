const express = require("express");
const router = express.Router();
const User = require("../Models/User");

router.get("/", async (req, res) => {
  try {
    const getUser = await User.find();
    if (getUser.length == 0) {
      return res.status(400).json({ message: "User NotFound!!" });
    }
    return res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const userCreated = await User.create(req.body);
    return res.status(200).json(userCreated);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Errors" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await User.findById(id);
    return res.status(200).json(findId);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataFind = await User.findByIdAndUpdate(id, req.body);
    if (!dataFind) {
      res.status(404).json({ error: "User Not Found" });
    }
    const UpdatedData = await User.findById(id);
    return res.status(200).json(UpdatedData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findIdDel = await User.findByIdAndDelete(id);
    if (!findIdDel) {
      res.status(404).json({ error: "User Not Found" });
    }
    return res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
