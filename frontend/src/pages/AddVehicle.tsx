import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Header } from "../components/Header";

export const AddVehicle = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    price: "",
    quantity: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/vehicles", formData);
      toast.success("Vehicle added successfully!");
      navigate("/");
    } catch (error) {
      console.log("Add vehicle error:", error);
      toast.error("Failed to add vehicle. Ensure you have Admin access.");
    }
  };

  return (
    <div className="tw-page">
      <Header />
      <div className="tw-container p-10 flex flex-col justify-center items-center">
        <h2 className="tw-section-title mb-6">Add New Vehicle</h2>
        <form onSubmit={handleSubmit} className="tw-card p-6 max-w-lg">
          <input
            className="tw-input mb-4"
            placeholder="Make"
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
          />
          <input
            className="tw-input mb-4"
            placeholder="Model"
            onChange={(e) =>
              setFormData({ ...formData, model: e.target.value })
            }
          />
          <input
            className="tw-input mb-4"
            placeholder="Category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
          <input
            className="tw-input mb-4"
            type="number"
            placeholder="Price"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <input
            className="tw-input mb-4"
            type="number"
            placeholder="Quantity"
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
          <button type="submit" className="tw-btn-primary w-full">
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};
