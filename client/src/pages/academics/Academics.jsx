import React from "react";
import activitiesData from "./activitiesData";
import "./Academics.css";

const AcademicsPage = () => {
  return (
    <div className="min-h-screen bg-green-200 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-gray-100 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl text-center md:text-4xl font-bold text-gray-800 mb-6">
          Academics and Activities
        </h1>

        <ul className="space-y-4">
          {activitiesData.map((activity, index) => (
            <li
              key={index}
              className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">
                  {activity.title}
                </span>
                <span className="text-sm text-gray-500">{activity.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AcademicsPage;
