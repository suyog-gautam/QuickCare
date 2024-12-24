var express = require("express");
var userRouter = express.Router();
var PaymentController = require("../controllers/PaymentController");
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
userRouter.post("/book-appointment", authUser, userController.bookAppointment);
userRouter.get(
  "/appointment-list",
  authUser,
  userController.getUserAppointment
);
userRouter.post(
  "/cancel-appointment",
  authUser,
  userController.cancelAppointment
);
userRouter.post(
  "/initiate-payment",
  authUser,
  PaymentController.initiatePayment
);
module.exports = userRouter;
