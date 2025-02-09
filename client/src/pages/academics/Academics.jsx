import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Calendar, Check } from "lucide-react";

const AcademicsPage = () => {
  const [activeTab, setActiveTab] = useState("Cultural");
  const activitiesRef = useRef(null);

  const categories = [
    {
      name: "Cultural",
      icon: <Sparkles className="w-6 h-6" />,
      activities: [
        {
          title: "Global Culture Summit",
          description:
            "International cultural exchange and performance showcase.",
          date: "December 2025",
          highlight: true,
          tags: ["International", "Collaboration"],
        },
        {
          title: "AI-Assisted Dance Workshop",
          description:
            "Advanced dance training using AI motion analysis and personalized feedback.",
          date: "Every Saturday",
          tags: ["Technology", "Innovation"],
        },
        {
          title: "Immersive Music Experience",
          description:
            "Virtual reality and augmented reality music performance platform.",
          date: "Bi-weekly",
          tags: ["VR", "Music Tech"],
        },
      ],
    },
    // Other categories remain similar, with modern twists
    {
      name: "Sports",
      icon: <Star className="w-6 h-6" />,
      activities: [
        {
          title: "Cybernetic Sports Meet",
          description:
            "Advanced sports competition with wearable performance tracking.",
          date: "January 2025",
          highlight: true,
          tags: ["Tech", "Performance"],
        },
      ],
    },
    {
      name: "Academic",
      icon: <Check className="w-6 h-6" />,
      activities: [
        {
          title: "AI Research Symposium",
          description:
            "Student-led AI and machine learning research presentations.",
          date: "November 2025",
          highlight: true,
          tags: ["Research", "Innovation"],
        },
      ],
    },
    {
      name: "Community",
      icon: <Calendar className="w-6 h-6" />,
      activities: [
        {
          title: "Global Impact Challenge",
          description:
            "Collaborative community project solving real-world challenges.",
          date: "Quarterly",
          highlight: true,
          tags: ["Social Impact", "Collaboration"],
        },
      ],
    },
  ];

  const scrollToActivities = () => {
    activitiesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-100 to-emerald-500 py-20 my-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-emerald-200 opacity-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-emerald-900 mb-4 tracking-tight">
            Future Learning Ecosystem
          </h1>
          <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
            Pioneering holistic education through technology, creativity, and
            global collaboration
          </p>
          <button
            onClick={scrollToActivities}
            className="mt-6 bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
          >
            Explore Activities
          </button>
        </motion.div>

        {/* Category Tabs with Framer Motion */}
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
                  ? "bg-emerald-600 text-white shadow-2xl"
                  : "bg-white text-emerald-800 hover:bg-emerald-50 hover:shadow-md"
              }`}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Activities Grid with AnimatePresence */}
        <div
          ref={activitiesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {categories
              .find((cat) => cat.name === activeTab)
              ?.activities.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className={`relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all group ${
                    activity.highlight ? "border-2 border-emerald-500" : ""
                  }`}
                >
                  {activity.highlight && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="p-6 relative">
                    <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-all">
                      {categories.find((cat) => cat.name === activeTab).icon}
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-3 tracking-tight">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                        {activity.date}
                      </div>
                      <div className="flex space-x-2">
                        {activity.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AcademicsPage;
