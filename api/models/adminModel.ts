import mongoose, { Schema, Document } from "mongoose";

export interface Admin extends Document {
  email: string;
  password: string;
  role: "admin";
  phone: number;
}

const adminSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin"], default: "admin" },
  phone: { type: Number },
});

// Ensure there can only be two admins in DB
adminSchema.plugin(function (schema: Schema) {
  schema.pre("save", async function (next) {
    const count = await mongoose.model<Admin>("Admin").countDocuments({});
    if (count >= 2) {
      const err = new Error("Maximum limit reached for admins");
      next(err);
    } else {
      next();
    }
  });
});

export default mongoose.model<Admin>("Admin", adminSchema);
