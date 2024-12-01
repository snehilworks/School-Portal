import { Request, Response, NextFunction } from "express";
import ContactModel from "../models/contactModel";
import Classes from "../models/classModel";
import Admission from "../models/admission";
import AdmissionFee from "../models/admissionFeeModel";

export const contactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Check for all Required Fields
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }

    const newMessage = new ContactModel({ name, email, message });

    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error Getting admissions Data: " + error);
    res.status(512).json({ message: "Internal Server Error" });
  }
};

export const getClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classes = await Classes.find();
    res.status(200).json(classes);
  } catch (error: any) {
    console.error("Error fetching all classes:", error);
    res.status(512).json({ message: "Internal server error" });
    error.status = 512;
    next(error);
  }
};

export const admissionForm = async (req: Request, res: Response) => {
  try {
    const { studentName, fatherName, email } = req.body;

    const existingAdmission = await Admission.findOne({
      studentName,
      fatherName,
      email,
    });

    if (existingAdmission) {
      return res
        .status(422)
        .json({ message: "Admission form with these details already exists" });
    }

    const newAdmission = new Admission(req.body);
    await newAdmission.save();

    res.status(201).json({ message: "Admission form submitted successfully" });
  } catch (error) {
    console.error("Error posting admission form data:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const admissionFees = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;

    const admissionFee = await AdmissionFee.findOne({
      classId: classId,
    }).select("class amount");
    if (!admissionFee) {
      return res.status(404).json({ message: "Admission fee not found" });
    }

    return res.status(201).json(admissionFee);
  } catch (error) {
    console.error("Error getting all the admission fees:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};
