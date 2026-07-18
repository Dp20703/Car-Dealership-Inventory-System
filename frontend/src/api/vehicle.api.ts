import api from "./axios";

// Fetch all vehicles
export const getVehicles = async () => {
  const { data } = await api.get("/vehicles");
  return data;
};

// Search vehicles with query parameters (e.g., ?make=Toyota&model=Corolla)
export const searchVehicles = async (queryParams: Record<string, string>) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const { data } = await api.get(`/vehicles/search?${queryString}`);
  return data;
};

// Create a new vehicle (Admin only)
export const createVehicle = async (vehicleData: any) => {
  const { data } = await api.post("/vehicles", vehicleData);
  return data;
};

// Update an existing vehicle (Admin only)
export const updateVehicle = async (id: string, vehicleData: any) => {
  const { data } = await api.patch(`/vehicles/${id}`, vehicleData);
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
