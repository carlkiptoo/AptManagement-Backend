import express from "express";
import multer from "multer";
import path from "path";
import MaintenanceRequest from "../models/MaintenanceRequest.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage});

router.post('/maintenance-requests', upload.single('image'), async (req, res) => {
    try {
        const {tenantId, description, priority, prefferedDate} = req.body;

        if (!tenantId || !description || !priority || !prefferedDate) {
            return res.status(400).json({message: 'Tenant ID, description, priority, preferred date, issue and image URL required'});
        }

        const newRequest = await MaintenanceRequest.create({
            tenantId,
            description,
            priority,
            preferredDate: prefferedDate,
        });

        await newRequest.save();
        return res.status(201).json({message: 'Maintenance request created successfully', request: newRequest});
    } catch (error) {
        console.error('Error creating maintenance request:', error);
        return res.status(500).json({message: 'Error creating maintenance request'});
    }

})

export default router;