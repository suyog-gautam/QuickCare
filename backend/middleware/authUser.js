const jwt = require("jsonwebtoken");
require("dotenv").config();
//Admin Authentication Middleware
const authUser = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
module.exports = authUser;
