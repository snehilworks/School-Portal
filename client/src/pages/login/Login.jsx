import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../components/Modal/LoginModal";
import RegisterModal from "../../components/Modal/RegisterModal";
import TeacherLoginModal from "../../components/Modal/TeacherLoginModal";

export const Login = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isTeacherLoginModalOpen, setIsTeacherLoginModalOpen] = useState(false);

  useEffect(() => {
    const studentToken = localStorage.getItem("studentToken");
    const teacherToken = localStorage.getItem("teacherToken");
    const adminToken = localStorage.getItem("token");

    if (studentToken) {
      navigate("/student/dashboard");
    } else if (teacherToken) {
      navigate("/teacher/dashboard");
    } else if (adminToken) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleOpenRegister = () => {
    setIsLoginModalOpen(false);
    isRegisterModalOpen(true);
  };

  const handleOpenLogin = () => {
    isRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  //Closing Modals **Logic**
  const handleLoginCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleRegisterCloseModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleTeacherLoginCloseModal = () => {
    setIsTeacherLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen md:m-0 overflow-hidden bg-gradient-to-br from-gray-500 via-gray-900 to-gray-600">
      {/* Decorative School Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-24 h-24 border-4 border-blue-500 rounded-full"></div>
        <div className="absolute top-60 left-10 w-24 h-24 border-4 border-blue-500 rounded-full"></div>
        <div className="absolute top-20 right-20 w-32 h-32 border-4 border-indigo-500 rounded-lg rotate-45"></div>
        <div className="absolute top-80 right-20 w-32 h-32 border-4 border-indigo-500 rounded-lg rotate-45"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 border-4 border-purple-500 rounded-lg -rotate-12"></div>
        <div className="absolute bottom-50 left-1/4 w-40 h-40 border-4 border-purple-500 rounded-lg -rotate-12"></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 border-4 border-cyan-500 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 border-4 border-cyan-500 rounded-full"></div>
        <div className="absolute top-1/6 right-1/3 w-28 h-28 border-4 border-cyan-500 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
            Login Dashboard
          </h1>
          <p className="text-lg text-gray-300 max-w-md mx-auto">
            Access your educational journey through our secure portal
          </p>
        </div>

        {/* Buttons Container */}
        <div className="w-full max-w-2xl p-8 bg-gray-700/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="space-y-4">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="p-4 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg
                    className="w-8 h-8 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span className="text-lg font-semibold">Register</span>
                </div>
              </button>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg
                    className="w-8 h-8 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0L3 9m9 5l9-5"
                    />
                  </svg>
                  <span className="text-lg font-semibold">Student Login</span>
                </div>
              </button>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setIsTeacherLoginModalOpen(true)}
                className="p-4 bg-gradient-to-r from-cyan-700 to-cyan-900 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg
                    className="w-8 h-8 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="text-lg font-semibold">Faculty Login</span>
                </div>
              </button>

              <button
                onClick={() => navigate("/admin/login")}
                className="p-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg
                    className="w-8 h-8 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-lg font-semibold">Admin Login</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p>© 2025 SchoolName. All rights reserved.</p>
        </div>
      </div>

      {/* Modal Components */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={handleLoginCloseModal}
          onOpenRegister={handleOpenRegister}
        />
      )}
      {isRegisterModalOpen && (
        <RegisterModal
          onClose={handleRegisterCloseModal}
          onOpenLogin={handleOpenLogin}
        />
      )}
      {isTeacherLoginModalOpen && (
        <TeacherLoginModal onClose={handleTeacherLoginCloseModal} />
      )}
    </div>
  );
};
