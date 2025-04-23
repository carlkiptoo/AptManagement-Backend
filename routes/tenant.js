import express from "express";
import bcrypt from "bcryptjs";
import Tenant from "../models/Tenant.js";
import { generatePassword } from "../utils/generatePassword.js";
import { sendTenantCredentials } from "../utils/emailService.js";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {name, email, phone, unitNumber} = req.body;

        if (!name || !email || !phone || !unitNumber) {
            return res.status(400).json({message: 'Name, email, phone and unit number required'});
        }

        const existingTenant = await Tenant.findOne({email});

        if (existingTenant) {
            return res.status(409).json({message: 'Tenant already exists'});
        }

        const plainPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const newTenant = await Tenant.create({
            name,
            email,
            phone,
            unitNumber,
            password: hashedPassword,
        });

        await newTenant.save();

        await sendTenantCredentials(email, plainPassword, name);

        return res.status(201).json({message: 'Tenant created successfully. Credentials successfuly sent'});
    } catch (error) {
        console.error('Error creating tenant:', error);
        return res.status(500).json({message: 'Error creating tenant'});
    }
})

export default router;