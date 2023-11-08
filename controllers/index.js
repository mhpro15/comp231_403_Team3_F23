let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let userSchema = require("../models/user");

module.exports.handleUserList = (req, res, next) => {
  userSchema.find((err, userList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json(userList);
    }
  });
};

module.exports.handleCreateUser = (req, res, next) => {
  let newUser = userSchema({
    uid: req.body.uid,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });

  userSchema.create(newUser, (err, userSchema) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ status: true, msg: "User Registered Successfully" });
    }
  });
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
