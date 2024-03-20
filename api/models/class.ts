import mongoose, { Schema, Document } from "mongoose";

// Define interface for Class document
export interface Class extends Document {
  className: string;
}

// Define class schema
const classSchema: Schema = new Schema({
  className: { type: String, required: true, unique: true },
});

export default mongoose.model<Class>("Class", classSchema);

//Implement later

// Define an array of class names
// const classNames: string[] = [
//   "I",
//   "II",
//   "III",
//   "IV",
//   "V",
//   "VI",
//   "VII",
//   "VIII",
//   "IX",
//   "X",
//   "XI Science",
//   "XI Commerce",
//   "XI Arts",
//   "XII Science",
//   "XII Commerce",
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
