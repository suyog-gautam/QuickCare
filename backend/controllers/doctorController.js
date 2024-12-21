var doctorModel = require("../models/doctorModel");
var appointmentModel = require("../models/appointmentModel");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cloudinary = require("cloudinary").v2;
require("dotenv").config();
const changeaAvailability = async (req, res) => {
  try {
    const { doctorId } = req.body; // Destructure doctorId from the request body

    if (!doctorId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor ID is required" });
    }

    const doctorData = await doctorModel.findById(doctorId);
    if (!doctorData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    await doctorModel.findByIdAndUpdate(doctorId, {
      available: !doctorData.available,
    });

    res.status(200).json({
      success: true,
      message: "Doctor availability changed successfully",
    });
  } catch (error) {
    console.error("Error in changeaAvailability:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Error in doctorList:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const doctorData = await doctorModel.findOne({ email });
    if (!doctorData) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctorData.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    if (isMatch) {
      const token = jwt.sign({ id: doctorData._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        message: "Login successful",
        token,
      });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.json({ success: false, message: error.message });
  }
};
const getAllAppointments = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const appointments = await appointmentModel
      .find({ docId: doctorId })
      .sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error occurred:", error);
    res.json({ success: false, message: error.message });
  }
};
const cancelAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    if (doctorId !== appointment.docId) {
      return res.json({
        success: false,
        message: "You are not authorized to cancel this appointment",
      });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.json({ success: false, message: error.message });
  }
};
const completeAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body; // Expecting both id and appointmentId in the body
    const appointment = await appointmentModel.findById(appointmentId); // Find the appointment by appointmentId
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    if (doctorId !== appointment.docId) {
      return res.json({
        success: false,
        message: "You are not authorized to complete this appointment",
      });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
      payment: true,
    }); // Update using appointmentId
    res.json({ success: true, message: "Appointment completed successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.json({ success: false, message: error.message });
  }
};
const getDoctorDetails = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await doctorModel.findById(doctorId).select(["-password"]);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, doctor });
  } catch (error) {
    console.error("Error occurred:", error);
    res.json({ success: false, message: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const {
      doctorId,
      name,
      speciality,
      degree,
      experience,
      fees,
      address,
      about,
      email,
    } = req.body;
    const imageFile = req.file;
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    if (
      !name ||
      !speciality ||
      !degree ||
      !experience ||
      !fees ||
      !address ||
      !about ||
      !email
    ) {
      const missingFields = [];

      if (!name) missingFields.push("name");
      if (!speciality) missingFields.push("speciality");
      if (!degree) missingFields.push("degree");
      if (!experience) missingFields.push("experience");
      if (!fees) missingFields.push("fees");
      if (!address) missingFields.push("address");
      if (!about) missingFields.push("about");
      if (!email) missingFields.push("email");

      return res.json({
        success: false,
        message: "Missing data",
        missingFields,
      });
    }

    const updateData = {
      name,
      speciality,
      degree,
      experience,
      fees,
      address,
      about,
      email,
    };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "Quickcare/doctorImage",
      });

      updateData.image = imageUpload.secure_url;
    }

    await doctorModel.findByIdAndUpdate(doctorId, updateData, { new: true });

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  changeaAvailability,
  doctorList,
  loginDoctor,
  getAllAppointments,
  cancelAppointment,
  completeAppointment,
  getDoctorDetails,
  updateProfile,
};
