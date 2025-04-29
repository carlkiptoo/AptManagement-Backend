import express from "express";
import Tenant from "../models/Tenant.js";
import RentStatus from "../models/RentStatus.js";


const router = express.Router();

router.post('/rent-create', async (req, res) => {
    try {
        const {tenantId, month, rentAmount, waterBill, dueDate, status } = req.body;

        if (!tenantId || !month || !rentAmount || !waterBill || !dueDate || !status) {
            return res.status(400).json({message: 'Tenant ID, month, rent amount, water bill, due date and status required'});
        }

        const rentStatus = await RentStatus.create({
            tenantId,
            month,
            rentAmount,
            waterBill,
            dueDate,
            status: status || 'Unpaid'
        });

        await rentStatus.save();
        return res.status(201).json({message: 'Rent status created successfully', rentStatus});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error creating rent status'});
    }
})

router.get("/rent-status", async (req, res) => {
    try{
        const tenantId = req.query.tenantId;

        if (!tenantId) {
            return res.status(400).json({message: 'Tenant ID required'});
        }

        const tenant = await Tenant.findById(tenantId).select('name idNumber unitNumber houseType price');

        if (!tenant) {
            return res.status(404).json({message: 'Tenant not found'});
        }

        const rentStatus = await RentStatus.find({tenantId}).populate('tenantId', 'name idNumber unitNumber houseType price').sort({dueDate: -1});

        if (rentStatus.length === 0) {
            return res.status(404).json({message: 'No rent status found Kip'});
        }

        res.json({
            tenant: {
                name: tenant.name,
                unitNumber: tenant.unitNumber,
                price: tenant.price
            },
            rentStatus: rentStatus
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error retrieving rent status'});
    }
})

export default router;