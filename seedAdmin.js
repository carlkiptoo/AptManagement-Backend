import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";

dotenv.config();

await connectDB();

const seedAdmin = async () => {
    const existingAdmin = await User.findOne({email: process.env.ADMIN_EMAIL});

    if (existingAdmin) {
        console.log("Admin already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
        name: 'Admin',  
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
    });

     console.log("Admin created");
     process.exit(0);
};

seedAdmin();