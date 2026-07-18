import express from "express";
import { createVehicle } from "../controllers/vehicle.controller.js";
import { admin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route: POST /api/vehicles
router.post("/", protect, admin, createVehicle);

export default router;
