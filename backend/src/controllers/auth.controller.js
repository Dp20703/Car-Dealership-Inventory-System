import User from "../models/User.js";
import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { user } = await authService.registerUser(req.body);

    // Respond with a 201 Created status
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User Registered Successfully",
    });
  } catch (error) {
    // Handle specific business logic errors (like duplicate emails)
    if (error.message === "Email is already registered") {
      return res.status(400).json({ success: false, message: error.message });
    }
    // Generic server error fallback
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    // Pass the email and password from the request body to our service
    const { user, token } = await authService.loginUser(req.body);

    // Respond with a 200 OK status, user data, and the secure JWT
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
      message: "Login Successfully!",
    });
  } catch (error) {
    // Catch our generic "Invalid credentials" error for security
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    // req.user is populated by the 'protect' middleware
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
