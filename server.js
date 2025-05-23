import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from './config/db.js';

import authRoutes from "./routes/auth.js";
import tenantRoutes from "./routes/tenant.js";
import rentRoutes from "./routes/rent.js";
import maintenanceRoutes from "./routes/maintenance.js";




dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/maintenance", maintenanceRoutes);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});


