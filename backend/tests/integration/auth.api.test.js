import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import request from "supertest";
import app from "../../src/app.js";
import User from "../../src/models/User.js";

describe("Auth API Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/register", () => {
    it("should return 201 and user data on successful registration", async () => {
      // Intercept the database calls directly on the model
      User.findOne = jest.fn().mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue();

      // Act: Simulate a POST request to the API
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@dealership.com",
        password: "password123",
      });

      // Assert: Verify HTTP status and response payload
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("test@dealership.com");
    });

    it("should return 400 if the email is already registered", async () => {
      // Intercept the database call to simulate finding an existing user
      User.findOne = jest
        .fn()
        .mockResolvedValue({ email: "existing@dealership.com" });

      // Act
      const response = await request(app).post("/api/auth/register").send({
        name: "Duplicate User",
        email: "existing@dealership.com",
        password: "password123",
      });

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email is already registered");
    });
  });
});

describe("POST /api/auth/login", () => {
  it("should return 200 and a token on successful login", async () => {
    // 1. Arrange: Generate a REAL hash for our mock user so we don't have to mock bcrypt
    const salt = await bcrypt.genSalt(10);
    const realHashedPassword = await bcrypt.hash("password123", salt);

    const mockUser = {
      _id: "mockId123",
      name: "Test User",
      email: "test@dealership.com",
      password: realHashedPassword,
      role: "USER",
    };

    // Intercept the database call to return our user with the valid hash
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    // 2. Act: Send the login request with the plain-text password
    const response = await request(app).post("/api/auth/login").send({
      email: "test@dealership.com",
      password: "password123", // bcrypt will successfully compare this to realHashedPassword!
    });

    // 3. Assert: Verify the response
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });

  it("should return 401 on invalid credentials", async () => {
    // Arrange: Simulate user not found in the DB
    User.findOne = jest.fn().mockResolvedValue(null);

    // Act
    const response = await request(app).post("/api/auth/login").send({
      email: "ghost@dealership.com",
      password: "wrongpassword",
    });

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
