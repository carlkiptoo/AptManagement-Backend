import express from "express";
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { nanoid } from "nanoid";
import { generateToken } from "../utils/utils.js";

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

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        unitNumber: user.unitNumber,
        ...(role === "tenant" ? { generatedPassword: rawPassword } : {}),
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Entered password', password)

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);

    console.log('Stored hashed password', user.password)
    console.log('Ismatch', password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(id: user._id, role: user.role);

    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        unitNumber: user.unitNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});

export default router;
