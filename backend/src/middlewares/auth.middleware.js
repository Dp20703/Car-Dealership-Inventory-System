import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Bouncer 1: Verifies the JWT and attaches the user to the request
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Decode and verify the token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback_secret_for_tests",
      );

      // Find the user and attach them to the request (excluding their password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.log("Middleware Auth Error:", error.message);
      res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};

// Bouncer 2: Checks if the attached user is an Admin
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res
      .status(403)
      .json({ success: false, message: "Not authorized as an admin" });
  }
};
