# School Portal

![image](https://github.com/user-attachments/assets/a02b48e9-393d-4ca6-b60e-5d020bd0d06e)

## 📌 Overview
The **School Portal** is a comprehensive platform designed to manage school operations efficiently. It provides a seamless experience for students, teachers, and administrators by integrating essential functionalities like student management, fee payments, and course scheduling.

## 🚀 Features
- **Student Management**: Enroll, update, and track student records.
- **Teacher & Staff Management**: Assign courses, manage schedules, and payroll.
- **Course Management**: Add, update, and remove subjects and classes.
- **Attendance Tracking**: Monitor student and teacher attendance.
- **Online Fee Payment**: Secure payments via Razorpay integration.
- **Notifications & Alerts**: Send important updates to students and staff.
- **Secure Authentication**: Role-based access control for students, teachers, and admins.

## 🛠️ Tech Stack
### Frontend
- **React.js** - Interactive UI development
- **TypeScript** - Strongly-typed JavaScript
- **Tailwind CSS** - Modern styling framework

### Backend
- **Node.js** - Server-side development
- **Express.js** - Fast and minimalist web framework
- **TypeScript** - Ensuring type safety and scalability
- **MongoDB / PostgreSQL** - Database for storing records

### Additional
- **Validation** - Robust data validation across forms and API requests
- **Advanced Razorpay Payment Functionality** - Secure fee collection

## 📦 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/snehilworks/school-portal.git
   ```
2. Navigate to the project folder:
   ```sh
   cd school-portal
   ```
3. Change Directory to API:
   ```sh
   cd API
   ```
4. Start the Server :
   ```sh
   npx tsc build && node dist/index.js
   ```
5. Cd over to Client:
   ```sh
   cd Client
   ```
6. Install dependencies:
   ```sh
   npm install
   ```
7. Start the development server:
   ```sh
   npm run dev
   ```

## 🔧 Configuration
Create a `.env` file in the root directory and configure the following environment variables:
```env
DATABASE_URL=your_database_url
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_secret
```

## 📜 API Documentation
API documentation is available using Swagger.
To access it, start the server and visit:
```
http://localhost:5000/api-docs
```

## 🏗️ Contribution Guidelines
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## 📞 Contact
For any issues or suggestions, feel free to open an issue or reach out at [cod3r.ss2910@gmail.com](mailto:cod3r.ss2910@gmail.com).

---

⭐ **Star this repository** if you find it useful!

