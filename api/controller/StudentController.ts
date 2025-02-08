import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Fee from "../models/feeModel";
import Student, { IStudent } from "../models/studentModel";
import HostelForm, { IHostelForm } from "../models/HostelFormModel";
import { loginSchema } from "../validations/loginValidation";
import { CompleteStudentProfileRequestBody } from "../types/completeProfile";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface JwtPayload {
  id: string;
}

interface AuthenticatedRequest extends Request {
  student?: IStudent;
}

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ email, password: hashedPassword });
    await newStudent.save();

    const token = jwt.sign({ id: newStudent._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("sps", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering student:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const student = await Student.findOne({ email });
    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: student._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("sps", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFeeStructure = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const fee = await Fee.find().populate("class", "className").exec();
    return res.status(200).json(fee);
  } catch (error) {
    console.error("Error fetching fee structure:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const token = req.cookies.sps;
    if (!token) return res.status(403).json({ message: "Unauthorized!" });

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const student = await Student.findById(decoded.id);
    if (!student) return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json({ email: student.email, admissionStatus: student.admission });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const completeStudentProfile = async (
  req: Request<{}, {}, CompleteStudentProfileRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(403).json({ message: "Unauthorized!" });

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const student = await Student.findById(decoded.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    Object.assign(student, req.body);
    const savedStudent = await student.save();

    return res
      .status(200)
      .json({ message: "Profile updated successfully", student: savedStudent });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFeeForClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const fee = await Fee.findOne({ class: id });
    if (!fee)
      return res.status(404).json({ message: `Fee not found for class ${id}` });

    return res.status(200).json({
      description: fee.description,
      class: fee.class,
      amount: fee.amount,
    });
  } catch (error) {
    console.error("Error fetching fee for class:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const HostelFormStore = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { studentName, class: studentClass, joiningDate } = req.body as IHostelForm;

    const existingForm = await HostelForm.findOne({
      studentName,
      class: studentClass,
      joiningDate,
    });

    if (existingForm)
      return res.status(409).json({ message: "Hostel form already exists" });

    const newHostelForm = new HostelForm(req.body);
    await newHostelForm.save();

    return res
      .status(201)
      .json({ message: "Hostel form submitted successfully" });
  } catch (error) {
    console.error("Error storing hostel form:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

