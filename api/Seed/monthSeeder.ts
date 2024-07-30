import dotenv from 'dotenv';
import mongoose from "mongoose";
import Month from "../models/monthModel";

dotenv.config();

async function seedMonthData() {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`, {
      dbName: "Shivam-Public"
    });

    console.log("MongoDB connected successfully");

    await Month.deleteMany({});
    console.log("Existing month data removed");

    const months = [
      { monthName: "January", monthNumber: 1 },
      { monthName: "February", monthNumber: 2 },
      { monthName: "March", monthNumber: 3 },
      { monthName: "April", monthNumber: 4 },
      { monthName: "May", monthNumber: 5 },
      { monthName: "June", monthNumber: 6 },
      { monthName: "July", monthNumber: 7 },
      { monthName: "August", monthNumber: 8 },
      { monthName: "September", monthNumber: 9 },
      { monthName: "October", monthNumber: 10 },
      { monthName: "November", monthNumber: 11 },
      { monthName: "December", monthNumber: 12 },
    ];

    await Month.insertMany(months);
    console.log("Months seeded successfully");
  } catch (error) {
    console.error("Error seeding month data:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedMonthData();
