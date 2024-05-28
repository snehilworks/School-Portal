import React from "react";
import { Link } from "react-router-dom";
import { Grade, Event, Home, Payment, Today } from "@mui/icons-material";
import PrimaryButton from "./../../../components/ui/PrimaryButton";

function StudentDash() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900">
            Student Dashboard
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            Access your student information and manage your activities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          <Link to="/student/grades" className="block lg:col-span-2">
            <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition hover:scale-105">
              <Grade className="text-6xl text-blue-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">Grades</h3>
              <PrimaryButton className="mt-4">View Grades</PrimaryButton>
            </div>
          </Link>

          <Link to="/student/attendance" className="block lg:col-span-2">
            <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition hover:scale-105">
              <Today className="text-6xl text-green-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">
                Attendance
              </h3>
              <PrimaryButton className="mt-4">View Attendance</PrimaryButton>
            </div>
          </Link>

          <Link to="/student/events" className="block lg:col-span-2">
            <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition hover:scale-105">
              <Event className="text-6xl text-yellow-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">Events</h3>
              <PrimaryButton className="mt-4">View Events</PrimaryButton>
            </div>
          </Link>

          <Link to="/student/hostel" className="block lg:col-span-3">
            <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition hover:scale-105">
              <Home className="text-6xl text-purple-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">
                Hostel Details
              </h3>
              <PrimaryButton className="mt-4">
                View Hostel Details
              </PrimaryButton>
            </div>
          </Link>

          <Link to="/student/payment" className="block lg:col-span-3">
            <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition hover:scale-105">
              <Payment className="text-6xl text-red-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">
                Payment Gateway
              </h3>
              <PrimaryButton className="mt-4">
                Go to Payment Gateway
              </PrimaryButton>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDash;
