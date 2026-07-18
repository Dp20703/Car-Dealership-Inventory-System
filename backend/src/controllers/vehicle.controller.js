import * as vehicleService from "../services/vehicle.service.js";

export const createVehicle = async (req, res) => {
  try {
    const { vehicle } = await vehicleService.addVehicle(req.body);

    // Respond with a 201 Created status
    res.status(201).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    // If Mongoose validation fails (e.g., missing price), it will throw an error
    res.status(400).json({ success: false, message: error.message });
  }
};
