import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getVehicles,
  purchaseVehicle,
  searchVehicles,
} from "../api/vehicle.api";
import { SearchBar } from "../components/SearchBar";
import { VehicleCard } from "../components/VehicleCard";
import { useAuth } from "../hooks/useAuth";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  price: number;
  quantity: number;
}

export const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data.data || []);
    } catch (error) {
      toast.error("Failed to fetch vehicles");
    }
  };

  const handleSearch = async () => {
    try {
      const data = await searchVehicles({ make: searchQuery });
      setVehicles(data.data || []);
    } catch (error) {
      toast.error("Search failed");
    }
  };

  const handlePurchase = async (v_id: string) => {
    try {
      // Execute purchase
      await purchaseVehicle(v_id);

      // Provide user feedback
      toast.success("Vehicle purchased successfully!");

      // Refresh inventory to show updated quantity
      fetchVehicles();
    } catch (error: any) {
      // Handle error (e.g., out of stock, unauthorized)
      toast.error(error.response?.data?.message || "Purchase failed");
    }
  };

  return (
    <div className="tw-container py-10">
      <h1 className="tw-section-title mb-8">Available Inventory</h1>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      {vehicles?.length === 0 ? (
        <div className="tw-empty tw-card p-12 mt-10">No vehicles found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {vehicles?.map((v: any) => (
            <VehicleCard
              key={v._id}
              vehicle={v}
              isAdmin={user?.role === "ADMIN"}
              onPurchase={() => handlePurchase(v._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
