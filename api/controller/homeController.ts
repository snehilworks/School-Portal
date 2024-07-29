import { Request, Response } from "express";
import ContactModel from "../models/contactModel";
import Classes from "../models/classModel";
import Admission from "../models/admission";

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

export const getClasses = async (req: Request, res: Response) => {
  try {
    const classes = await Classes.find();

    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching all students:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};

export const admissionForm = async (req: Request, res: Response) => {
  try {
    const newAdmission = new Admission(req.body);

    await newAdmission.save();

    res.status(201).json({ message: "Admission form submitted successfully" });
  } catch (error) {
    console.error("Error posting admission form data:", error);
    res.status(512).json({ message: "Internal server error" });
  }
};
