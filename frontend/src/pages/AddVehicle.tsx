import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FormField } from "../components/FormField";
import { Header } from "../components/Header";

export const AddVehicle = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    price: "",
    quantity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/vehicles", {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });
      toast.success("Vehicle added successfully!");
      navigate("/");
    } catch {
      toast.error("Failed to add vehicle. Ensure you have Admin access.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tw-page">
      <Header />
      <main className="tw-container py-10 max-w-2xl">
        <Link
          to="/"
          className="text-sm text-text-muted dark:text-text-darkMuted hover:text-primary transition-colors inline-flex items-center gap-1 mb-4"
        >
          ← Back to inventory
        </Link>

        <h1 className="tw-section-title mb-1">Add New Vehicle</h1>
        <p className="tw-section-subtitle mb-8">
          Add a new vehicle listing to your dealership inventory.
        </p>

        <form onSubmit={handleSubmit} className="tw-card p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Make"
              placeholder="e.g. Toyota"
              value={formData.make}
              onChange={(e) =>
                setFormData({ ...formData, make: e.target.value })
              }
              required
            />
            <FormField
              label="Model"
              placeholder="e.g. Corolla"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              required
            />
            <FormField
              label="Price ($)"
              type="number"
              min={0}
              placeholder="e.g. 24000"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
            <FormField
              label="Quantity"
              type="number"
              min={0}
              placeholder="e.g. 10"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="tw-btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="tw-btn-primary flex-1 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Adding…
                </>
              ) : (
                "Add Vehicle"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
