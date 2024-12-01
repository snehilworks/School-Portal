import React from "react";
import activitiesData from "./activitiesData"; // This should contain categorized data
import "./Academics.css";

const AcademicsPage = () => {
  // Grouping activities by categories like 'Cultural', 'Sports', etc.
  const categories = [
    {
      name: "Cultural",
      activities: activitiesData.filter(
        (activity) => activity.category === "Cultural"
      ),
    },
    {
      name: "Sports",
      activities: activitiesData.filter(
        (activity) => activity.category === "Sports"
      ),
    },
    {
      name: "Academic",
      activities: activitiesData.filter(
        (activity) => activity.category === "Academic"
      ),
    },
    {
      name: "Community",
      activities: activitiesData.filter(
        (activity) => activity.category === "Community"
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-green-200 flex items-center justify-center">
      <div className="w-full max-w-7xl bg-white my-8 mx-6 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl text-center font-serif md:text-4xl font-bold text-green-800 mb-6">
          Academics and Activities
        </h1>

        {categories.map((category, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold font-mono text-center text-green-700 mb-4">
              {category.name}
            </h2>

            <ul className="space-y-4">
              {category.activities.length > 0 ? (
                category.activities.map((activity, idx) => (
                  <li
                    key={idx}
                    className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-700">
                        {activity.title}
                      </span>
                      <span className="text-sm text-gray-500">
                        {activity.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {activity.description}
                    </p>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">
                  No activities in this category yet.
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicsPage;
