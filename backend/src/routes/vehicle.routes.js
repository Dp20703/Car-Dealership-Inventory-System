import express from "express";
import {
  createVehicle,
  getVehicles,
  searchVehicles,
} from "../controllers/vehicle.controller.js";
import { admin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route: POST /api/vehicles (Admin Only)
router.post("/", protect, admin, createVehicle);

// Route: GET /api/vehicles (Any Authenticated User)
router.get("/", protect, getVehicles);

// Route: GET /api/vehicles/search (Any Authenticated User)
router.get("/search", protect, searchVehicles);

export default router;
