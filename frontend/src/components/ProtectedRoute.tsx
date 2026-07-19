import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="tw-loader-screen">
        <div className="tw-spinner"></div>
      </div>
    );
  if (!user) return <Navigate to="/login" />;

  return children;
};
