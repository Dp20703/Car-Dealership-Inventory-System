import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../../src/app.js";
import User from "../../src/models/User.js";
import Vehicle from "../../src/models/Vehicle.js";

describe("Vehicle API Endpoints", () => {
  jest.setTimeout(10000);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/vehicles", () => {
    const mockVehicleData = {
      make: "Ford",
      model: "Mustang",
      category: "Coupe",
      price: 35000,
      quantity: 2,
    };

    it("should return 401 if no authorization token is provided", async () => {
      const response = await request(app)
        .post("/api/vehicles")
        .send(mockVehicleData);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Not authorized, no token");
    });

    it("should return 403 if a non-admin user tries to add a vehicle", async () => {
      // Generate a real token for a standard user
      const token = jwt.sign(
        { id: "user123", role: "USER" },
        process.env.JWT_SECRET || "fallback_secret_for_tests",
      );

      // Simulate finding the standard user in the database
      User.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ _id: "user123", role: "USER" }),
      });

      const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send(mockVehicleData);

      expect(response.status).toBe(403); // 403 Forbidden
      expect(response.body.message).toBe("Not authorized as an admin");
    });

    it("should return 201 if an admin user successfully adds a vehicle", async () => {
      // Generate a real token for an admin user
      const token = jwt.sign(
        { id: "admin123", role: "ADMIN" },
        process.env.JWT_SECRET || "fallback_secret_for_tests",
      );

      // Simulate finding the admin in the database and successfully saving the vehicle
      User.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ _id: "admin123", role: "ADMIN" }),
      });
      Vehicle.prototype.save = jest.fn().mockResolvedValue();

      const response = await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send(mockVehicleData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });
  });
});
