import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: String,
    unitNumber: String,
    assignedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: false},
    createdAt: {type: Date, default: Date.now},
});

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;