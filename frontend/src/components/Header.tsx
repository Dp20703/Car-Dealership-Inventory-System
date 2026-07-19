import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDarkMode } from "../hooks/useDarkMode";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
    <path
      d="M12 4V2M12 22v-2M4.93 4.93 3.51 3.51M20.49 20.49l-1.42-1.42M4 12H2m20 0h-2M4.93 19.07l-1.42 1.42M20.49 3.51l-1.42 1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
    <path
      d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6 6 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useDarkMode();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials =
    user?.name
      ?.split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-50 bg-ink border-b-2 border-secondary">
      <div className="tw-navbar-inner">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-display font-semibold uppercase tracking-wide text-white"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary/20 text-lg">
            🚗
          </span>
          <span className="xs:inline">CarDealer</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          <Link
            to="/"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Dashboard
          </Link>

          {user?.role === "ADMIN" && (
            <button
              onClick={() => navigate("/add-vehicle")}
              className="tw-btn-success"
            >
              <PlusIcon />
              Add Vehicle
            </button>
          )}

          <button
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="tw-btn !px-2.5 bg-white/10 hover:bg-white/20 text-white"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {user && (
            <div className="flex items-center gap-3 pl-3 ml-1 border-l border-white/15">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-ink text-xs font-bold shrink-0"
                title={user.name}
              >
                {initials}
              </div>
              <div className="leading-tight hidden lg:block">
                <p className="text-sm font-medium text-white truncate max-w-[8rem]">
                  {user.name}
                </p>
                <p className="text-xs text-white/50">
                  {user.role === "ADMIN" ? "Administrator" : "Member"}
                </p>
              </div>
            </div>
          )}

          <button onClick={logout} className="tw-btn-danger">
            Logout
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="tw-btn !px-2.5 bg-white/10 hover:bg-white/20 text-white"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="tw-btn !px-2.5 bg-white/10 hover:bg-white/20 text-white"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-ink-light animate-slide-down">
          <div className="tw-container py-4 flex flex-col gap-3">
            {user && (
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-ink text-sm font-bold shrink-0">
                  {initials}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-white/50">
                    {user.role === "ADMIN" ? "Administrator" : "Member"}
                  </p>
                </div>
              </div>
            )}

            <Link
              to="/"
              className="text-sm font-medium text-white py-2"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>

            {user?.role === "ADMIN" && (
              <button
                onClick={() => {
                  navigate("/add-vehicle");
                  setMobileOpen(false);
                }}
                className="tw-btn-success justify-center"
              >
                <PlusIcon />
                Add Vehicle
              </button>
            )}

            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="tw-btn-danger justify-center"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
