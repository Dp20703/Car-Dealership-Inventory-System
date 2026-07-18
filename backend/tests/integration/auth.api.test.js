import { jest } from "@jest/globals";
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
