import { Teacher } from "../models/teacherModel";
import { Student } from "../models/studentModel";
import { Admin } from "../models/adminModel";

declare global {
  namespace Express {
    interface Request {
      user?: Teacher | Student | Admin;
    }
  }
}
