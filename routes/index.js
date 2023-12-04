var express = require("express");
var router = express.Router();

let controller = require("../controllers/index");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "COMP231" });
});

router.get("/user/:id", controller.getUser);

router.get("/user-list", controller.handleUserList);

router.post("/create-user", controller.handleCreateUser);

router.put("/update-user/:id", controller.handleUpdateUser);

router.delete("/delete-user/:id", controller.handleDeleteUser);

module.exports = router;
