//test push by heba

const mongoose = require("mongoose");
const userSchema = require("./user");
const teamSchema = new mongoose.Schema({
  tid: {
    type: String,
    required: true,
    unique: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  leader: {
    type: { name: String, username: String, uid: String },
    required: true,
    unique: false,
  },
  members: {
    type: String,
    required: false,
  },
  hackathonName: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
