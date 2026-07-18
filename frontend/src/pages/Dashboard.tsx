import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  deleteVehicle,
  getVehicles,
  purchaseVehicle,
  searchVehicles,
} from "../api/vehicle.api";
import { SearchBar } from "../components/SearchBar";
import { VehicleCard } from "../components/VehicleCard";
import { useAuth } from "../hooks/useAuth";
import { EditVehicleModal } from "../components/EditVehicleModal";
import { RestockModal } from "../components/RestockModal";
import EmptyState from "../components/EmptyState";
import { Header } from "../components/Header";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  price: number;
  quantity: number;
}

export const Dashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<"restock" | "edit" | null>(
    null,
  );
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data.data || []);
    } catch {
      toast.error("Failed to fetch vehicles");
    }
  };

  useEffect(() => {
    const loadVehicles = async () => {
      await fetchVehicles();
    };

    void loadVehicles();
  }, []);

  const handleSearch = async () => {
    try {
      const data = await searchVehicles({ make: searchQuery });
      setVehicles(data.data || []);
    } catch {
      toast.error("Search failed");
    }
  };

  const handlePurchase = async (v_id: string) => {
    try {
      await purchaseVehicle(v_id);
      toast.success("Vehicle purchased successfully!");
      fetchVehicles();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Purchase failed";
      toast.error(message);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await deleteVehicle(id);
        toast.success("Vehicle deleted successfully!");
        fetchVehicles();
      } catch {
        toast.error("Failed to delete vehicle");
      }
    }
  };

  const openEditModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveModal("edit");
  };

  const openRestockModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveModal("restock");
  };

  return (
    <div className="tw-page">
      <Header />
      <main className="tw-container py-10">
        <h1 className="tw-section-title mb-8">Available Inventory</h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        {vehicles?.length === 0 ? (
          <EmptyState
            title="No vehicles available"
            description="Your inventory is empty. Add a vehicle to begin tracking your stock and sales."
            actionLabel="Add vehicle"
            onAction={() => navigate("/add-vehicle")}
            icon="🚗"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {vehicles.map((v) => (
              <VehicleCard
                key={v._id}
                vehicle={v}
                isAdmin={user?.role === "ADMIN"}
                onPurchase={() => handlePurchase(v._id)}
                onEdit={() => openEditModal(v)}
                onRestock={() => openRestockModal(v)}
                onDelete={() => handleDelete(v._id)}
              />
            ))}
          </div>
        )}
        {activeModal === "edit" && selectedVehicle && (
          <EditVehicleModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            vehicle={selectedVehicle}
            onUpdate={fetchVehicles}
          />
        )}
        {activeModal === "restock" && selectedVehicle && (
          <RestockModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            vehicle={selectedVehicle}
            onUpdate={fetchVehicles}
          />
        )}
      </main>
    </div>
  );
};
