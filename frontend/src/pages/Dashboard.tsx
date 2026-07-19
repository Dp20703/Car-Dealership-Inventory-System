import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  deleteVehicle,
  getVehicles,
  purchaseVehicle,
  searchVehicles,
  type VehicleFilters,
} from "../api/vehicle.api";
import { SearchBar } from "../components/SearchBar";
import { VehicleCard } from "../components/VehicleCard";
import { useAuth } from "../hooks/useAuth";
import { EditVehicleModal } from "../components/EditVehicleModal";
import { RestockModal } from "../components/RestockModal";
import EmptyState from "../components/EmptyState";
import { Header } from "../components/Header";
import { VehicleCardSkeleton } from "../components/VehicleCardSkeleton";
import {
  InventoryStats,
  InventoryStatsSkeleton,
} from "../components/InventoryStats";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

export const Dashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<VehicleFilters>({});
  // Populated once from the initial unfiltered load, so the category
  // dropdown always shows every option even after a search narrows results
  const [categories, setCategories] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<"restock" | "edit" | null>(
    null,
  );
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  // Distinguish first load (skeleton grid) from a search re-fetch (small inline spinner)
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      const list: Vehicle[] = data.data || [];
      setVehicles(list);
      return list;
    } catch {
      toast.error("Failed to fetch vehicles");
      return [];
    }
  };

  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true);
      try {
        const list = await fetchVehicles();
        setCategories(Array.from(new Set(list.map((v) => v.category))).sort());
      } finally {
        setIsLoading(false);
      }
    };

    void loadVehicles();
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const data = await searchVehicles(filters);
      setVehicles(data.data || []);
    } catch {
      toast.error("Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearFilters = async () => {
    setFilters({});
    setIsSearching(true);
    try {
      await fetchVehicles();
    } catch {
      toast.error("Failed to reload vehicles");
    } finally {
      setIsSearching(false);
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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="tw-eyebrow">Inventory</span>
            <h1 className="tw-section-title mt-1">Available Stock</h1>
            <p className="tw-section-subtitle">
              Browse, manage, and track your dealership's vehicle stock.
            </p>
          </div>
        </div>

        {isLoading ? (
          <InventoryStatsSkeleton />
        ) : (
          <InventoryStats vehicles={vehicles} />
        )}

        <SearchBar
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          onSearch={handleSearch}
          onClear={handleClearFilters}
          isLoading={isSearching}
        />

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
            aria-busy="true"
            aria-live="polite"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <VehicleCardSkeleton key={i} isAdmin={user?.role === "ADMIN"} />
            ))}
          </div>
        ) : vehicles?.length === 0 ? (
          Object.values(filters).some((v) => v !== undefined && v !== "") ? (
            <EmptyState
              title="No matches found"
              description="No vehicles match your current filters. Try adjusting or clearing them."
              actionLabel="Clear filters"
              onAction={handleClearFilters}
              icon="🔍"
            />
          ) : (
            <EmptyState
              title="No vehicles on the lot"
              description="Your inventory is empty. Add a vehicle to begin tracking stock and sales."
              actionLabel="Add vehicle"
              onAction={() => navigate("/add-vehicle")}
              icon="🚗"
            />
          )
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 transition-opacity duration-200 ${
              isSearching ? "opacity-60 pointer-events-none" : "opacity-100"
            }`}
          >
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
