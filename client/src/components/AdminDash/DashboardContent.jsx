import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const DashboardContent = () => {
  // State management
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [admissionCount, setAdmissionCount] = useState("");
  const [events, setEvents] = useState([
    {
      title: "Parent-Teacher Meeting",
      date: "10th March 2025",
      description:
        "Annual meeting to discuss student progress and academic plans",
    },
  ]);
  const [announcements, setAnnouncements] = useState([
    {
      title: "Academic Calendar Updated",
      date: "2 days ago",
      content: "The academic calendar for the next semester has been updated.",
    },
    {
      title: "Staff Development Day",
      date: "1 week ago",
      content:
        "Reminder: Staff development training on pedagogy and learning outcomes.",
    },
  ]);
  const [admissionCounts, setAdmissionCounts] = useState([
    { class: "Class 1", count: 45 },
    { class: "Class 2", count: 52 },
    { class: "Class 3", count: 48 },
  ]);

  // API calls
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dashboardRes] = await Promise.all([
        axiosInstance.get("/api/admin/dashboard-details"),
        // axios.get("/api/admin/events"),
        // axios.get("/api/admin/announcements"),
        // axios.get("/api/admin/admissions"),
      ]);

      setTeacherCount(dashboardRes.data.totalTeachers);
      setStudentCount(dashboardRes.data.totalStudents);
      // setEvents(eventsRes.data);
      // setAnnouncements(announcementsRes.data);
      // setAdmissionCounts(admissionsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Form handlers
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (eventTitle && eventDate) {
      const newEvent = {
        title: eventTitle,
        date: eventDate,
        description: eventDescription || "",
      };
      setEvents([...events, newEvent]);
      setEventTitle("");
      setEventDate("");
      setEventDescription("");
      setShowEventForm(false);
      // saveEvent(newEvent);
    }
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (announcementTitle && announcementContent) {
      const newAnnouncement = {
        title: announcementTitle,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        content: announcementContent,
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      setAnnouncementTitle("");
      setAnnouncementContent("");
      setShowAnnouncementForm(false);
      // saveAnnouncement(newAnnouncement);
    }
  };

  const handleAddAdmission = (e) => {
    e.preventDefault();
    if (classLevel && admissionCount) {
      const newAdmission = {
        class: classLevel,
        count: parseInt(admissionCount),
      };
      setAdmissionCounts([...admissionCounts, newAdmission]);
      setClassLevel("");
      setAdmissionCount("");
      setShowAdmissionForm(false);
      // saveAdmissionCount(newAdmission);
    }
  };

  // Total admission count
  const totalAdmissions = admissionCounts.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Administrative Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor key metrics and manage school operations
          </p>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Student Enrollment Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Student Enrollment
                    </dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">
                        {studentCount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-900"
                >
                  View student registry
                </a>
              </div>
            </div>
          </div>

          {/* Faculty Members Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Faculty Members
                    </dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">
                        {teacherCount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-900"
                >
                  View faculty directory
                </a>
              </div>
            </div>
          </div>

          {/* Total Admissions Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Admissions
                    </dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">
                        {totalAdmissions}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button
                  onClick={() => setShowAdmissionForm(!showAdmissionForm)}
                  className="font-medium text-green-600 hover:text-green-900"
                >
                  Update admission data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Admission Form (when shown) */}
        {showAdmissionForm && (
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Update Class Admissions
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Enter new admission data for specific class levels.
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleAddAdmission}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="class-level"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Class
                    </label>
                    <select
                      id="class-level"
                      name="class-level"
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={classLevel}
                      onChange={(e) => setClassLevel(e.target.value)}
                      required
                    >
                      <option value="">Select class</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="admission-count"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Available Seats Now
                    </label>
                    <input
                      type="number"
                      name="admission-count"
                      id="admission-count"
                      className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={admissionCount}
                      onChange={(e) => setAdmissionCount(e.target.value)}
                      required
                      min="0"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setShowAdmissionForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Class Admission Data */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 bg-emerald-600">
          <h3 className="text-lg leading-6 font-medium text-white">
            Class Admission Counts
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {admissionCounts.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">
                    {item.class}
                  </h4>
                  <p className="mt-1 text-xl font-semibold text-gray-900">
                    {item.count} students
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event and Announcement Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-red-600">
            <div className="flex justify-between">
              <h3 className="text-lg leading-6 font-medium text-white">
                Upcoming Events
              </h3>
              <button
                onClick={() => setShowEventForm(!showEventForm)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
              >
                Add Event
              </button>
            </div>
          </div>

          {/* Add Event Form */}
          {showEventForm && (
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <form onSubmit={handleAddEvent}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="event-title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Event Title
                    </label>
                    <input
                      type="text"
                      name="event-title"
                      id="event-title"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="event-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="event-date"
                      id="event-date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                  >
                    Save Event
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setShowEventForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {events.map((event, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {event.title}
                      </p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                </li>
              ))}
              {events.length === 0 && (
                <li className="px-4 py-5 sm:px-6 text-center text-sm text-gray-500">
                  No upcoming events
                </li>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <button
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => console.log("View all events")}
            >
              View All Events
            </button>
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-blue-600">
            <h3 className="text-lg leading-6 font-medium text-white">
              Recent Announcements
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {announcements.map((announcement, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {announcement.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {announcement.date}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              {announcements.length === 0 && (
                <li className="px-4 py-5 sm:px-6 text-center text-sm text-gray-500">
                  No recent announcements
                </li>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <button
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => console.log("View all announcements")}
            >
              View All Announcements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
