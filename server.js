import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from './config/db.js';

import authRoutes from "./routes/auth.js";
// import tenantRoutes from "./routes/tenantRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
// app.use("/api/tenants", tenantRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0,0,0,0', () => {
    console.log(`Server is running on port ${PORT}`);
});


