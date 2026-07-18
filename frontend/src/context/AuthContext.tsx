import { createContext, ReactNode, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/auth.api";
import api from "../api/axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          // Set the token in Axios defaults so requests are authorized
          api.defaults.headers.common["Authorization"] =
            `Bearer ${storedToken}`;

          // Fetch the current user profile from the backend
          const { data } = await api.get("/auth/me");
          setUser(data);
        } catch (error) {
          // If token is invalid/expired, clear it
          console.error("Session expired or invalid token");
          logout();
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  // REGISTER
  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await registerUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN
  const login = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const { user: userData, token: userToken } = await loginUser(credentials);
      setUser(userData);
      setToken(userToken);
      localStorage.setItem("token", userToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
