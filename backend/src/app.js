import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
configDotenv();

const app = express();

// Render sits behind a reverse proxy. Without this, express-rate-limit
// (and req.ip / X-Forwarded-For based logic) will misbehave or throw
// an ERR_ERL_UNEXPECTED_X_FORWARDED_FOR validation error.
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
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
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"].filter(
  Boolean,
);

console.log("Allowed origins:", allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (curl, Postman, server-to-server, health checks)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// 3. Body parsers (Crucial: These must be BEFORE routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "API is live" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Engine running perfectly... Vroom!" });
});

export default app;
