var express = require("express");
var doctorRouter = express.Router();
var upload = require("../middleware/multer");
var authDoctor = require("../middleware/authDoctor");
var doctorController = require("../controllers/doctorController");

doctorRouter.get("/list", doctorController.doctorList);
doctorRouter.post("/login", doctorController.loginDoctor);
doctorRouter.post(
  "/completeAppointment",
  authDoctor,
  doctorController.completeAppointment
);
doctorRouter.post(
  "/cancelAppointment",
  authDoctor,
  doctorController.cancelAppointment
);
doctorRouter.get(
  "/appointments",
  authDoctor,
  doctorController.getAllAppointments
);
doctorRouter.get("/details", authDoctor, doctorController.getDoctorDetails);
doctorRouter.post(
  "/updateProfile",
  authDoctor,
  upload.single("image"),
  doctorController.updateProfile
);
module.exports = doctorRouter;
