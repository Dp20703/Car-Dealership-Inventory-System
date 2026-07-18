import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (userData) => {
  // 1. Check if a user with this email already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // 2. Create a new user instance
  const user = new User(userData);

  // 3. Save the user (the Mongoose pre-save hook handles the password hashing!)
  await user.save();

  return { user };
};

export const loginUser = async ({ email, password }) => {
  // 1. Check if the user exists in our database
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials"); // Generic error for security
  }

  // 2. Verify the password matches the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 3. Generate the secure JWT token [cite: 134]
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "fallback_secret_for_tests",
    { expiresIn: "1d" }, // Token expires in 1 day
  );

  // 4. Return the authorized user and their new token
  return { user, token };
};
