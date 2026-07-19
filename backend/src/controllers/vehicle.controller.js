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

export const getVehicles = async (req, res) => {
  try {
    console.log("Getvehicle contoller");
    const { vehicles } = await vehicleService.getVehicles();

    res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const searchVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.searchVehicles(req.query);
    res.status(200).json({ success: true, data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: "Search failed" });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    console.log("udpate :", req.body);
    const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    await vehicleService.deleteVehicle(req.params.id);
    res.status(200).json({ success: true, message: "Vehicle removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const purchaseVehicle = async (req, res) => {
  try {
    const { vehicle } = await vehicleService.purchaseVehicle(req.params.id);
    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const restockVehicle = async (req, res) => {
  try {
    const { vehicle } = await vehicleService.restockVehicle(
      req.params.id,
      req.body.quantity || 1,
    );
    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
