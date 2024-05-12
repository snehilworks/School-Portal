import { Request, Response } from "express";
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

export const getDashboard = async (req: Request, res: Response) => {
  try {
    // Get teacher's information
    // const teacher = await Teacher.findById(req.id);

    // Get classes taught by the teacher
    // const classes = await Class.find({ teacher: req.user.id });

    // Get students enrolled in the teacher's classes
    // const students = await Student.find({
    //   class: { $in: classes.map((cls) => cls._id) },
    // });

    // Other data retrieval and processing as needed...

    res.status(200).json({
      //   teacher,
      //   classes,
      //   students,
      // Other data to be included in the dashboard
    });
  } catch (error) {
    console.error("Error fetching teacher dashboard:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    //validate the user data for login
    const { email, password } = loginSchema.parse(req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const teacher_data = await Teacher.findOne({ email });
    if (!teacher_data) {
      return res.status(404).json({ message: "Teacher Data not Found!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      teacher_data.password
    );

    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid email or password" });
    }

    const teacherId = teacher_data._id;
    const token = jwt.sign(
      {
        id: teacherId,
      },
      JWT_SECRET
    );

    res.cookie("sps", token);

    res.status(302).json({
      message: "Logged in Successfully",
      teacher: teacher_data._id,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 15;

    const startIdx = (page - 1) * limit;

    const totalStudents = await Student.countDocuments(); //total number of students

    const students = await Student.find().skip(startIdx).limit(limit);

    const response = {
      students: students,
      totalPages: Math.ceil(totalStudents / limit), // Calculate total pages
      currentPage: page
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const getStudentDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error getting Student Detail: ", error);
    res.status(512).json({ message: "Internal Server Error " });
  }
};

export const getClasses = async (req: Request, res: Response) => {
  try {
    const classes = await Classes.find();

    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching all students:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const getClassDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const class_data = await Classes.findById(id);

    if (!class_data) {
      return res.status(404).json({ message: "Class not found!" });
    }

    res.status(200).json(class_data);
  } catch (error) {
    console.error("Error getting Class Detail: ", error);
    res.status(512).json({ message: "Internal Server Error " });
  }
};

export const getTeacherProfile = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.sps;

    if (!token) {
      return res.status(403).json({ message: "UnAuthorized!" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const teacher = await Teacher.findById(decoded.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(201).json({
      name: teacher.name,
      email: teacher.email,
      subjects: teacher.subjects,
      classTeacher: teacher.classTeacher,
      classes: teacher.classes,
    });
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    res.status(512).json({ message: "Internal Server Error" });
  }
};
