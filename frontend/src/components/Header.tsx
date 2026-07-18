import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  // Simple Dark Mode Toggle Logic
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <header className="tw-navbar">
      <div className="tw-navbar-inner">
        <Link to="/" className="text-xl font-bold text-primary">
          CarDealer
        </Link>

        <nav className="tw-nav-links">
          <Link
            to="/"
            className="tw-nav-link border tw-btn-primary rounded-xl p-[.6em] text-white dark:text-white border-0 "
          >
            Dashboard
          </Link>

          {user?.role === "ADMIN" && (
            <button
              onClick={() => navigate("/add-vehicle")}
              className="tw-btn-success "
            >
              Add Vehicle
            </button>
          )}

          <button
            onClick={() => setIsDark(!isDark)}
            className="tw-btn-secondary"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <button onClick={logout} className="tw-btn-danger">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};
