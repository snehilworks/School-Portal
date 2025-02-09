import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Rocket,
  Globe,
  Users,
  Building,
  MessageCircle,
  Star,
  Award,
} from "lucide-react";

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState(null);
  const sectionsRef = useRef({});

  const sections = [
    {
      id: "vision",
      title: "Our Vision",
      icon: <Target className="w-12 h-12 text-blue-500" />,
      description:
        "Pioneering transformative education through technology, creativity, and global collaboration, empowering students to become innovative global citizens.",
      highlights: [
        "AI-Enhanced Learning",
        "Global Collaboration",
        "Future-Ready Skills",
      ],
    },
    {
      id: "mission",
      title: "Our Mission",
      icon: <Rocket className="w-12 h-12 text-emerald-500" />,
      description:
        "To create an adaptive, personalized learning ecosystem that nurtures intellectual curiosity, emotional intelligence, and technological proficiency.",
      highlights: [
        "Personalized Learning Paths",
        "Holistic Development",
        "Technology Integration",
      ],
    },
    {
      id: "values",
      title: "Core Values",
      icon: <Star className="w-12 h-12 text-yellow-500" />,
      description:
        "Cultivating a culture of excellence, innovation, diversity, and ethical leadership.",
      highlights: [
        "Continuous Innovation",
        "Inclusive Excellence",
        "Ethical Leadership",
      ],
    },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionsRef.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-100 to-blue-500 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 opacity-20 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-extrabold text-blue-900 mb-6 tracking-tight">
            Shivam Public School
          </h1>
          <p className="text-2xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Redefining education through innovative learning, global
            perspectives, and technology-driven growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all group"
              onClick={() => scrollToSection(section.id)}
            >
              <div className="flex items-center mb-4">
                {section.icon}
                <h2 className="ml-4 text-2xl font-bold text-blue-800">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-4">{section.description}</p>
              <div className="flex space-x-2">
                {section.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeSection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 bg-white rounded-2xl p-8 shadow-2xl"
            >
              {sections
                .filter((section) => section.id === activeSection)
                .map((section) => (
                  <div
                    key={section.id}
                    ref={(el) => (sectionsRef.current[section.id] = el)}
                  >
                    <h3 className="text-4xl font-bold text-blue-900 mb-6">
                      {section.title}
                    </h3>
                    <p className="text-xl text-gray-700 mb-6">
                      {section.description}
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      {section.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors"
                        >
                          <Award className="w-8 h-8 text-blue-600 mb-2" />
                          <h4 className="font-semibold text-blue-800">
                            {highlight}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutUs;
