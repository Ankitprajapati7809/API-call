const User = require("../models/userModel");
const express = require("express");
const router = express.Router();

router.post("/", async (req, resp) => {
  const { name, email, age } = req.body;
  console.log(name, email, age); // Check if name is received

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    resp.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    resp.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, resp) => {
  try {
    const allData = await User.find();
    resp.status(200).json(allData);
  } catch (error) {
    console.log(error);
    resp.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, resp) => {
  const { id } = req.params;
  //  console.log(id);
  try {
    const singleData = await User.findById({ _id: id });
    resp.status(200).json(singleData);
  } catch (error) {
    console.log(error);
    resp.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, resp) => {
  const { id } = req.params;
  //  console.log(id);
  try {
    const singleData = await User.findByIdAndDelete({ _id: id });
    resp.status(200).json(singleData);
  } catch (error) {
    console.log(error);
    resp.status(400).json({ error: error.message });
  }
});

router.patch("/:id", async (req, resp) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  console.log(name);
  console.log(id);
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    resp.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    resp.status(400).json({ error: error.message });
  }
});

module.exports = router;
