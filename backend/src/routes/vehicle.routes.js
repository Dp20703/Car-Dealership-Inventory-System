import express from "express";
import {
  createVehicle,
  deleteVehicle,
  getVehicles,
  purchaseVehicle,
  restockVehicle,
  searchVehicles,
  updateVehicle,
} from "../controllers/vehicle.controller.js";
import { admin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route: POST /api/vehicles (Admin Only)
router.post("/", protect, admin, createVehicle);

// Route: GET /api/vehicles (Any Authenticated User)
router.get("/", protect, getVehicles);

// Route: GET /api/vehicles/search (Any Authenticated User)
router.get("/search", protect, searchVehicles);

// Route: PUT /api/vehicles/:id (Admin Only)
router.put("/:id", protect, admin, updateVehicle);

// Route: DELETE /api/vehicles/:id (Admin Only)
router.delete("/:id", protect, admin, deleteVehicle);

// Route: POST /api/vehicles/:id/purchase (Any Authenticated User)
router.post("/:id/purchase", protect, purchaseVehicle);

// Route: POST /api/vehicles/:id/restock (Admin Only)
router.post("/:id/restock", protect, admin, restockVehicle);

export default router;
