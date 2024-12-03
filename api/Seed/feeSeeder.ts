import mongoose from "mongoose";
import dotenv from "dotenv";
import Fees from "../models/feeModel"; // Importing the Fees model
import ClassModel from "../models/classModel"; // Importing the Class model

dotenv.config();

const classFeesData = [
  { class: "Nursery-Eng", amount: 30000, description: "Nursery English" },
  { class: "Nursery Hindi", amount: 29000, description: "Nursery Hindi" },
  { class: "LKG Eng", amount: 32000, description: "LKG Eng" },
  { class: "LKG Hindi", amount: 31000, description: "LKG Hindi" },
  { class: "UKG Eng", amount: 33000, description: "UKG Eng" },
  { class: "UKG Hindi", amount: 32000, description: "UKG Hindi" },
  { class: "1st-Eng", amount: 35000, description: "1st English" },
  { class: "1st-Hindi", amount: 34000, description: "1st Hindi" },
  { class: "2nd-Eng", amount: 36000, description: "2nd English" },
  { class: "2nd-Hindi", amount: 35000, description: "2nd Hindi" },
  { class: "3rd-Eng", amount: 37000, description: "3rd English" },
  { class: "3rd-Hindi", amount: 36000, description: "3rd Hindi" },
  { class: "4th-Eng", amount: 38000, description: "4th English" },
  { class: "4th-Hindi", amount: 37000, description: "4th-Hindi" },
  { class: "5th-Eng", amount: 39000, description: "5th English" },
  { class: "5th-Hindi", amount: 38000, description: "5th-Hindi" },
  { class: "6th-Eng", amount: 40000, description: "6th English" },
  { class: "6th-Hindi", amount: 39000, description: "6th-Hindi" },
  { class: "7th-Eng", amount: 42000, description: "7th English" },
  { class: "7th-Hindi", amount: 41000, description: "7th Hindi" },
  { class: "8th-English", amount: 43000, description: "8th English" },
  { class: "8th-Hindi", amount: 42000, description: "8th Hindi" },
  { class: "9th", amount: 45000, description: "9th" },
  { class: "10th", amount: 46000, description: "10th" },
  { class: "11-Science", amount: 50000, description: "11-Science" },
  { class: "11-Arts", amount: 48000, description: "11-Arts" },
  { class: "12-Science", amount: 52000, description: "12-Science" },
  { class: "12-Arts", amount: 50000, description: "12-Arts" },
];

async function seedFees() {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`, {
      dbName: "Shivam-Public",
    });

    console.log("Connected to MongoDB");

    // Clear existing data
    await Fees.deleteMany({});
    console.log("Existing fees data cleared");

    const feeRecords = [];

    for (const feeData of classFeesData) {
      const classRecord = await ClassModel.findOne({
        className: feeData.class,
      }); // Adjust this query based on your Class model field names
      if (classRecord) {
        feeRecords.push({
          class: classRecord._id, // Reference class ID
          description: feeData.description,
          amount: feeData.amount,
        });
      } else {
        console.warn(`Class "${feeData.class}" not found in the database.`);
      }
    }

    if (feeRecords.length > 0) {
      await Fees.insertMany(feeRecords);
      console.log("Fees data seeded successfully");
    } else {
      console.log("No fee data to insert");
    }

    mongoose.disconnect();
  } catch (error) {
    console.error("Error while seeding fees data:", error);
    mongoose.disconnect();
  }
}

seedFees();
