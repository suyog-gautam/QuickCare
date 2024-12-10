var express = require("express");
var adminRouter = express.Router();
var upload = require("../middleware/multer");
var authAdmin = require("../middleware/authAdmin");
var adminController = require("../controllers/adminController");
adminRouter.post(
  "/add-doctor",
  authAdmin,
  upload.single("image"),
  adminController.addDoctor
);
adminRouter.post("/login", adminController.loginAdmin);
module.exports = adminRouter;
