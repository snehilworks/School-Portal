// Import the Nodemailer library
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Configure the mailoptions object
const mailOptions = {
  from: process.env.SENDER_MAIL,
  to: process.env.RECEIVER_MAIL,
  subject: "Contract information provided",
  text: "The Contract information is here that you were looking for!",
};

// Send the email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log("Error: " + error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
