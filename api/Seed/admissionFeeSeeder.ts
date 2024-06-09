import mongoose from "mongoose";
import dotenv from 'dotenv';
import AdmissionFees from "../models/admissionFeeModel";
import ClassModel from "../models/classModel";

dotenv.config();

const classAdmissionFees = [
  { className: "Nursery-Eng", admissionAmount: 1500 },
  { className: "Nursery Hindi", admissionAmount: 1400 },
  { className: "LKG Eng", admissionAmount: 1600 },
  { className: "LKG Hindi", admissionAmount: 1500 },
  { className: "UKG Eng", admissionAmount: 1700 },
  { className: "UKG Hindi", admissionAmount: 1600 },
  { className: "1st-Eng", admissionAmount: 1800 },
  { className: "1st-Hindi", admissionAmount: 1700 },
  { className: "2nd-Eng", admissionAmount: 1900 },
  { className: "2nd-Hindi", admissionAmount: 1800 },
  { className: "3rd-Eng", admissionAmount: 2000 },
  { className: "3rd-Hindi", admissionAmount: 1900 },
  { className: "4th-Eng", admissionAmount: 2100 },
  { className: "4th-Hindi", admissionAmount: 2000 },
  { className: "5th-Eng", admissionAmount: 2200 },
  { className: "5th-Hindi", admissionAmount: 2100 },
  { className: "6th-Eng", admissionAmount: 2300 },
  { className: "6th-Hindi", admissionAmount: 2200 },
  { className: "7th-Eng", admissionAmount: 2400 },
  { className: "7th-Hindi", admissionAmount: 2300 },
  { className: "8th-English", admissionAmount: 2500 },
  { className: "8th-Hindi", admissionAmount: 2400 },
  { className: "9th", admissionAmount: 2600 },
  { className: "10th", admissionAmount: 2700 },
  { className: "11-Science", admissionAmount: 2800 },
  { className: "11-Arts", admissionAmount: 2700 },
  { className: "12-Science", admissionAmount: 2900 },
  { className: "12-Arts", admissionAmount: 2800 },
];

async function seedAdmissionFees() {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`, {
      dbName: "Shivam-Public"
    });

    console.log("MongoDB connected successfully");

    // Remove existing data
    await AdmissionFees.deleteMany({});
    console.log("Existing admission fees data removed");

    const admissionFeesData = [];

    for (const item of classAdmissionFees) {
        const classItem = await ClassModel.findOne({ className: item.className });
        if (classItem) {
          admissionFeesData.push({
            classId: classItem._id,
            class: item.className,
            amount: item.admissionAmount,
          });
        }
      }
    console.log('Adding Admissions Data to the Database');

    if (admissionFeesData.length > 0) {
      await AdmissionFees.insertMany(admissionFeesData);
      console.log("Admission fees seeded successfully!");
    } else {
      console.log("No admission fees data to insert.");
    }

    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding admission fees:", error);
    mongoose.disconnect();
  }
}

seedAdmissionFees();
