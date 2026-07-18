import api from "./axios";

// Register a new user
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

// Login user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

// Current user
export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

// Logout user
export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
