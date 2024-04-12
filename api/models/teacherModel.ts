import mongoose, { Schema, Document } from "mongoose";

export interface Teacher extends Document {
  name: string;
  email: string;
  password: string;
  subjects: string[];
  phone: number;
  classTeacher: boolean;
  classes: string[];
}

const teacherSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjects: [{ type: String, required: true }],
  phone: { type: Number },
  classTeacher: { type: Boolean, default: false },
  classes: [{ type: String }],
});

export default mongoose.model<Teacher>("Teacher", teacherSchema);
