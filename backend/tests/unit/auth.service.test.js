import { jest } from "@jest/globals";
import User from "../../src/models/User.js";
import { loginUser, registerUser } from "../../src/services/auth.service.js";

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

describe("Authentication Service - User Login", () => {
  it("should return a user and token with valid credentials", async () => {
    // Arrange
    const mockUser = {
      _id: "mockUserId123",
      email: "customer@dealership.com",
      password: "hashedPassword123",
      role: "USER",
    };

    // Simulate finding the user in the database
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    // We will also need to mock bcrypt and jwt in our service later,
    // but right now we just want to define the expected output.

    // Act
    // Note: We will pass an unhashed password here, as the user types it in
    const result = await loginUser({
      email: "customer@dealership.com",
      password: "plainTextPassword123",
    });

    // Assert
    expect(result.token).toBeDefined(); // Expect a JWT token
    expect(result.user.email).toBe(mockUser.email);
  });

  it("should throw an error if the user is not found", async () => {
    // Simulate the database finding no one
    User.findOne = jest.fn().mockResolvedValue(null);

    await expect(
      loginUser({ email: "ghost@dealership.com", password: "password123" }),
    ).rejects.toThrow("Invalid credentials"); // Best practice: Don't specify if email or password was wrong
  });
});
