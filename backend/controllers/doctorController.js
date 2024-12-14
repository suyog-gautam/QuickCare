var doctorModel = require("../models/doctorModel");

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
module.exports = {
  changeaAvailability,
  doctorList,
};
