const jwt = require("jsonwebtoken");
require("dotenv").config();
//Admin Authentication Middleware
const authDoctor = (req, res, next) => {
  const { dtoken } = req.headers;
  if (!dtoken) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.body.doctorId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
module.exports = authDoctor;
