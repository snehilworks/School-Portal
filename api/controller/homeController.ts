import { Request, Response } from "express";
import ContactModel from "../models/contactModel";

export const getAdmissions = async (req: Request, res: Response) => {
  try {
    //function to get admissions data from database to display on home
  } catch (error) {
    console.error("Error Getting admissions Data: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getActivities = async (req: Request, res: Response) => {};
