import { useState } from "react";
import { type AxiosError } from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(formData);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ||
        "Login failed. Check your email and password.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your inventory"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <div className="relative">
          <FormField
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="pr-16"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-[2.5rem] text-xs font-medium text-primary hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="tw-btn-primary w-full mt-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Signing in…
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="text-sm text-text-muted dark:text-text-darkMuted text-center mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="dark:text-primary-light text-primary-dark font-medium hover:underline"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};
