import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import teacherRouter from "./routes/teacherRoutes";
import StudentRouter from "./routes/StudentRoutes";
import adminRouter from "./routes/adminRoutes";
import homeRouter from "./routes/homeRoutes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome To Shivam_Public_School");
});

app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/student", StudentRouter);
app.use("/api/teacher", teacherRouter);

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE_URL!, {
    dbName: "Shivam-Public",
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

app.listen(PORT, () => {
  console.log("Server is Successfully Started, and Running on Port: " + PORT);
});
