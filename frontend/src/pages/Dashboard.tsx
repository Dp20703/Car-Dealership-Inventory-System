import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  price: number;
  quantity: number;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  console.log("current user:", user);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Ensure your backend returns the data in the expected structure
        const { data } = await api.get("/vehicles");
        // Adjust this if your backend returns data directly or wrapped in { data: ... }
        setVehicles(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.log("dashboard error:", error);
        toast.error("Failed to load inventory");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  if (isLoading)
    return (
      <div className="tw-loader-screen">
        <div className="tw-spinner"></div>
      </div>
    );

  return (
    <div className="tw-container p-10">
      <h1 className="tw-section-title mb-8">Available Inventory</h1>

      {vehicles.length === 0 ? (
        /* Empty State */
        <div className="tw-empty tw-card p-12">
          <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
          <p>The inventory is currently empty. Please check back later!</p>
        </div>
      ) : (
        /* Vehicle Grid */
        <div className="grid grid-cotw-1 md:grid-cotw-3 gap-6 mb-5">
          {vehicles.map((v) => (
            <div key={v._id} className="tw-card p-6 tw-card-hover">
              <h3 className="text-xl font-bold">
                {v.make} {v.model}
              </h3>
              <p className="text-primary font-semibold mt-2">₹{v.price}</p>
              <p className="text-sm text-text-muted">Stock: {v.quantity}</p>
              <div className="flex gap-2 mt-4">
                {/* User Action */}
                <button
                  onClick={() => handlePurchase(v._id)}
                  className="tw-btn-primary"
                >
                  Purchase
                </button>

                {/* Admin Actions */}
                {user?.role === "ADMIN" && (
                  <>
                    <button
                      onClick={() => navigate(`/edit-vehicle/${v._id}`)}
                      className="tw-btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="tw-btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleRestock(v._id)}
                      className="tw-btn-success"
                    >
                      Restock
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {user?.role === "ADMIN" && (
        <button
          onClick={() => navigate("/add-vehicle")}
          className="tw-btn-primary"
        >
          Add Vehicle
        </button>
      )}
    </div>
  );
};
