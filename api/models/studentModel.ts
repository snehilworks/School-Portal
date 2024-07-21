import mongoose, { Schema, Document } from "mongoose";

export interface Student extends Document {
  name: string;
  email: string;
  password: string;
  phone: number;
  dob?: Date;
  gender?: string;
  fatherName?: string;
  fatherPhone?: number;
  motherName?: string;
  motherPhone?: number;
  class?: string;
  section?: string;
  admission: boolean;
  placeName?: string;
  address?: string;
  aadharNumber?: string; 
  previousSchoolTC?: string | null;
}

const studentSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number },
  dob: { type: Date },
  gender: { type: String },
  fatherName: { type: String },
  fatherPhone: { type: Number },
  motherName: { type: String },
  motherPhone: { type: Number },
  class: { type: String },
  section: { type: String },
  admission: { type: Boolean, default: false },
  placeName: { type: String },
  address: { type: String },
  aadharNumber: { type: String },
  previousSchoolTC: { type: String, default: null }
});

export default mongoose.model<Student>("Student", studentSchema);
