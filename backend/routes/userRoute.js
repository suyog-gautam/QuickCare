var express = require("express");
var userRouter = express.Router();
const userController = require("../controllers/userController");
const authUser = require("../middleware/authUser");
var upload = require("../middleware/multer");
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/get-profile", authUser, userController.getProfile);
userRouter.post(
  "/update-profile",

  upload.single("image"),
  authUser,
  userController.updateProfile
);

module.exports = userRouter;
