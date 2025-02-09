import React from "react";
import {
  GraduationCap,
  Globe,
  Users,
  Book,
  Trophy,
  Music,
  Building,
  ArrowRight,
  Camera,
  PlayCircle,
  Star,
  Clock,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  const achievements = [
    {
      icon: <Trophy className="w-6 h-6 text-amber-500" />,
      number: "100%",
      text: "Board Results",
      detail: "Consistent academic excellence",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      number: "50+",
      text: "Expert Faculty",
      detail: "World-class educators",
    },
    {
      icon: <Star className="w-6 h-6 text-purple-500" />,
      number: "200+",
      text: "Competition Wins",
      detail: "National & international awards",
    },
    {
      icon: <Book className="w-6 h-6 text-emerald-500" />,
      number: "30+",
      text: "Programs",
      detail: "Diverse learning paths",
    },
  ];

  const features = [
    {
      title: "Academic Excellence",
      description:
        "Comprehensive STEM programs with advanced research facilities",
      image: "/academics.webp",
      icon: <GraduationCap className="w-8 h-8 text-amber-500" />,
      stats: [
        "100% Board Results",
        "50+ Research Labs",
        "International Curriculum",
      ],
    },
    {
      title: "Sports Development",
      description: "Professional sports facilities and expert coaching",
      image: "/sports.webp",
      icon: <Trophy className="w-8 h-8 text-blue-500" />,
      stats: [
        "Olympic-Size Pool",
        "Indoor Sports Complex",
        "Professional Coaches",
      ],
    },
    {
      title: "Cultural Growth",
      description: "Diverse artistic and cultural programs",
      image: "/cultural.jpg",
      icon: <Music className="w-8 h-8 text-purple-500" />,
      stats: ["Theatre Programs", "Music Academy", "Art Studios"],
    },
  ];

  const testimonials = [
    {
      text: "The holistic development approach at Shivam has transformed my child's outlook towards learning.",
      author: "Sarah Johnson",
      role: "Parent of Grade 8 Student",
      image: "/S.jpg",
    },
    {
      text: "Outstanding faculty and world-class facilities make this school truly exceptional.",
      author: "Michael Chen",
      role: "Parent of Grade 10 Student",
      image: "/M.png",
    },
    {
      text: "The perfect blend of academics and extracurriculars helped my child excel.",
      author: "Priya Sharma",
      role: "Parent of Grade 12 Student",
      image: "/P.png",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src="/school.jpg"
            alt="Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/90 to-emerald-900/90" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-4xl">
              <div
                onClick={() => navigate("/admissions")}
                className="mb-8 cursor-pointer"
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500/20 to-amber-500/10 text-amber-300 backdrop-blur-sm border border-amber-500/20">
                  <Star className="w-4 h-4 mr-2" />
                  Admissions Open 2025-26
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-black leading-tight">
                Shivam Public School
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                Where Excellence <br />
                Meets{" "}
                <span className="text-gradient bg-gradient-to-r from-amber-400 to-amber-200">
                  Innovation
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Join a legacy of excellence where your child's potential is
                discovered, nurtured, and transformed into achievement through
                our holistic approach to education.
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-amber-500 to-amber-400 text-white px-8 py-4 rounded-xl font-medium hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center">
                  Begin Their Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all">
                  <PlayCircle className="w-5 h-5" />
                  Virtual Campus Tour
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="fill-white" viewBox="0 0 1920 250">
            <path d="M0,288L48,266.7C96,245,192,203,288,202.7C384,203,480,245,576,245.3C672,245,768,203,864,170.7C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 -mt-32 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-3">
                  {stat.icon}
                  <div className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                </div>
                <div className="text-lg font-medium text-gray-900 mb-2">
                  {stat.text}
                </div>
                <div className="text-sm text-gray-600">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Excellence in Every Dimension
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our comprehensive approach to education that nurtures
              every aspect of student development.
            </p>
          </div>

          <div className="space-y-24">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-8">
                    {feature.description}
                  </p>
                  <div className="space-y-4">
                    {feature.stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-gray-700">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Voices of Our Community
            </h2>
            <p className="text-gray-600 text-lg">
              Hear what parents say about their experience with Shivam Public
              School.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-900 opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Begin Your Child's Journey to Excellence
          </h2>
          <p className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto">
            Join our community of learners and watch your child thrive in an
            environment designed for success.
          </p>
          <button
            onClick={() => navigate("/admissions")}
            className="bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-lg"
          >
            Apply Now for 2025-26
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white font-bold mb-4">Contact Us</h3>
              <p>123 Education Street</p>
              <p>New Delhi, India</p>
              <p>Phone: +91 123 456 7890</p>
              <p>Email: info@shivamschool.com</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/admissions" className="hover:text-white">
                    Admissions
                  </a>
                </li>
                <li>
                  <a href="/academics" className="hover:text-white">
                    Academics
                  </a>
                </li>
                <li>
                  <a href="/facilities" className="hover:text-white">
                    Facilities
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Programs</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Primary School
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Middle School
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    High School
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; 2025 Shivam Public School. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Fixed Contact Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Add some custom styles for gradients and animations */}
      <style jsx>{`
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse-soft {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .pulse-soft {
          animation: pulse-soft 2s infinite;
        }
      `}</style>
    </div>
  );
};
