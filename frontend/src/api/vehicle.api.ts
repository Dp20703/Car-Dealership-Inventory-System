import api from "./axios";

export interface VehicleFilters {
  make?: string;
  model?: string;
  category?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
}

export interface VehiclePayload {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

// Fetch all vehicles
export const getVehicles = async () => {
  const { data } = await api.get("/vehicles");
  return data;
};

// Search/filter vehicles by make, model, category, and/or price range.
// Empty or undefined values are dropped so the backend only sees filters
// the user actually set (an empty string would otherwise become "?make=").
export const searchVehicles = async (filters: VehicleFilters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  const { data } = await api.get(`/vehicles/search?${params.toString()}`);
  return data;
};

// Create a new vehicle (Admin only)
export const createVehicle = async (vehicleData: VehiclePayload) => {
  const { data } = await api.post("/vehicles", vehicleData);
  return data;
};

// Update an existing vehicle (Admin only)
// NOTE: backend route is registered as PUT (router.put("/:id", ...)),
// not PATCH — using the wrong verb here means every edit 404s silently.
export const updateVehicle = async (
  id: string,
  vehicleData: Partial<VehiclePayload>,
) => {
  const { data } = await api.put(`/vehicles/${id}`, vehicleData);
  return data;
};

// Delete a vehicle (Admin only)
export const deleteVehicle = async (id: string) => {
  const { data } = await api.delete(`/vehicles/${id}`);
  return data;
};

// Restock a vehicle (Admin only)
export const restockVehicle = async (id: string, quantity: number) => {
  const { data } = await api.post(`/vehicles/${id}/restock`, { quantity });
  return data;
};

// Purchase a vehicle (User accessible)
export const purchaseVehicle = async (id: string) => {
  const { data } = await api.post(`/vehicles/${id}/purchase`);
  return data;
};
