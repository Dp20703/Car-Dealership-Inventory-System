import api from "./axios";

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
