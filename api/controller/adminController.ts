import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Teacher from "../models/teacherModel";
import Student from "../models/studentModel";
import Fee from "../models/feeModel";
import Class from "../models/classModel";
import Admission from "../models/admission";
import contactModel from "../models/contactModel";
import classModel from "../models/classModel";
import { loginSchema } from "../validations/loginValidation";
import Admin from "../models/adminModel";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// adding a new teacher
export const addTeacher = async (req: Request, res: Response) => {
  try {
    const { password,  classId, ...teacherData } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newTeacher = new Teacher({
      ...teacherData,
      password: hashedPassword,
      class: classId || null,
    });

    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error("Error adding teacher:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

// get all teachers
export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await Teacher.find();
    res.status(201).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

//get all students
export const getAllStudents = async (req: Request, res: Response) => {
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

export const getAllAdmissionForms = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 15;

    const startIdx = (page - 1) * limit;

    const totalAdmissionForms = await Admission.countDocuments(); 

    const admissionForms = await Admission.find().skip(startIdx).limit(limit);

    // Fetch all classes to map IDs to names
    const classes = await classModel.find({ _id: { $in: admissionForms.map(form => form.class) } });

    // Create a map for class IDs to class names
    const classMap = new Map(classes.map(cls => [cls._id.toString(), cls.className]));

    // Map the admission forms to include class names
    const response = {
      data: admissionForms.map(form => ({
        ...form.toObject(),
        class: classMap.get(form.class.toString()) || 'Unknown Class'
      })),
      totalPages: Math.ceil(totalAdmissionForms / limit),
      currentPage: page
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error getting admission forms:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const admissionFormReviewed = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 

    const updatedAdmission = await Admission.findByIdAndUpdate(
      id,
      { review: true },
      { new: true } // Return the updated document
    );

    if (!updatedAdmission) {
      return res.status(404).json({ message: 'Admission form not found' });
    }

    return res.status(200).json(updatedAdmission);
  } catch (error) {
    console.error("Error setting review true for admission form:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const getSpecificTeacher = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const teacherDetail = await Teacher.findById(id, {
      name: 1,
      email: 1,
      subjects: 1,
      phone: 1,
      classes: 1,
      classTeacher: 1,
      class: 1,
    });
    if (!teacherDetail) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({
      data: teacherDetail,
    });
  } catch (error) {
    console.error("Error getting teacher:", error);
    res.status(512).json({ message: "Internal server error" });
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
    res.status(512).json({ message: "Internal server error" });
  }
};


// Updating teacher details
export const updateTeacher = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, classId, ...teacherData } = req.body;

  try {
    if (password) {
      const saltRounds = 10;
      teacherData.password = await bcrypt.hash(password, saltRounds);
    }

    teacherData.classId = classId || null;

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, teacherData, {
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
    res.status(512).json({ message: "Internal server error" });
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
    res.status(512).json({ message: "Internal server error" });
  }
};

export const ContactMessages = async (req: Request, res: Response) => {

  try {
    const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit as string) || 20; // Default to 20 items per page if not provided
  
    const skip = (page - 1) * limit;

    const messages = await contactModel.find().skip(skip).limit(limit);
    const totalMessages = await contactModel.countDocuments();

      res.json({
        messages,
          totalMessages,
          totalPages: Math.ceil(totalMessages / limit),
          currentPage: page,   
      });
    } catch (error) {
      console.error("Error getting Student:", error);
      res.status(512).json({ message: "Internal server error" });
    }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    if (!email || !password) {
      return res
        .status(422)
        .json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Teacher Data not Found!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(422).json({ message: "Invalid email or password" });
    }

    const adminId = admin._id;
    const token = jwt.sign(
      {
        id: adminId,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.cookie("sps", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(512).json({ message: "Something went wrong" });
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

// export const getAdmissionList = async (req: Request, res: Response) => {
//   try {
//     const admissions: AdmissionType[] = await Admission.find();

//     if (!admissions || admissions.length === 0) {
//       return res.status(404).json({ message: "No admissions found" });
//     }

//     res.status(201).json(admissions);
//   } catch (error) {
//     console.log("Error Getting admission list: ", error);
//     res.status(512).json({ message: "Internal server error" });
//   }
// };

//add in class Model
// export const addAdmissionSeats = async (req: Request, res: Response) => {

// };

export const setFees = async (req: Request, res: Response) => {
  try {
    const classId = req.body.class;
    const desc = req.body.description;
    const amount = req.body.amount;

    const existingClass = await Class.findOne({ _id: classId });
    if (!existingClass) {
      return res.status(422).json({ message: "Class not found" });
    }

    const existingFee = await Fee.findOne({ class: existingClass._id });
    if (existingFee) {
      return res.status(422).json({ message: "Fee already set for this class" });
    }

    const newFee = new Fee({
      class: existingClass._id, // Use the class ID as the foreign key
      description: desc,
      amount: amount
    });

    await newFee.save();

    res.status(201).json({ message: "Fee set successfully", fee: newFee });

  } catch (error) {
    console.error("Error setting fees:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};;

export const getFees = async (req: Request, res: Response) => {};

export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes = await Class.find();
    res.status(201).json(classes);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

//update in class model
export const updateAdmissionSeats = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { seatsAvailable } = req.body;

  try {
    // Find the class document by ID
    const foundClass = await Class.findById(id);

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    // Update the seats available
    foundClass.seatsAvailable = seatsAvailable;

    // Save the updated class document
    await foundClass.save();

    res.status(200).json({ message: "Seats available updated successfully" });
  } catch (error) {
    console.error("Error updating seats available:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};  

//update in class Model
export const setClassTeacher = async (req: Request, res: Response) => {
  const { id } = req.params; // Get the class ID from request parameters
  const { teacherId } = req.body;

  try {
    // Find the class document by ID
    const foundClass = await Class.findById(id);

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Set the class teacher to the provided teacher ID
    foundClass.classTeacher = teacherId;

    await foundClass.save();

    res.status(200).json({ message: "Class teacher updated successfully" });
  } catch (error) {
    console.error("Error setting class teacher:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};