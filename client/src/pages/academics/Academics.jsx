import React, { useState } from "react";

const AcademicsPage = () => {
  const [activeTab, setActiveTab] = useState("Cultural");

  const categories = [
    {
      name: "Cultural",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      ),
      activities: [
        {
          title: "Annual Cultural Fest",
          description:
            "Three-day cultural extravaganza featuring dance, music, and theatrical performances.",
          date: "December 2024",
          highlight: true,
        },
        {
          title: "Classical Dance Workshop",
          description:
            "Weekly classical dance training sessions by renowned instructors.",
          date: "Every Wednesday",
        },
        {
          title: "Music Club",
          description:
            "Regular practice sessions for vocal and instrumental music.",
          date: "Twice Weekly",
        },
      ],
    },
    {
      name: "Sports",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      activities: [
        {
          title: "Annual Sports Meet",
          description:
            "Major sporting event featuring track and field competitions.",
          date: "January 2025",
          highlight: true,
        },
        {
          title: "Cricket Championship",
          description:
            "Inter-house cricket tournament with intensive training.",
          date: "March 2025",
        },
        {
          title: "Basketball League",
          description: "Regular basketball practice and inter-school matches.",
          date: "Weekly",
        },
      ],
    },
    {
      name: "Academic",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      activities: [
        {
          title: "Science Exhibition",
          description:
            "Annual science fair showcasing student projects and innovations.",
          date: "November 2024",
          highlight: true,
        },
        {
          title: "Math Olympiad",
          description:
            "Preparation and participation in national mathematics competition.",
          date: "Monthly",
        },
        {
          title: "Coding Club",
          description: "Learning programming and developing software projects.",
          date: "Weekly",
        },
      ],
    },
    {
      name: "Community",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      activities: [
        {
          title: "Social Service Drive",
          description: "Community service initiatives and volunteer programs.",
          date: "Quarterly",
          highlight: true,
        },
        {
          title: "Environmental Club",
          description:
            "Activities focused on environmental awareness and conservation.",
          date: "Monthly",
        },
        {
          title: "Leadership Program",
          description: "Student council and leadership development activities.",
          date: "Ongoing",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-500 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Academic Excellence & Activities
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Nurturing talents beyond the classroom
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveTab(category.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === category.name
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-emerald-50"
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories
            .find((cat) => cat.name === activeTab)
            ?.activities.map((activity, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all ${
                  activity.highlight ? "border-2 border-emerald-500" : ""
                }`}
              >
                {activity.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Featured
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {activity.date}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicsPage;
