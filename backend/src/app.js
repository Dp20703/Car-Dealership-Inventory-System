import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"; // <-- Import the new routes

const app = express();

app.use(cors());
app.use(express.json());

// Attach the auth routes to the /api/auth path
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Engine running perfectly... Vroom!" });
});

export default app;
