import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Teacher from "../models/teacherModel";
import Student from "../models/studentModel";
import Classes from "../models/classModel";
import { loginSchema } from "../validations/loginValidation";

import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface JwtPayload {
  id: string;
}

// Utility function to handle errors more uniformly
class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.sps || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded; // Storing user data in the request object
    next();
  } catch (error: any) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Helper function to check if ObjectId is valid
const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

export const getMeApi = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    const teacherId = req.user.id;
    return res.status(200).json({ teacherId });
  } catch (error: any) {
    console.error("Error getting 'me' API:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw new AppError("Invalid teacher ID", 400);
    }

    const teacherDetail = await Teacher.findById(id);

    if (!teacherDetail) {
      throw new AppError("Teacher not found", 404);
    }

    return res.status(200).json({ data: teacherDetail });
  } catch (error: any) {
    console.error("Error getting teacher:", error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const teacherData = await Teacher.findOne({ email });
    if (!teacherData) {
      throw new AppError("Teacher not found", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      teacherData.password
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 422);
    }

    const teacherId = teacherData._id;
    const token = jwt.sign({ id: teacherId }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("sps", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ token });
  } catch (error: any) {
    console.error("Error during login:", error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
};

export const getStudents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 15;
    const startIdx = (page - 1) * limit;

    const totalStudents = await Student.countDocuments();
    const students = await Student.find().skip(startIdx).limit(limit);

    return res.status(200).json({
      students,
      totalPages: Math.ceil(totalStudents / limit),
      currentPage: page,
    });
  } catch (error: any) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw new AppError("Invalid student ID", 400);
    }

    const student = await Student.findById(id);

    if (!student) {
      throw new AppError("Student not found", 404);
    }

    return res.status(200).json(student);
  } catch (error: any) {
    console.error("Error fetching student details:", error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const getClasses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const classes = await Classes.find();
    return res.status(200).json(classes);
  } catch (error: any) {
    console.error("Error fetching classes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getClassDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw new AppError("Invalid class ID", 400);
    }

    const classData = await Classes.findById(id);

    if (!classData) {
      throw new AppError("Class not found", 404);
    }

    return res.status(200).json(classData);
  } catch (error: any) {
    console.error("Error fetching class details:", error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const getTeacherProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const token = req.cookies.sps;

    if (!token) {
      throw new AppError("Unauthorized!", 403);
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!isValidObjectId(decoded.id)) {
      throw new AppError("Invalid user ID format", 400);
    }

    const teacher = await Teacher.findById(decoded.id);

    if (!teacher) {
      throw new AppError("Teacher not found", 404);
    }

    return res.status(200).json({
      name: teacher.name,
      email: teacher.email,
      subjects: teacher.subjects,
      classTeacher: teacher.classTeacher,
      classes: teacher.classes,
    });
  } catch (error: any) {
    console.error("Error fetching teacher profile:", error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};
