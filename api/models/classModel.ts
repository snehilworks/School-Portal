import mongoose, { Schema, Document } from "mongoose";
import Teacher from "./teacherModel";

export interface Class extends Document {
  className: string;
  classTeacher: typeof Teacher | null;
  seatsAvailable: number | null;
}

const classSchema: Schema = new Schema({
  className: { type: String, required: true, unique: true, index: true },
  classTeacher: { type: Schema.Types.ObjectId, ref: "Teacher", default: null },
  seatsAvailable: { type: Number, default: null }
});

export default mongoose.model<Class>("Class", classSchema);
