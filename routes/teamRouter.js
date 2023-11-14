var express = require("express");
var router = express.Router();

let controller = require("../controllers/teamController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "COMP231" });
});

router.get("/team-list", controller.handleTeamList);

router.post("/create-team", controller.handleCreateTeam);

router.put("/update-team/:id", controller.handleUpdateTeam);

router.delete("/delete-team/:id", controller.handleDeleteTeam);

module.exports = router;
