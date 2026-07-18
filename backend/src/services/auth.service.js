import User from "../models/User.js";

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
