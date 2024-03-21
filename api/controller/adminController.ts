import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Teacher from "../models/teacherModel";
import Student from "../models/studentModel";

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
