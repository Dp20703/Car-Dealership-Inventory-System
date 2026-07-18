import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    // Pass the request body to our tested service layer
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
