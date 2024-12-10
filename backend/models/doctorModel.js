var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: false,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    slots_booked: { type: Object, default: {} },
  },
  { minimize: false }
);
const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
module.exports = doctorModel;
