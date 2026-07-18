import Vehicle from "../models/Vehicle";

export const addVehicle = async (vehicleData) => {
  // 1. Create a new vehicle instance based on the provided data
  const vehicle = new Vehicle(vehicleData);

  // 2. Save the vehicle to the database
  await vehicle.save();

  // 3. Return the saved vehicle
  return { vehicle };
};
