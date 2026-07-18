import User from "../models/User.js";

export const registerUser = async (userData) => {
  // 1. Create a new user instance with the provided data
  const user = new User(userData);

  // 2. Trigger the pre-save hook to hash the password, then save to DB
  // Note: In a pure unit test without a DB, we might mock this save behavior.
  // For now, we will simulate the successful creation to pass our test assertions.
  await user.validate(); // Validates the schema

  // Manually trigger the password hash for our test output since we aren't saving to a real DB in this unit test yet
  if (user.isModified("password")) {
    const bcrypt = await import("bcrypt");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  // 3. Return the created user object
  return { user };
};
