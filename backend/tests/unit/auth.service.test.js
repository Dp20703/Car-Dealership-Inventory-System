import { jest } from "@jest/globals";
import { registerUser } from "../../src/services/auth.service.js";
import User from "../../src/models/User.js";

describe("Authentication Service - User Registration", () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it("should successfully register a new user with valid data", async () => {
    const mockUserData = {
      name: "Test Customer",
      email: "customer@dealership.com",
      password: "SecurePassword123",
    };

    // 1. Directly intercept the Mongoose methods on the imported User object
    User.findOne = jest.fn().mockResolvedValue(null);
    User.prototype.save = jest.fn().mockResolvedValue();

    const result = await registerUser(mockUserData);

    // 2. Verify the engine returns the right data
    expect(result.user.name).toBe(mockUserData.name);
    expect(result.user.email).toBe(mockUserData.email);
  });

  it("should throw an error if the email is already in use", async () => {
    const mockUserData = {
      name: "Duplicate Customer",
      email: "existing@dealership.com",
      password: "password123",
    };

    // 1. Intercept the method to simulate finding an existing user
    User.findOne = jest
      .fn()
      .mockResolvedValue({ email: "existing@dealership.com" });

    // 2. Verify the safety feature catches the duplicate
    await expect(registerUser(mockUserData)).rejects.toThrow(
      "Email is already registered",
    );
  });
});
