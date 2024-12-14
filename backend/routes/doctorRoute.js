var express = require("express");
var doctorRouter = express.Router();
var doctorController = require("../controllers/doctorController");

doctorRouter.get("/list", doctorController.doctorList);

module.exports = doctorRouter;
