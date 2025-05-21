import express from "express";
import multer from "multer";
import path from "path";
import MaintenanceRequest from "../models/MaintenanceRequest.js";
import verifyToken from "../middleware/maintenanceAuth.js";
import { getRequestsByTenant } from "../controllers/maintenanceController.js";

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

router.post('/maintenance-requests', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const {description, priority, preferredDate} = req.body;
        const tenantId = req.user.userId;
        console.log('req.user:', req.user);


        if (!tenantId || !description || !priority || !preferredDate) {
            return res.status(400).json({message: 'Tenant ID, description, priority, preferred date required'});
        }

        const newRequest = await MaintenanceRequest.create({
            tenantId,
            description,
            priority,
            preferredDate: preferredDate,
        });

        await newRequest.save();
        return res.status(201).json({message: 'Maintenance request created successfully', request: newRequest});
    } catch (error) {
        console.error('Error creating maintenance request:', error);
        return res.status(500).json({message: 'Error creating maintenance request'});
    }

})

router.get('/maintenance-requests', verifyToken, getRequestsByTenant);

export default router;