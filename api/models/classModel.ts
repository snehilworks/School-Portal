import mongoose, { Schema, Document } from "mongoose";

// Define interface for Class document
export interface Class extends Document {
  className: string;
}

// Define class schema
const classSchema: Schema = new Schema({
  className: { type: String, required: true, unique: true, index: true },
});

export default mongoose.model<Class>("Class", classSchema);

//Implement later

// Define an array of class names
// const classNames: string[] = [
//  "Nursery English",
//  "Nursery Hindi",
//  "LKG English",
//  "LKG Hindi",
//  "UKG English",
//  "UKG Hindi",
//   "I English",
//   "I Hindi",
//   "II English",
//   "II Hindi",
//  "III English",
//  "III Hindi",
//   "IV English",
//   "IV Hindi",
//   "V English",
//   "V Hindi",
//   "VI English",
//   "VI Hindi",
//   "VII English",
//   "VII Hindi",
//   "VIII English",
//   "VIII Hindi",
//   "IX",
//   "X",
//   "XI Science",
//   "XI Arts",
//   "XII Science",
//   "XII Arts",
// ];

// Function to insert class names into the database
// async function seedClasses() {
//   try {
//     // Remove any existing class documents
//     await ClassModel.deleteMany({});

//     // Insert each class name into the database
//     await ClassModel.insertMany(classNames.map((className) => ({ className })));

//     console.log("Classes seeded successfully.");
//   } catch (error) {
//     console.error("Error seeding classes:", error);
//   }
// }

// Call the seedClasses function to insert class names into the database
// seedClasses();

// export default ClassModel;
