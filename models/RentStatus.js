import mongoose from "mongoose";

const rentStatusSchema = new mongoose.Schema({
    tenantId: {type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true},
    month: String,
    rentAmount: Number,
    waterBill: Number,
    status: {type: String, enum: ['Paid', 'Unpaid', 'Partial'], default: "Unpaid"},
    dueDate: Date,
    paidDate: Date,
});

const RentStatus = mongoose.model("RentStatus", rentStatusSchema);

export default RentStatus;