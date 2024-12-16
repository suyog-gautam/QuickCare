var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },

  slotTime: { type: String, required: true },
  amount: { type: Number, required: true },
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.model.appointment ||
  mongoose.model("appointment", appointmentSchema);
