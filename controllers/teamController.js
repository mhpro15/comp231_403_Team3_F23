let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let teamSchema = require("../models/team");


//GET TEAMS
module.exports.handleTeamList = async (req, res, next) => {
  try {
    let teamList = await teamSchema.find();
    res.json({ status: true, data: teamList });
  } catch (error) {
    console.log(error);
    res.json({ status: false, msg: "Failed to Fetch Teams List" });
  }
};

//CREATE TEAMS
module.exports.handleCreateTeam = async (req, res, next) => {
  //get last uid
  let lastTeam = await teamSchema.findOne().sort({ tid: -1 });
  let newTeam = new teamSchema({
    tid: Number(lastTeam.tid) + 1,
    teamName: req.body.teamName,
    leaderName: req.body.leaderName,
    members: req.body.members,
    hackathonName: req.body.hackathonName,
  });
  console.log(req.body);
  try {
    await newTeam.save();
    res.json({ status: true, msg: "Team Created Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: false, msg: "Failed to Create Team" });
  }
};

//UPDATE TEAMS
module.exports.handleUpdateTeam = (req, res, next) => {
  let id = req.params.id;

  let updateTeam = teamSchema({
    _id: id,
    tid: req.body.tid,
    teamName: req.body.teamName,
    leaderName: req.body.leaderName,
    members: req.body.members,
    hackathonName: req.body.hackathonName,
  });

  userSchema.updateOne({ _id: id }, updateTeam, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ status: true, msg: "Team Updated Successfully" });
    }
  });
};

//DELETE TEAMS
module.exports.handleDeleteTeam = (req, res, next) => {
  let id = req.params.id;

  teamSchema.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ status: true, msg: "Team Deleted Successfully" });
    }
  });
};
