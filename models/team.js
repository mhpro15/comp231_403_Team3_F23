//test push by heba

const mongoose = require("mongoose");

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
  leaderName: {
    type: String,
    required: true,
    unique: true,
  },
  members: {
    type: String,
    required: true,
  },
  hackathonName: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
