var userModel = require("../models/userModel");
var doctorModel = require("../models/doctorModel");
var appointmentModel = require("../models/appointmentModel");
var validator = require("validator");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { get } = require("mongoose");
require("dotenv").config();
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      message: "User info fetched successfully",
      userData,
    });
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { userId, name, email, phone, address, gender, dob } = req.body;
    const imageFile = req.file;

    // Validate required fields
    if (!userId || !name || !email || !phone || !address || !gender || !dob) {
      return res.status(400).json({ success: false, message: "Missing Data" });
    }

    // Update user details
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email, phone, address, gender, dob },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Handle image upload
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "Quickcare/userImage",
      });

      const imageUrl = imageUpload.secure_url;

      // Update user with the new image URL
      await userModel.findByIdAndUpdate(
        userId,
        { image: imageUrl },
        { new: true }
      );
    }

    res.json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//Api to get appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor is not available currently",
      });
    }
    let slotsBooked = docData.slots_booked;
    //Checking if the slot is already booked
    if (slotsBooked[slotDate]) {
      if (slotsBooked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Another appointment is already booked for this time",
        });
      } else {
        slotsBooked[slotDate].push(slotTime);
      }
    } else {
      slotsBooked[slotDate] = [];
      slotsBooked[slotDate].push(slotTime);
    }
    userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;
    const newAppointment = new appointmentModel({
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
    });
    await newAppointment.save();
    // Slots data in doctors collection
    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });
    res.json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Error in getAppointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//Api to get the appointment of a user for frontend
const getUserAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    const appointments = await appointmentModel.find({ userId });
    res.json({
      success: true,
      message: "User appointment fetched successfully",
      appointments,
    });
  } catch (error) {
    console.error("Error in getUserAppointment:", error);
    res.json({ success: false, message: error.message });
  }
};
// Api to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    // Find the appointment
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Ensure the user is authorized to cancel the appointment
    if (appointmentData.userId.toString() !== userId) {
      return res.json({
        success: false,
        message: "You are not authorized to cancel this appointment",
      });
    }

    // Mark the appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Remove the slot from doctor's `slots_booked`
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Check if the slotDate exists
    if (doctorData.slots_booked[slotDate]) {
      const index = doctorData.slots_booked[slotDate].indexOf(slotTime);
      if (index > -1) {
        doctorData.slots_booked[slotDate].splice(index, 1); // Remove the slotTime
      }

      // If no slots remain for the slotDate, delete the date entirely
      if (doctorData.slots_booked[slotDate].length === 0) {
        delete doctorData.slots_booked[slotDate];
      }

      // Update the doctor's slots_booked field in the database
      await doctorModel.findByIdAndUpdate(docId, {
        slots_booked: doctorData.slots_booked,
      });
    }

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Error in cancelAppointment:", error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  getUserAppointment,
  cancelAppointment,
};
