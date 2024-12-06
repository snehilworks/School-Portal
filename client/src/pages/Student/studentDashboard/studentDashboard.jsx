import React from "react";
import { Link } from "react-router-dom";
import { Grade, Event, Home, Payment, Today } from "@mui/icons-material";
import PrimaryButton from "../../../components/ui/PrimaryButton";

function StudentDash() {
  return (
    <div className="bg-gradient-to-br from-emerald-100 via-white to-emerald-300 min-h-[91.3vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-12">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900">
            Student Dashboard
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            <i>Access your student information and manage your activities</i>
          </p>
        </div>

        {/* Dashboard Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Grades Card */}
          <Link
            to="/student/grades"
            className="block lg:col-span-2"
            aria-label="View Grades"
          >
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition hover:scale-105">
              <Grade className="text-6xl text-blue-500 mb-4" />
              <h3 className="text-2xl font-mono font-semibold text-gray-800">
                Grades
              </h3>
              <PrimaryButton color="student" className="mt-4 font-poppins">
                View
              </PrimaryButton>
            </div>
          </Link>

          {/* Attendance Card */}
          <Link
            to="/student/attendance"
            className="block lg:col-span-2"
            aria-label="View Attendance"
          >
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition hover:scale-105">
              <Today className="text-6xl text-green-500 mb-4" />
              <h3 className="text-2xl font-mono font-semibold text-gray-800">
                Attendance
              </h3>
              <PrimaryButton color="student" className="mt-4 font-poppins">
                View
              </PrimaryButton>
            </div>
          </Link>

          {/* Events Card */}
          <Link
            to="/student/events"
            className="block lg:col-span-2"
            aria-label="View Events"
          >
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition hover:scale-105">
              <Event className="text-6xl text-yellow-500 mb-4" />
              <h3 className="text-2xl font-mono font-semibold text-gray-800">
                Events
              </h3>
              <PrimaryButton color="student" className="mt-4 font-poppins">
                View
              </PrimaryButton>
            </div>
          </Link>

          {/* Hostel Details Card */}
          <Link
            to="/student/hostel"
            className="block lg:col-span-3"
            aria-label="View Hostel Details"
          >
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition hover:scale-105">
              <Home className="text-6xl text-purple-500 mb-4" />
              <h3 className="text-2xl font-mono font-semibold text-gray-800">
                Hostel Details
              </h3>
              <PrimaryButton color="student" className="mt-4 font-poppins">
                View
              </PrimaryButton>
            </div>
          </Link>

          {/* Payment Gateway Card */}
          <Link
            to="/student/payment"
            className="block lg:col-span-3"
            aria-label="Go to Payment Gateway"
          >
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition hover:scale-105">
              <Payment className="text-6xl text-red-500 mb-4" />
              <h3 className="text-2xl font-mono font-semibold text-gray-800">
                Payment Gateway
              </h3>
              <PrimaryButton color="student" className="mt-4 font-poppins">
                Pay Now
              </PrimaryButton>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDash;
