import { registerUser } from "../../src/services/auth.service.js";

describe("Authentication Service - User Registration", () => {
  // case 1:
  it("should successfully register a new user with valid data", async () => {
    const mockUserData = {
      name: "Test Customer",
      email: "customer@dealership.com",
      password: "SecurePassword123",
      role: "USER",
    };
    const result = await registerUser(mockUserData);

    expect(result).toBeDefined();
    expect(result.user.name).toBe(mockUserData.name);
    expect(result.user.email).toBe(mockUserData.email);
    expect(result.user.password).not.toBe(mockUserData.password);
  });
});
