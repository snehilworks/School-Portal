import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ClipboardCheck,
  Users,
  GraduationCap,
  BookMarked,
  Menu,
  X,
} from "lucide-react";

import AttendanceManageContent from "../../../components/TeacherDash/AttendanceManage";
import UpdateMarksContent from "../../../components/TeacherDash/UpdateMarks";
import StudentListContent from "../../../components/TeacherDash/StudentList";
import ClassesContent from "../../../components/TeacherDash/Classes";
import GradebookContent from "../../../components/TeacherDash/Gradebook";

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
  <motion.div
    className={`
      flex items-center space-x-2 
      px-4 py-3 rounded-lg 
      cursor-pointer
      transition-all duration-300
      ${
        isActive
          ? "bg-white/10 text-white"
          : "text-white/70 hover:text-white hover:bg-white/5"
      }
    `}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon size={20} strokeWidth={1.5} />
    <span className="text-sm font-medium">{label}</span>
  </motion.div>
);

const TeacherDashboard = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: "Manage Attendance", label: "Attendance", icon: ClipboardCheck },
    { id: "Update Marks", label: "Update Marks", icon: BookOpen },
    { id: "Student Lists", label: "Students", icon: Users },
    { id: "Classes", label: "Classes", icon: GraduationCap },
    { id: "Gradebook", label: "Gradebook", icon: BookMarked },
  ];

  const renderContent = () => {
    switch (selectedContent) {
      case "Manage Attendance":
        return <AttendanceManageContent />;
      case "Update Marks":
        return <UpdateMarksContent />;
      case "Student Lists":
        return <StudentListContent />;
      case "Classes":
        return <ClassesContent />;
      case "Gradebook":
        return <GradebookContent />;
      default:
        return (
          <div className="text-center text-gray-600">
            Select an option from the sidebar to get started
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-gradient-to-b from-cyan-800 to-gray-900 fixed left-0 top-16 bottom-0">
        <div className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={selectedContent === item.id}
              onClick={() => setSelectedContent(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <motion.button
          className="p-4 bg-cyan-800 text-white rounded-full shadow-lg"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-cyan-800 to-gray-900 p-4 space-y-2">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={selectedContent === item.id}
                  onClick={() => {
                    setSelectedContent(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
          >
            Teacher Dashboard
          </motion.h1>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow p-4"
            >
              <h3 className="text-sm text-gray-500">Total Students</h3>
              <p className="text-2xl font-bold text-cyan-600">156</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-4"
            >
              <h3 className="text-sm text-gray-500">Classes Today</h3>
              <p className="text-2xl font-bold text-cyan-600">4</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow p-4"
            >
              <h3 className="text-sm text-gray-500">Attendance Rate</h3>
              <p className="text-2xl font-bold text-cyan-600">92%</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow p-4"
            >
              <h3 className="text-sm text-gray-500">Pending Grades</h3>
              <p className="text-2xl font-bold text-cyan-600">23</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
