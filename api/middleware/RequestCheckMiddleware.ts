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

  // Capture the start time
  const startTime = process.hrtime();

  // Ensure that status is defined on the error
  const status = err.status || 500; // Default to 500 if no status is provided

  if (status === 512) {
    console.log("512 status received, sending error email");
    sendErrorEmail(err, req, startTime);
  }

  // Send error response
  res.status(status).json({ message: err.message || "Internal server error" });

  // Pass the error to the next error handler (if needed)
  next(err);
};

const sendErrorEmail = (
  err: any,
  req: Request,
  startTime: [number, number]
): void => {
  // Calculate the time taken for the request in milliseconds
  const [seconds, nanoseconds] = process.hrtime(startTime);
  const timeTaken = (seconds * 1000 + nanoseconds / 1000000).toFixed(2); // Time in ms

  // Get memory usage
  const memoryUsage = process.memoryUsage();
  const memoryUsageDetails = `
    ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB
  `;

  const mailOptions = {
    from: process.env.SENDER_MAIL,
    to: process.env.RECEIVER_MAIL,
    subject: `Error Log | ${err.status || 500}`,
    html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #4a4a4a;
      background-color: #f7f9fb;
      margin: 0;
      padding: 0;
    }
    .email-container {
      width: 100%;
      max-width: 650px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    h2 {
      font-size: 26px;
      font-weight: 700;
      color: #0a74da;
      margin-bottom: 18px;
    }
    .content {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 18px;
    }
    .highlight {
      color: #e03c31;
      font-weight: 600;
    }
    .info {
      font-size: 15px;
      color: #666;
    }
    .link {
      color: #0a74da;
      text-decoration: none;
    }
    .footer {
      font-size: 14px;
      color: #888;
      text-align: center;
      margin-top: 25px;
    }
    .footer a {
      color: #0a74da;
      text-decoration: none;
    }
    .section-header {
      font-weight: 600;
      margin-bottom: 10px;
      color: #333;
    }
    .divider {
      border-top: 1px solid #e2e2e2;
      margin: 20px 0;
    }

    /* Dynamic color classes for HTTP methods */
    .method-get {
      color: #008080; /* Teal */
      font-weight: bold;
    }
    .method-post {
      color: #4B5563; 
      font-weight: bold;
    }
    .method-put {
      color: #FFA500; /* Yellowish Orange */
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h2>API Error Notification</h2>
    <div class="content">
      <p><strong>Status Code:</strong> <span class="highlight">${
        err.status || 500
      }</span></p>
      <p><strong>Error Message:</strong> <span class="highlight">${
        err.message
      }</span></p>
    </div>

    <div class="content">
      <p><strong>Method:</strong> <span class="method-${req.method.toLowerCase()}">${
      req.method
    }</span></p>
      <p><strong>URL:</strong> <a href="${req.originalUrl}" class="link">${
      req.originalUrl
    }</a></p>
    </div>

    <div class="content">
      <p><strong>Time Taken:</strong> <i>${timeTaken} ms</i></p>
      <p><strong>Memory Usage:</strong> <i>${memoryUsageDetails}</i></p>
    </div>

    <div class="divider"></div>

    <div class="footer">
      <p>This email was automatically generated to notify you of an API issue. Please review the details above and take appropriate action.</p>
      <p>If you need further assistance, please <a href="mailto:support@company.com">contact support</a>.</p>
    </div>
  </div>
</body>
</html>

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
