const jwt = require("jsonwebtoken");
require("dotenv").config();
//Admin Authentication Middleware
const authAdmin = (req, res, next) => {
  const { atoken } = req.headers;
  if (!atoken) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    if (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD !== decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
module.exports = authAdmin;
