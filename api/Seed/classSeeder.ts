import mongoose from "mongoose";
import ClassModel, { Class } from "../models/classModel";

// Define an array of class data
const classData: Partial<Class>[] = [
  { className: "Nursery English", classTeacher: null, seatsAvailable: null },
  { className: "Nursery Hindi", classTeacher: null, seatsAvailable: null },
  { className: "LKG English", classTeacher: null, seatsAvailable: null },
  { className: "LKG Hindi", classTeacher: null, seatsAvailable: null },
  { className: "UKG English", classTeacher: null, seatsAvailable: null },
  { className: "UKG Hindi", classTeacher: null, seatsAvailable: null },
  { className: "I English", classTeacher: null, seatsAvailable: null },
  { className: "I Hindi", classTeacher: null, seatsAvailable: null },
  { className: "II English", classTeacher: null, seatsAvailable: null },
  { className: "II Hindi", classTeacher: null, seatsAvailable: null },
  { className: "III English", classTeacher: null, seatsAvailable: null },
  { className: "III Hindi", classTeacher: null, seatsAvailable: null },
  { className: "IV English", classTeacher: null, seatsAvailable: null },
  { className: "IV Hindi", classTeacher: null, seatsAvailable: null },
  { className: "V English", classTeacher: null, seatsAvailable: null },
  { className: "V Hindi", classTeacher: null, seatsAvailable: null },
  { className: "VI English", classTeacher: null, seatsAvailable: null },
  { className: "VI Hindi", classTeacher: null, seatsAvailable: null },
  { className: "VII English", classTeacher: null, seatsAvailable: null },
  { className: "VII Hindi", classTeacher: null, seatsAvailable: null },
  { className: "VIII English", classTeacher: null, seatsAvailable: null },
  { className: "VIII Hindi", classTeacher: null, seatsAvailable: null },
  { className: "IX", classTeacher: null, seatsAvailable: null },
  { className: "X", classTeacher: null, seatsAvailable: null },
  { className: "XI Science", classTeacher: null, seatsAvailable: null },
  { className: "XI Arts", classTeacher: null, seatsAvailable: null },
  { className: "XII Science", classTeacher: null, seatsAvailable: null },
  { className: "XII Arts", classTeacher: null, seatsAvailable: null },
];

// Function to seed classes data
async function seedClassesData() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/Shivam-Public", {
      dbName: "Shivam-Public"
    });

    console.log("MongoDB connected successfully");

    // Clear existing data from the classes collection
    await ClassModel.deleteMany({});

    // Insert seed data into the classes collection
    await ClassModel.insertMany(classData);

    console.log("Class seed data inserted successfully.");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("MongoDB disconnected successfully");
  } catch (error) {
    console.error("Error seeding classes data:", error);
  }
}


// Call the seed function
seedClassesData();
