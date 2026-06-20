const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // 1. Ambil token dari Cookie atau Header
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }

  try {
    // 2. Bongkar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");

    // 3. Cari user di database
    req.user = await User.findById(decoded.id).select("-password");

    // 4. Pengaman jika user bernilai null (tidak ditemukan)
    if (!req.user) {
      return res.status(401).json({
        message: "Access denied! Account owner of this token has been deleted from the database.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { protect };
