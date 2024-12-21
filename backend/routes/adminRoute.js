var express = require("express");
var adminRouter = express.Router();
var upload = require("../middleware/multer");
var authAdmin = require("../middleware/authAdmin");
var adminController = require("../controllers/adminController");
var doctorController = require("../controllers/doctorController");

adminRouter.post(
  "/add-doctor",
  authAdmin,
  upload.single("image"),
  adminController.addDoctor
);
adminRouter.post("/login", adminController.loginAdmin);
adminRouter.post("/all-doctors", authAdmin, adminController.allDoctors);
adminRouter.post(
  "/doctor-availability",
  authAdmin,
  doctorController.changeaAvailability
);
adminRouter.get(
  "/appointmentAdmin",
  authAdmin,
  adminController.appointmentAdmin
);
adminRouter.get(
  "/getAppointmentById/:id",
  authAdmin,
  adminController.getAppointmentById
);
adminRouter.post(
  "/cancelAppointment",
  authAdmin,
  adminController.cancelAppointment
);
module.exports = adminRouter;
