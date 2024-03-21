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
    //function to post Contanct Message for us
    const { name, email, message } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }

    // Create a new contact message document
    const newMessage = new ContactModel({ name, email, message });

    // Save the message to the database
    await newMessage.save();

    // Respond with success message
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error Getting admissions Data: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
