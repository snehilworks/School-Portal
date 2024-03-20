import { Request, Response } from "express";

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
  } catch (error) {
    console.error("Error Getting admissions Data: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
