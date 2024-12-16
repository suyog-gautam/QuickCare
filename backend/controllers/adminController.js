const doctorModel = require("../models/doctorModel");
const validator = require("validator");
const cloudinary = require("cloudinary").v2;
var appointmentModel = require("../models/appointmentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,

      fees,
      address,
      about,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !fees ||
      !address ||
      !about ||
      !imageFile
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      folder: "Quickcare/doctorImage", // Specify the folder name
    });
    const imageUrl = imageUpload.secure_url;

    let doctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      fees,
      address,
      about,
      image: imageUrl,
    });
    await doctor.save();

    res.json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        message: "Login successful",
        token,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const appointmentAdmin = async (req, res) => {
  try {
    const appointements = await appointmentModel
      .find({})
      .sort({ createdAt: -1 });
    res.json({ success: true, appointements });
  } catch (error) {
    console.error("Error occurred:", error);
    res.json({ success: false, message: error.message });
  }
};
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    res.json({ success: true, appointment });
  } catch (error) {
    console.error("Error occurred:", error);
    res.json({ success: false, message: error.message });
  }
};
module.exports = {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentAdmin,
  getAppointmentById,
};
