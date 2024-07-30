import dotenv from 'dotenv';
import mongoose from "mongoose";
import Year from "../models/yearModel";

dotenv.config();

async function seedYearData() {
  try {
    
    await mongoose.connect(`${process.env.DATABASE_URL}`, {
      dbName: "Shivam-Public"
    });

    console.log("MongoDB connected successfully");

    await Year.deleteMany({});
    console.log("Existing year data removed");

    const years = [];
    console.log('Seeding year data from 2020 to 2050');
    for (let year = 2020; year <= 2050; year++) {
      console.log('year seeded :' + year);
      years.push({ year });
    }

    await Year.insertMany(years);
    console.log("Years seeded successfully");
  } catch (error) {
    console.error("Error seeding year data:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedYearData();
