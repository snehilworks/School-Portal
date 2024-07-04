import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import teacherRouter from "./routes/teacherRoutes";
import StudentRouter from "./routes/StudentRoutes";
import adminRouter from "./routes/adminRoutes";
import PayRouter from "./routes/PayRoutes";
import homeRouter from "./routes/homeRoutes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome To Shivam_Public_School");
});

app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/student", StudentRouter);
app.use("/api/teacher", teacherRouter);
app.use('/api/pay', PayRouter);

mongoose
  .connect(process.env.DATABASE_URL!, {
    dbName: "Shivam-Public",
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed: ", err);
  });

app.listen(PORT, () => {
  console.log("Server is Successfully Started, and Running on Port: " + PORT);
});
