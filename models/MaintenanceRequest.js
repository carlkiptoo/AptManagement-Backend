import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  description: { type: String, required: true, trim: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  preferredDate: { type: Date, required: true },
  issue: { type: String},
  imageUrl: String,
  status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  dateResolved: Date,
});

const MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);

export default MaintenanceRequest;
