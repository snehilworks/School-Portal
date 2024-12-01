import { Request, Response, NextFunction } from "express";
import nodemailer, { SentMessageInfo } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // For Mailtrap (or use Gmail for production)
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Middleware to check request errors and send email notifications for specific status codes
const RequestCheckMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("We are here in the error middleware");
  console.log(`Error status: ${err.status}`);

  // Ensure that status is defined on the error
  const status = err.status || 500; // Default to 500 if no status is provided

  if (status === 512) {
    console.log("512 status received, sending error email");
    sendErrorEmail(err, req);
  }

  // Send error response
  res.status(status).json({ message: err.message || "Internal server error" });

  // Pass the error to the next error handler (if needed)
  next(err);
};

const sendErrorEmail = (err: any, req: Request): void => {
  const mailOptions = {
    from: process.env.SENDER_MAIL,
    to: process.env.RECEIVER_MAIL,
    subject: `Error Log | ${err.status || 500}`,
    html: `
      <h2 style="color: #d9534f;">An error occurred in the API:</h2>
      <p><strong>Status Code:</strong> <span style="color: #f0ad4e;">${
        err.status || 500
      }</span></p>
      <p><strong>Error Message:</strong> <span style="color: #f0ad4e;">${
        err.message
      }</span></p>
      <p><strong>Request Method:</strong> ${req.method}</p>
      <p><strong>Request URL:</strong> <a href="${
        req.originalUrl
      }" style="color: #0275d8;">${req.originalUrl}</a></p>
      <hr />
      <p style="font-size: 0.9em; color: #5bc0de;">This email was generated automatically to notify you about an API issue.</p>
    `,
  };

  // Send the email using the transporter
  transporter.sendMail(
    mailOptions,
    (error: Error | null, info: SentMessageInfo | null) => {
      if (error) {
        console.error("Error occurred:", error);
        return;
      }
      console.log("Message sent:", info);
    }
  );
};

export default RequestCheckMiddleware;
