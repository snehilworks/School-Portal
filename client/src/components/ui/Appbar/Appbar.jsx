import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Info,
  GraduationCap,
  ScrollText,
  Phone,
  LogOut,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../../store/atoms/auth";

const NavItem = ({ path, label, icon: Icon, isActive, onClick }) => (
  <motion.div
    className={`
      flex items-center space-x-2 
      px-3 py-2 rounded-lg 
      transition-all duration-300 
      ${
        isActive
          ? "bg-white/10 text-white"
          : "text-white/70 hover:text-white hover:bg-white/5"
      }
    `}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon size={20} strokeWidth={1.5} />
    <span className="text-sm font-medium">{label}</span>
  </motion.div>
);

function Appbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const auth = useRecoilValue(authState);
  const setAuthState = useSetRecoilState(authState);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About Us", icon: Info },
    { path: "/academics", label: "Academics", icon: GraduationCap },
    { path: "/admissions", label: "Admissions", icon: ScrollText },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  // Add login only if no token is present
  const loginItem = { path: "/login", label: "Login", icon: LogIn };

  useEffect(() => {
    const studentToken = localStorage.getItem("studentToken");
    const teacherToken = localStorage.getItem("teacherToken");
    const adminToken = localStorage.getItem("token");

    setAuthState({
      isAuthenticated: !!(studentToken || teacherToken || adminToken),
    });
  }, [setAuthState]);

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("teacherToken");
    localStorage.removeItem("token");
    setAuthState({ isAuthenticated: false });
    navigate("/");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-teal-800 to-gray-900 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Shivam Public School
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center cursor-pointer">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                {...item}
                isActive={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              />
            ))}

            {/* Conditionally render Login or Logout */}
            {!auth.isAuthenticated ? (
              <NavItem
                {...loginItem}
                isActive={location.pathname === loginItem.path}
                onClick={() => navigate(loginItem.path)}
              />
            ) : (
              <motion.button
                className="ml-4 bg-red-600/20 text-red-300 hover:bg-red-600/40 px-4 py-2 rounded-lg flex items-center space-x-2"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={20} strokeWidth={1.5} />
                <span>Logout</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button
              className="text-white"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/10 backdrop-blur-sm"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  className={`
                    flex items-center space-x-3 
                    px-3 py-3 rounded-lg 
                    cursor-pointer 
                    ${
                      location.pathname === item.path
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }
                  `}
                  onClick={() => {
                    navigate(item.path);
                    toggleMobileMenu();
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon size={20} strokeWidth={1.5} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}

              {/* Conditionally render Login or Logout for mobile */}
              {!auth.isAuthenticated ? (
                <motion.div
                  key={loginItem.path}
                  className={`
                    flex items-center space-x-3 
                    px-3 py-3 rounded-lg 
                    cursor-pointer 
                    ${
                      location.pathname === loginItem.path
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }
                  `}
                  onClick={() => {
                    navigate(loginItem.path);
                    toggleMobileMenu();
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn size={20} strokeWidth={1.5} />
                  <span className="text-sm font-medium">{loginItem.label}</span>
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg bg-red-600/10 text-red-300 hover:bg-red-600/20 cursor-pointer"
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={20} strokeWidth={1.5} />
                  <span className="text-sm font-medium">Logout</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Appbar;
