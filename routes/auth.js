import express from "express";
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, role, unitNumber } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: "Name, email and role required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }
    const rawPassword = role === "tenant" ? nanoid(9) : req.body.password;
    const hashed = await hashPassword(rawPassword);

    const user = await User.create({
      name,
      email,
      role,
      unitNumber: role === "tenant" ? unitNumber : null,
      password: hashed,
    });

    //Send email with credentials to tenant

    res
      .status(201)
      .json({
        message: "User registered successfully",
        ...user(role === "tenant" ? { generatedPassword: rawPassword } : {}),
      });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
});

export default router;
