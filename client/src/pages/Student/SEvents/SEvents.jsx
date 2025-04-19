import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  Search,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [featuredEventIndex, setFeaturedEventIndex] = useState(0);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories = [
    { id: "all", label: "All Events", icon: Calendar },
    { id: "academic", label: "Academic", icon: Trophy },
    { id: "cultural", label: "Cultural", icon: Users },
    { id: "sports", label: "Sports", icon: Trophy },
  ];

  const events = [
    {
      id: 1,
      date: "2025-08-15",
      title: "Independence Day Celebration",
      description:
        "Join us for a grand celebration featuring flag hoisting, cultural performances, and patriotic activities.",
      time: "8:00 AM",
      location: "School Main Ground",
      category: "cultural",
      featured: true,
      bgColor: "from-orange-400 to-green-400",
      image: "/independence.jpg",
      attendees: 500,
    },
    {
      id: 2,
      date: "2025-03-15",
      title: "Annual Science Exhibition",
      description:
        "Witness innovative projects and experiments by our talented students showcasing the future of technology.",
      time: "10:00 AM",
      location: "Science Block",
      category: "academic",
      featured: true,
      bgColor: "from-blue-500 to-teal-600",
      image: "/science.jpg",
      attendees: 300,
    },
    {
      id: 3,
      date: "2025-04-05",
      title: "Inter-School Sports Meet",
      description:
        "Annual sports competition featuring track and field events, team sports, and athletic demonstrations.",
      time: "9:00 AM",
      location: "Sports Complex",
      category: "sports",
      featured: true,
      bgColor: "from-red-400 to-red-600",
      image: "/sports.jpg",
      attendees: 400,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedEventIndex((prev) =>
        prev === events.filter((e) => e.featured).length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      (selectedCategory === "all" || event.category === selectedCategory) &&
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredEvents = events.filter((e) => e.featured);
  const currentFeaturedEvent = featuredEvents[featuredEventIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Event */}
      <div
        className={`relative h-[400px] md:h-[500px] bg-gradient-to-r ${currentFeaturedEvent.bgColor}`}
      >
        <div className="absolute inset-0 bg-black/30" />
        <img
          src={currentFeaturedEvent.image}
          alt={currentFeaturedEvent.title}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />

        <div className="relative w-full max-w-7xl mx-auto px-4 py-10 md:py-20 h-full flex flex-col justify-end">
          <div className="space-y-3 md:space-y-4 text-white">
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                Featured Event
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {currentFeaturedEvent.category.charAt(0).toUpperCase() +
                  currentFeaturedEvent.category.slice(1)}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">
              {currentFeaturedEvent.title}
            </h1>
            <p className="text-base md:text-xl text-white/90 max-w-2xl line-clamp-2 md:line-clamp-none">
              {currentFeaturedEvent.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-white/80">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                {new Date(currentFeaturedEvent.date).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                {currentFeaturedEvent.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                {currentFeaturedEvent.location}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Event Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredEvents.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === featuredEventIndex ? "bg-white w-8" : "bg-white/50"
              }`}
              onClick={() => setFeaturedEventIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8 md:mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Mobile Categories Dropdown */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200"
            >
              <span>Filter by Category</span>
              <ChevronLeft
                className={`w-5 h-5 transform transition-transform ${
                  isMobileFiltersOpen ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
            {isMobileFiltersOpen && (
              <div className="mt-2 space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <category.icon className="w-5 h-5 mr-2" />
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Categories */}
          <div className="hidden md:flex gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${event.bgColor} opacity-75`}
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  {event.category.charAt(0).toUpperCase() +
                    event.category.slice(1)}
                </div>
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>

                <button className="mt-4 md:mt-6 w-full flex items-center justify-center px-4 py-2 bg-gray-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all group">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 md:py-20">
            <p className="text-xl md:text-2xl text-gray-400">
              No events found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
