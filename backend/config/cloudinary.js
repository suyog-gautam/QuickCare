var cloudinary = require("cloudinary").v2;
require("dotenv").config();
const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary connected successfully!");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectCloudinary;
