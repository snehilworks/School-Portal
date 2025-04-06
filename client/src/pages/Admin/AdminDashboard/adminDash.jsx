import React, { useState } from "react";
import {
  LayoutDashboard,
  UserPlus,
  UserCog,
  UserX,
  GraduationCap,
  CreditCard,
  DollarSign,
  MessageSquare,
  FileText,
  Home,
  ChevronDown,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import your content components
import DashboardContent from "../../../components/AdminDash/DashboardContent";
import AddTeacherContent from "../../../components/AdminDash/AddTeacherContent";
import UpdateTeacherContent from "../../../components/AdminDash/UpdateTeacherContent";
import DeleteTeacherContent from "../../../components/AdminDash/DeleteTeacherContent";
import UpdateStudentStatusContent from "../../../components/AdminDash/UpdateStudentStatusContent";
import PaymentsContent from "../../../components/AdminDash/PaymentsContent";
import HandleFeesContent from "../../../components/AdminDash/HandleFeesContent";
import ContactMessageContent from "../../../components/AdminDash/ContactMessageContent";
import AdmissionFormContent from "../../../components/AdminDash/AdmissionFormContent";
import HostelFormContent from "../../../components/AdminDash/HostelFormContent";

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

const AdminDashboard = () => {
  const [selectedContent, setSelectedContent] = useState("Dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "Add Teacher", label: "Add Teacher", icon: UserPlus },
    { id: "Update Teacher", label: "Update Teacher", icon: UserCog },
    { id: "Delete Teacher", label: "Delete Teacher", icon: UserX },
    {
      id: "Update Student Admission Status",
      label: "Student Status",
      icon: GraduationCap,
    },
    { id: "Payments", label: "Payments", icon: CreditCard },
    { id: "Set-Fees", label: "Set Fees", icon: DollarSign },
    { id: "Contact Messages", label: "Messages", icon: MessageSquare },
    { id: "Admission Form", label: "Admission", icon: FileText },
    { id: "Hostel Form", label: "Hostel", icon: Home },
  ];

  const renderContent = () => {
    switch (selectedContent) {
      case "Dashboard":
        return <DashboardContent />;
      case "Add Teacher":
        return <AddTeacherContent />;
      case "Update Teacher":
        return <UpdateTeacherContent />;
      case "Delete Teacher":
        return <DeleteTeacherContent />;
      case "Update Student Admission Status":
        return <UpdateStudentStatusContent />;
      case "Payments":
        return <PaymentsContent />;
      case "Set-Fees":
        return <HandleFeesContent />;
      case "Contact Messages":
        return <ContactMessageContent />;
      case "Admission Form":
        return <AdmissionFormContent />;
      case "Hostel Form":
        return <HostelFormContent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-300 to-gray-900 pt-16">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-gradient-to-b from-teal-800 to-gray-900 fixed left-0 top-16 bottom-0">
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
          className="p-4 bg-teal-800 text-white rounded-full shadow-lg"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={24} />
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
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-teal-800 to-gray-900 p-4 space-y-2">
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
            Admin Dashboard
          </motion.h1>

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

export default AdminDashboard;
