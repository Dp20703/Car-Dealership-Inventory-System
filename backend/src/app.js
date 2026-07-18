import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Attach the auth routes to the /api/auth path
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Engine running perfectly... Vroom!" });
});

export default app;
