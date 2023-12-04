let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let userSchema = require("../models/user");

module.exports.getUser = async (req, res, next) => {
  try {
    console.log(req.params.id);
    let user = await userSchema.findOne({ _id: req.params.id });
    res.json({ status: true, data: user });
  } catch (error) {
    console.log(error);
    res.json({ status: false, msg: "Failed to Fetch User" });
  }
};

module.exports.handleUserList = async (req, res, next) => {
  try {
    let userList = await userSchema.find();
    res.json({ status: true, data: userList });
  } catch (error) {
    console.log(error);
    res.json({ status: false, msg: "Failed to Fetch User List" });
  }
};

module.exports.handleCreateUser = async (req, res, next) => {
  //get last uid
  let lastUser = await userSchema.findOne().sort({ uid: -1 });
  let newUser = new userSchema({
    uid: Number(lastUser.uid) + 1,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });
  console.log(req.body);
  try {
    await newUser.save();
    res.json({ status: true, msg: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: false, msg: "Failed to Create User" });
  }
};

module.exports.handleUpdateUser = async (req, res, next) => {
  let id = req.params.id;

  console.log("Updating user:", req.body);

  try {
    const newUser = await userSchema.findOneAndUpdate(
      { _id: id },
      { name: req.body.name },
      {
        new: true,
      }
    );
    console.log("Success:", newUser);
    res.json({ status: true, msg: "User Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: false, msg: "Failed to Update User" });
  }
};

module.exports.handleDeleteUser = async (req, res, next) => {
  let id = req.params.id;
  try {
    let deleteStat = await userSchema.deleteOne({ _id: id });
    console.log("Success:", deleteStat);
    res.json({ status: true, msg: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, msg: "Failed to Delete User" });
  }
};
