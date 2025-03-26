import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Star,
  Calendar,
  Check,
  Image as ImageIcon,
  Award,
  Users,
  X,
} from "lucide-react";

const AcademicsPage = () => {
  const [activeTab, setActiveTab] = useState("Gallery");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const activitiesRef = useRef(null);

  const schoolEvents = {
    Gallery: {
      icon: <ImageIcon className="w-6 h-6" />,
      events: [
        {
          title: "Science Fair Showcase",
          description: "Students presenting innovative projects and research",
          date: "March 2025",
          images: [
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
          ],
          highlights: [
            "AI-powered robotics project",
            "Environmental sustainability research",
            "Quantum computing model",
          ],
        },
        {
          title: "Cultural Diversity Day",
          description:
            "Celebrating global cultures and international understanding",
          date: "April 2025",
          images: [
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
          ],
          highlights: [
            "Traditional costume parade",
            "International cuisine festival",
            "Cultural performance showcase",
          ],
        },
      ],
    },
    Achievements: {
      icon: <Award className="w-6 h-6" />,
      events: [
        {
          title: "National Academic Olympiad",
          description: "Top performers recognized for academic excellence",
          date: "May 2025",
          images: [
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
          ],
          achievements: [
            {
              name: "Mathematics Gold Medal",
              student: "Emily Chang",
              description: "Outstanding performance in advanced mathematics",
            },
            {
              name: "Science Innovation Award",
              student: "Michael Rodriguez",
              description: "Groundbreaking research in renewable energy",
            },
            {
              name: "Debate Championship",
              team: "Senior Debate Team",
              description: "Winning national-level debate competition",
            },
          ],
        },
      ],
    },
    Sports: {
      icon: <Star className="w-6 h-6" />,
      events: [
        {
          title: "Inter-School Sports Tournament",
          description: "Showcasing athletic excellence and team spirit",
          date: "February 2025",
          images: [
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
          ],
          results: [
            {
              sport: "Basketball",
              achievement: "1st Place",
              description: "Undefeated championship performance",
            },
            {
              sport: "Swimming",
              achievement: "Regional Champions",
              description: "Multiple record-breaking performances",
            },
            {
              sport: "Track and Field",
              achievement: "Multiple Gold Medals",
              description: "Outstanding individual and team achievements",
            },
          ],
        },
      ],
    },
    Community: {
      icon: <Users className="w-6 h-6" />,
      events: [
        {
          title: "Community Service Initiative",
          description: "Students making a difference in local communities",
          date: "Ongoing",
          images: [
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
          ],
          projects: [
            "Environmental cleanup drive",
            "Teaching programs for underprivileged children",
            "Senior citizen support workshops",
          ],
        },
      ],
    },
  };

  const categories = Object.keys(schoolEvents).map((key) => ({
    name: key,
    icon: schoolEvents[key].icon,
  }));

  const openEventModal = (event) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
            School Life Panorama
          </h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            Transparent insights into our students' vibrant educational journey
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(category.name)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === category.name
                  ? "bg-blue-600 text-white shadow-2xl"
                  : "bg-white text-blue-800 hover:bg-blue-50 hover:shadow-md"
              }`}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Event Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {schoolEvents[activeTab].events.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
                onClick={() => openEventModal(event)}
              >
                {event.images && event.images.length > 0 && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {event.date}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Event Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-blue-900">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {selectedEvent.description}
                    </p>
                  </div>
                  <button
                    onClick={closeEventModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                {/* Image Gallery */}
                {selectedEvent.images && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {selectedEvent.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${selectedEvent.title} - Image ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {/* Achievements Section */}
                {activeTab === "Achievements" && selectedEvent.achievements && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">
                      Notable Achievements
                    </h3>
                    {selectedEvent.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-3 border-b last:border-b-0 border-blue-100"
                      >
                        <div>
                          <span className="font-medium text-blue-900">
                            {achievement.name}
                          </span>
                          <span className="block text-sm text-gray-600">
                            {achievement.student || achievement.team}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {achievement.description}
                          </p>
                        </div>
                        <Award className="w-6 h-6 text-blue-500" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Sports Results Section */}
                {activeTab === "Sports" && selectedEvent.results && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">
                      Tournament Results
                    </h3>
                    {selectedEvent.results.map((result, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-3 border-b last:border-b-0 border-blue-100"
                      >
                        <div>
                          <span className="font-medium text-blue-900">
                            {result.sport}
                          </span>
                          <span className="block text-sm text-gray-600">
                            {result.achievement}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {result.description}
                          </p>
                        </div>
                        <Star className="w-6 h-6 text-blue-500" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Community Projects Section */}
                {activeTab === "Community" && selectedEvent.projects && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">
                      Community Impact Projects
                    </h3>
                    {selectedEvent.projects.map((project, idx) => (
                      <div
                        key={idx}
                        className="flex items-center py-3 border-b last:border-b-0 border-blue-100"
                      >
                        <Users className="w-6 h-6 text-blue-500 mr-4" />
                        <span className="text-blue-900">{project}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicsPage;
