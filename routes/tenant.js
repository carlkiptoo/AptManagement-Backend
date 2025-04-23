import express from "express";
import bcrypt from "bcryptjs";
import Tenant from "../models/Tenant.js";
import { generatePassword } from "../utils/generatePassword.js";
import { sendTenantCredentials } from "../utils/emailService.js";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {name, idNumber, email, phone, houseType, unitNumber, price, passportImage} = req.body;
        console.log("Incoming tenant registration:", req.body);


        if (!name || !email || !phone || !unitNumber || !houseType || !price || !passportImage) {
            return res.status(400).json({message: 'Name, email, phone, house type, price and passport image required'});
        }

        const existingTenant = await Tenant.findOne({email});

        if (existingTenant) {
            return res.status(409).json({message: 'Tenant already exists'});
        }

        const plainPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const newTenant = await Tenant.create({
            name,
            idNumber,
            email,
            phone,
            unitNumber,
            houseType,
            price,
            passportImage,
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

router.get('/tenants', async (req, res) => {
    try {
        const tenants  = await Tenant.find().sort({createdAt: -1});
        res.status(200).json({message: 'Tenants retrieved successfully', tenants: tenants});
    } catch (error) {
        console.error('Error retrieving tenants:', error);
        res.status(500).json({message: 'Error retrieving tenants'});
    }
})

export default router;