import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Student from "../models/studentModel";

export const getDashboard = async (req: Request, res: Response) => {};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

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
    const { email, password } = req.body;

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

    res.status(201).json({ message: "Login successful.", student: student });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const getHostel = async (req: Request, res: Response) => {};

export const getSchedule = async (req: Request, res: Response) => {};

export const getActivities = async (req: Request, res: Response) => {};

export const getExams = async (req: Request, res: Response) => {};

export const getProfile = async (req: Request, res: Response) => {};
