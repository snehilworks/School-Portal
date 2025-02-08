import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  subjects: string[];
  phone: number;
  classTeacher: boolean;
  classes: string[];
  class?: Types.ObjectId;
}

const teacherSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjects: [{ type: String, required: true }],
  phone: { type: Number },
  classTeacher: { type: Boolean, default: false },
  classes: [{ type: String }],
  class: {
    type: Types.ObjectId,
    ref: "Class",
    validate: {
      validator: function (this: ITeacher) {
        return !this.classTeacher || (this.classTeacher && this.class);
      },
      message: "Class field is required when the teacher is a class teacher.",
    },
  },
});

export default mongoose.model<ITeacher>("Teacher", teacherSchema);
