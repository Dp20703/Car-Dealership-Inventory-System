import { useEffect, useState } from "react";
import {
  getVehicles,
  purchaseVehicle,
  deleteVehicle,
  restockVehicle,
} from "../api/vehicle.api";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  price: number;
  quantity: number;
}

export const Dashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      toast.error("Failed to load inventory");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (id: string) => {
    try {
      await purchaseVehicle(id);
      toast.success("Purchase successful!");
      fetchVehicles(); // Refresh list
    } catch (error) {
      toast.error("Purchase failed");
    }
  };

  if (isLoading)
    return (
      <div className="tw-loader-screen">
        <div className="tw-spinner"></div>
      </div>
    );

  return (
    <div className="tw-container py-10">
      <h1 className="tw-section-title mb-8">Available Inventory</h1>

      {vehicles.length === 0 ? (
        <div className="tw-empty tw-card p-12">
          <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
          <p>The inventory is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cotw-1 md:grid-cotw-3 gap-6">
          {vehicles.map((v) => (
            <div key={v._id} className="tw-card p-6 tw-card-hover">
              <h3 className="text-xl font-bold">
                {v.make} {v.model}
              </h3>
              <p className="text-primary font-semibold mt-2">${v.price}</p>
              <p className="text-sm text-text-muted">Stock: {v.quantity}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handlePurchase(v._id)}
                  className="tw-btn-primary"
                >
                  Purchase
                </button>
                {user?.role === "ADMIN" && (
                  <>
                    <button
                      onClick={() => {
                        /* navigate to edit */
                      }}
                      className="tw-btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        /* handle delete */
                      }}
                      className="tw-btn-danger"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
