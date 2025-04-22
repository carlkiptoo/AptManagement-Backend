import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema({
    tenantId: {type: mongoose.Schema.Types.ObjectId, ref: "Tenant"},
    unitNumber: String,
    issue: {type: String, required: true},
    image: String,
    status: {type: String, enum: ['Pending', 'Resolved'], default: "Pending"},
    adminNotes: String,
    priority: {type: String, enum: ['Low', 'Medium', 'High'], default: "Low"},
    createdAt: {type: Date, default: Date.now},
    dateResolved: Date,
});

const MaintenanceRequest = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);

export default MaintenanceRequest;