import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  console.log("user:", user);
  if (isLoading)
    return (
      <div className="ls-loader-screen">
        <div className="ls-spinner"></div>
      </div>
    );
  if (!user) return <Navigate to="/login" />;

  return children;
};
