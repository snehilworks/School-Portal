import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Rocket,
  Star,
  Award,
  ChevronDown,
  Zap,
  Compass,
  Heart,
} from "lucide-react";

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionsRef = useRef({});
  const mainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      id: "vision",
      title: "Our Vision",
      icon: <Target className="w-12 h-12" strokeWidth={1.5} />,
      color: "from-indigo-500 to-blue-600",
      textColor: "text-blue-50",
      description:
        "Pioneering transformative education through technology, creativity, and global collaboration, empowering students to become innovative global citizens who shape tomorrow's world with compassion and ingenuity.",
      highlights: [
        {
          title: "AI-Enhanced Learning",
          description:
            "Integrating cutting-edge AI tools to personalize education and accelerate mastery",
        },
        {
          title: "Global Collaboration",
          description:
            "Connecting students with peers worldwide for cultural exchange and collaborative projects",
        },
        {
          title: "Future-Ready Skills",
          description:
            "Developing critical thinking, creativity, and digital literacy for success in any field",
        },
      ],
    },
    {
      id: "mission",
      title: "Our Mission",
      icon: <Rocket className="w-12 h-12" strokeWidth={1.5} />,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-50",
      description:
        "To create an adaptive, personalized learning ecosystem that nurtures intellectual curiosity, emotional intelligence, and technological proficiency, preparing students to thrive in an ever-changing global landscape.",
      highlights: [
        {
          title: "Personalized Learning Paths",
          description:
            "Tailoring education to individual strengths, interests, and learning styles",
        },
        {
          title: "Holistic Development",
          description:
            "Balancing academic excellence with social, emotional, and physical wellbeing",
        },
        {
          title: "Technology Integration",
          description:
            "Seamlessly blending digital tools with traditional teaching methods",
        },
      ],
    },
    {
      id: "values",
      title: "Core Values",
      icon: <Star className="w-12 h-12" strokeWidth={1.5} />,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-50",
      description:
        "Cultivating a culture of excellence, innovation, diversity, and ethical leadership that inspires students to lead with integrity, embrace challenges, and create positive change in their communities.",
      highlights: [
        {
          title: "Continuous Innovation",
          description:
            "Embracing change and constantly seeking better educational approaches",
        },
        {
          title: "Inclusive Excellence",
          description:
            "Celebrating diversity and ensuring equitable opportunities for all students",
        },
        {
          title: "Ethical Leadership",
          description:
            "Developing moral courage and responsible decision-making",
        },
      ],
    },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId === activeSection ? null : sectionId);
    if (sectionId !== activeSection) {
      setTimeout(() => {
        sectionsRef.current[sectionId]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  };

  const iconComponents = {
    "AI-Enhanced Learning": <Zap className="w-6 h-6" />,
    "Global Collaboration": <Compass className="w-6 h-6" />,
    "Future-Ready Skills": <Award className="w-6 h-6" />,
    "Personalized Learning Paths": <Compass className="w-6 h-6" />,
    "Holistic Development": <Heart className="w-6 h-6" />,
    "Technology Integration": <Zap className="w-6 h-6" />,
    "Continuous Innovation": <Zap className="w-6 h-6" />,
    "Inclusive Excellence": <Heart className="w-6 h-6" />,
    "Ethical Leadership": <Award className="w-6 h-6" />,
  };

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-10"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              scale: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
              y: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
            }}
            transition={{
              duration: Math.random() * 50 + 50,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
            }}
          />
        ))}
      </div>

      
      <div className="max-w-7xl mx-auto px-6 pt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
            Shaping Tomorrow's Leaders
          </h1>
          <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Redefining education through innovative learning, global
            perspectives, and technology-driven growth.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-center animate-bounce"
            >
              <ChevronDown className="w-8 h-8 text-blue-300" />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              }}
              className={`bg-gradient-to-br ${section.color} rounded-2xl shadow-xl overflow-hidden cursor-pointer group`}
              onClick={() => scrollToSection(section.id)}
            >
              <div className="p-8">
                <div className="bg-white/10 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <div className="text-white">{section.icon}</div>
                </div>
                <h2 className={`text-3xl font-bold ${section.textColor} mb-4`}>
                  {section.title}
                </h2>
                <p className="text-white/80 mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {section.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {section.highlights.map((highlight) => (
                    <span
                      key={highlight.title}
                      className="px-3 py-1 bg-white/10 text-white rounded-full text-sm backdrop-blur-sm"
                    >
                      {highlight.title}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-end text-white/80">
                  <span className="mr-2 text-sm font-medium">Learn More</span>
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform ${
                      activeSection === section.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeSection && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl"
            >
              {sections
                .filter((section) => section.id === activeSection)
                .map((section) => (
                  <div
                    key={section.id}
                    ref={(el) => (sectionsRef.current[section.id] = el)}
                  >
                    <div className="flex items-center mb-8">
                      <div
                        className={`bg-gradient-to-br ${section.color} w-16 h-16 rounded-2xl flex items-center justify-center mr-6`}
                      >
                        <div className="text-white">{section.icon}</div>
                      </div>
                      <h3 className="text-4xl font-bold text-white">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                      {section.description}
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      {section.highlights.map((highlight, idx) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.5 }}
                          key={highlight.title}
                          className="bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-sm"
                        >
                          <div
                            className={`bg-gradient-to-br ${section.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                          >
                            {iconComponents[highlight.title]}
                          </div>
                          <h4 className="font-bold text-xl text-white mb-2">
                            {highlight.title}
                          </h4>
                          <p className="text-blue-100/80">
                            {highlight.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Us on Our Journey
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">
            Discover how Shivam Public School is transforming education and
            preparing students for success in the 21st century.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-8 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
            Schedule a Visit
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
