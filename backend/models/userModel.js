var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema(
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
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    address: {
      type: String,
      default: "Not Specified",
    },
    phone: {
      type: Number,
      default: "0000000000",
    },
    gender: {
      type: String,
      default: "Not Selected",
    },
    dob: {
      type: String,
      default: "Not Selected",
    },
  },
  { minimize: false }
);
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
module.exports = userModel;
