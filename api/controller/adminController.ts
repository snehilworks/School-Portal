import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Teacher from "../models/teacherModel";
import Student from "../models/studentModel";
import Admission, {
  Admission as AdmissionType,
} from "../models/admissionModel";

// adding a new teacher
export const addTeacher = async (req: Request, res: Response) => {
  try {
    const { password, ...teacherData } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newTeacher = new Teacher({
      ...teacherData,
      password: hashedPassword,
    });

    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error("Error adding teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all teachers
export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await Teacher.find();
    res.status(201).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all students
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.status(201).json(students);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSpecificTeacher = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const teacherDetail = await Teacher.findById(id);
    if (!teacherDetail) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({
      data: teacherDetail,
    });
  } catch (error) {
    console.error("Error getting teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSpecificStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const StudentDetail = await Student.findById(id);
    if (!StudentDetail) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({
      data: StudentDetail,
    });
  } catch (error) {
    console.error("Error getting Student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Updating teacher details
export const updateTeacher = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({
      message: "Updated Teacher Detail for id: " + id,
      data: updatedTeacher,
    });
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for deleting a teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({
      message: "Teacher with " + id + " Id deleted!",
      data: deletedTeacher,
    });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAdmissionStatus = async (req: Request, res: Response) => {
  const { id } = req.params; //student id
  const { admissionStatus } = req.body; //new admission status
  try {
    if (typeof admissionStatus !== "boolean") {
      return res
        .status(400)
        .json({ message: "Invalid admission status. Must be true or false." });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { admission: admissionStatus },
      { new: true } // Returns the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({
      message: "Admission status updated successfully.",
      student: updatedStudent,
    });
  } catch (error) {
    console.log("Error Updating admission status: ", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const getAdmissionList = async (req: Request, res: Response) => {
  try {
    const admissions: AdmissionType[] = await Admission.find();

    if (!admissions || admissions.length === 0) {
      return res.status(404).json({ message: "No admissions found" });
    }

    res.status(201).json(admissions);
  } catch (error) {
    console.log("Error Getting admission list: ", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const addAdmissionSeats = async (req: Request, res: Response) => {};

export const getFees = async (req: Request, res: Response) => {};

export const updateAdmissionSeats = async (req: Request, res: Response) => {};

export const setClassTeacher = async (req: Request, res: Response) => {
  
};