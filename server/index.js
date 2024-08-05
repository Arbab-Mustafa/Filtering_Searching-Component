import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import {
  EventRouter,
  VenueRouter,
  GuestListRouter,
  EmailListRouter,
} from "./routes/index.js"; // Ensure this imports all routers correctly

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(helmet());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define base paths for API routes
app.use("/api/events", EventRouter);
app.use("/api/venues", VenueRouter);
app.use("/api/guests", GuestListRouter);
app.use("/api/emails", EmailListRouter);

// Default response for root

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
