import app from "./app.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to the database, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Dealership API is live and listening on port ${PORT}`);
  });
});
