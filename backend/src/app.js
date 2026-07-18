import express from "express";
import cors from "cors";

const app = express();

// Middleware: The intake manifold
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads

// Basic health check route to verify the engine is running
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Engine running perfectly... Vroom!" });
});

// We will attach our Auth and Vehicle routes here later

export default app;
