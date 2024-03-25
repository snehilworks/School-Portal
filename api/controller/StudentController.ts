import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Student from "../models/studentModel";
import { loginSchema } from "../validations/loginValidation";

import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const getDashboard = async (req: Request, res: Response) => {};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Validate if required fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if the email is already registered
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(403).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      email,
      password: hashedPassword,
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student registered successfully.",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    //validate the request
    const { email, password } = loginSchema.parse(req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const studentId = student._id;
    const token = jwt.sign(
      {
        id: studentId,
      },
      JWT_SECRET
    );

    res.cookie("sps", token);

    res
      .status(201)
      .json({ message: "Login successful.", student: student._id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const getHostel = async (req: Request, res: Response) => {};

export const getSchedule = async (req: Request, res: Response) => {};

export const getActivities = async (req: Request, res: Response) => {};

export const getExams = async (req: Request, res: Response) => {};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.sps;

    if (!token) {
      return res.status(403).json({ message: "UnAuthorized!" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const student = await Student.findById(decoded.id);

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      email: student.email,
      admissionStatus: student.admission,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(512).json({ message: "Internal Server Error" });
  }
};
