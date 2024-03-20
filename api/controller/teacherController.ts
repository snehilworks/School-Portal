import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Teacher from "../models/teacherModel";

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
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
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

    res.status(302).json({
      message: "Logged in Successfully",
      data: {
        token: "eyJhbGciOiJIUz",
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
