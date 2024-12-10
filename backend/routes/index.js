var express = require("express");
var router = express.Router();

const app = express();
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "QuickCare" });
});

module.exports = router;
