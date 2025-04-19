import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Home,
  CreditCard,
  CalendarCheck,
} from "lucide-react";

const DashboardCard = ({ to, icon: Icon, title, buttonText, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="h-full"
  >
    <Link to={to} className="block h-full">
      <div className="h-full flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className={`p-4 rounded-full ${color} mb-4`}>
          <Icon size={32} className="text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-4">
          {title}
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-auto px-6 py-2 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors duration-300"
        >
          {buttonText}
        </motion.button>
      </div>
    </Link>
  </motion.div>
);

function StudentDash() {
  const dashboardItems = [
    {
      to: "/student/grades",
      icon: GraduationCap,
      title: "Academic Grades",
      buttonText: "View Grades",
      color: "bg-blue-500",
      span: "lg:col-span-2",
    },
    {
      to: "/student/attendance",
      icon: CalendarCheck,
      title: "Attendance Record",
      buttonText: "Check Attendance",
      color: "bg-green-500",
      span: "lg:col-span-2",
    },
    {
      to: "/student/events",
      icon: Calendar,
      title: "School Events",
      buttonText: "View Events",
      color: "bg-yellow-500",
      span: "lg:col-span-2",
    },
    {
      to: "/student/hostel",
      icon: Home,
      title: "Hostel Information",
      buttonText: "View Details",
      color: "bg-purple-500",
      span: "lg:col-span-3",
    },
    {
      to: "/student/payment",
      icon: CreditCard,
      title: "Fee Payment",
      buttonText: "Pay Now",
      color: "bg-red-500",
      span: "lg:col-span-3",
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-600 italic">
            Welcome back! Manage your academic journey
          </p>
        </motion.div>

        {/* Quick Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        > */}
          {/* Example stats - you can customize these based on actual data */}
          {/* <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Attendance</p>
            <p className="text-2xl font-bold text-teal-600">92%</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">GPA</p>
            <p className="text-2xl font-bold text-teal-600">3.8</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Due Fees</p>
            <p className="text-2xl font-bold text-teal-600">₹2000</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Next Exam</p>
            <p className="text-2xl font-bold text-teal-600">5d</p>
          </div>
        </motion.div> */}

        {/* Dashboard Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
        >
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.to}
              className={item.span}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <DashboardCard {...item} />
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p>Attendance marked for today</p>
              <span className="ml-auto">2m ago</span>
            </div> */}
            {/* <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <p>Math test score published</p>
              <span className="ml-auto">2h ago</span> */}
            {/* </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <p>New event announcement: Annual Day</p>
              <span className="ml-auto">1d ago</span> */}
            {/* </div>
          </div>
        </motion.div> */}
      
      </div>
    </div>
  );
}

export default StudentDash;
