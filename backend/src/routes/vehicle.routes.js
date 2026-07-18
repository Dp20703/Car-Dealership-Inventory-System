import express from "express";
import {
  createVehicle,
  deleteVehicle,
  getVehicles,
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

// Route: POST /api/vehicles/:id (Admin Only)
router.put("/:id", protect, admin, updateVehicle);

// Route: POST /api/vehicles/:id (Admin Only)
router.delete("/:id", protect, admin, deleteVehicle);

export default router;
