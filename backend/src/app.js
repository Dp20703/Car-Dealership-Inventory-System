import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

// 1. Logger first so you can see all incoming requests (including OPTIONS)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(helmet());

// 2. CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// Explicitly handle preflight for all routes
app.options("*", cors(corsOptions));

// 3. Body parsers (Crucial: These must be BEFORE routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Engine running perfectly... Vroom!" });
});

export default app;
