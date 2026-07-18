import express from "express";
import { createVehicle } from "../controllers/vehicle.controller.js";

const router = express.Router();

// Route: POST /api/vehicles
router.post("/", createVehicle);

export default router;
