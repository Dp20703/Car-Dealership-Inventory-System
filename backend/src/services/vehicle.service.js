import Vehicle from "../models/Vehicle";

export const addVehicle = async (vehicleData) => {
  // 1. Create a new vehicle instance based on the provided data
  const vehicle = new Vehicle(vehicleData);

  // 2. Save the vehicle to the database
  await vehicle.save();

  // 3. Return the saved vehicle
  return { vehicle };
};

export const getVehicles = async () => {
  // Fetch all vehicles from the database
  const vehicles = await Vehicle.find({});
  return { vehicles };
};

export const searchVehicles = async (query) => {
  // Build a query object dynamically based on provided filters
  const filter = {};
  if (query.make) filter.make = query.make;
  if (query.model) filter.model = query.model;
  if (query.category) filter.category = query.category;
  if (query.price) filter.price = { $lte: query.price }; // Finds vehicles up to this price

  const vehicles = await Vehicle.find(filter);
  return { vehicles };
};

export const updateVehicle = async (id, data) => {
  return await Vehicle.findByIdAndUpdate(id, data, { new: true });
};

export const deleteVehicle = async (id) => {
  return await Vehicle.findByIdAndDelete(id);
};

export const purchaseVehicle = async (id) => {
  const vehicle = await Vehicle.findById(id);
  if (!vehicle || vehicle.quantity <= 0)
    throw new Error("Vehicle out of stock");
  vehicle.quantity -= 1;
  await vehicle.save();
  return { vehicle };
};

export const restockVehicle = async (id, amount) => {
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) throw new Error("Vehicle not found");
  vehicle.quantity += amount;
  await vehicle.save();
  return { vehicle };
};
