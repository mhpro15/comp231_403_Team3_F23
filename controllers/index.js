let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let userSchema = require("../models/user");

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

module.exports.handleUpdateUser = (req, res, next) => {
  let id = req.params.id;

  let updateUser = userSchema({
    _id: id,
    uid: req.body.uid,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });

  userSchema.updateOne({ _id: id }, updateUser, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ status: true, msg: "User Updated Successfully" });
    }
  });
};

module.exports.handleDeleteUser = (req, res, next) => {
  let id = req.params.id;

  userSchema.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ status: true, msg: "User Deleted Successfully" });
    }
  });
};
