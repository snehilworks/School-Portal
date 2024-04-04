import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay";
import cookieParser from "cookie-parser";
import teacherRouter from "./routes/teacherRoutes";
import StudentRouter from "./routes/StudentRoutes";
import adminRouter from "./routes/adminRoutes";
import homeRouter from "./routes/homeRoutes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//example implementation will integrate better

let razor = new Razorpay({
  key_id: "KEY_ID",
  key_secret: "KEY_SECRET"
});

let options = {
  amount: 5000, 
  currency: "USD",
  receipt: "order_reciept_1"
};
razor.orders.create(options, function(err, order) {
  console.log(order);
} )
//--------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Welcome To Shivam_Public_School");
});

app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/student", StudentRouter);
app.use("/api/teacher", teacherRouter);

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
