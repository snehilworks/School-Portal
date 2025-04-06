import dotenv from "dotenv";
import mongoose from "mongoose";
import ClassModel, { Class } from "../models/classModel";

dotenv.config();

const classData: Partial<Class>[] = [
  { className: "Nursery-Eng", classTeacher: null, seatsAvailable: null },
  { className: "Nursery Hindi", classTeacher: null, seatsAvailable: null },
  { className: "LKG Eng", classTeacher: null, seatsAvailable: null },
  { className: "LKG Hindi", classTeacher: null, seatsAvailable: null },
  { className: "UKG Eng", classTeacher: null, seatsAvailable: null },
  { className: "UKG Hindi", classTeacher: null, seatsAvailable: null },
  { className: "1st-Eng", classTeacher: null, seatsAvailable: null },
  { className: "1st-Hindi", classTeacher: null, seatsAvailable: null },
  { className: "2nd-Eng", classTeacher: null, seatsAvailable: null },
  { className: "2nd-Hindi", classTeacher: null, seatsAvailable: null },
  { className: "3rd-Eng", classTeacher: null, seatsAvailable: null },
  { className: "3rd-Hindi", classTeacher: null, seatsAvailable: null },
  { className: "4th-Eng", classTeacher: null, seatsAvailable: null },
  { className: "4th-Hindi", classTeacher: null, seatsAvailable: null },
  { className: "5th-Eng", classTeacher: null, seatsAvailable: null },
  { className: "5th-Hindi", classTeacher: null, seatsAvailable: null },
  { className: "6th-Eng", classTeacher: null, seatsAvailable: null },
  { className: "6th-Hindi", classTeacher: null, seatsAvailable: null },
  { className: "7th-Eng", classTeacher: null, seatsAvailable: null },
  { className: "7th-Hindi", classTeacher: null, seatsAvailable: null },
  { className: "8th-English", classTeacher: null, seatsAvailable: null },
  { className: "8th-Hindi", classTeacher: null, seatsAvailable: null },
  { className: "9th-English", classTeacher: null, seatsAvailable: null },
  { className: "9th-Hindi", classTeacher: null, seatsAvailable: null },
  { className: "10th-English", classTeacher: null, seatsAvailable: null },
  { className: "10th-Hindi", classTeacher: null, seatsAvailable: null },
  { className: "11-Science", classTeacher: null, seatsAvailable: null },
  { className: "11-Arts", classTeacher: null, seatsAvailable: null },
  { className: "11-Commerce", classTeacher: null, seatsAvailable: null },
  { className: "12-Science", classTeacher: null, seatsAvailable: null },
  { className: "12-Arts", classTeacher: null, seatsAvailable: null },
  { className: "12-Commerce", classTeacher: null, seatsAvailable: null },
];

async function seedClassesData() {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`, {
      dbName: "Shivam-Public",
    });

    console.log("MongoDB connected successfully");

    await ClassModel.deleteMany({});

    for (const classEntry of classData) {
      await ClassModel.create(classEntry);
    }

    console.log("Class seed data inserted successfully.");

    await mongoose.disconnect();
    console.log("MongoDB disconnected successfully");
  } catch (error) {
    console.error("Error seeding classes data:", error);
  }
}

seedClassesData();
