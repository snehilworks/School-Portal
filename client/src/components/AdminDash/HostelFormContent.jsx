import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

// Custom icons to replace Lucide icons
const Icons = {
  Search: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  X: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  ChevronLeft: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  ),
  ChevronRight: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  ),
  Home: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  Calendar: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Phone: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  Utensils: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
      <path d="M7 2v20"></path>
      <path d="M21 15V2"></path>
      <path d="M18 15c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2s2 .9 2 2v2c0 1.1-.9 2-2 2z"></path>
    </svg>
  ),
  ClipboardCheck: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  ),
  ChevronDown: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  ChevronUp: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  ),
  Loader: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full animate-spin"
    >
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
  ),
  Notification: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  Filter: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  ),
  Download: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
};

const HostelFormContent = () => {
  const [hostelForms, setHostelForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFormId, setExpandedFormId] = useState(null);
  const [formToReview, setFormToReview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    roomType: "all",
    messOption: "all",
  });
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const fetchHostelForms = async (page) => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/admin/hostel-forms-preview`,
          {
            params: { page, limit: 20 },
          }
        );
        const { data, totalPages, currentPage } = response.data;
        setHostelForms(data);
        setFilteredForms(data);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching hostel forms:", error);
        setError("Failed to load hostel forms.");
      } finally {
        setLoading(false);
      }
    };
    fetchHostelForms(currentPage);
  }, [currentPage]);

  useEffect(() => {
    let filtered = [...hostelForms];

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter((form) =>
        form.studentName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      const isReviewed = filters.status === "reviewed";
      filtered = filtered.filter((form) => form.review === isReviewed);
    }

    // Apply room preference filter
    if (filters.roomType !== "all") {
      filtered = filtered.filter(
        (form) =>
          form.roomPreference.toLowerCase() === filters.roomType.toLowerCase()
      );
    }

    // Apply mess facilities filter
    if (filters.messOption !== "all") {
      filtered = filtered.filter(
        (form) =>
          form.messFacilities.toLowerCase() === filters.messOption.toLowerCase()
      );
    }

    setFilteredForms(filtered);
  }, [searchQuery, hostelForms, filters]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleReviewClick = (form) => {
    setFormToReview(form);
  };

  const handleConfirmReview = async () => {
    try {
      await axiosInstance.put(
        `/api/admin/hostel-form-reviewed/${formToReview._id}`
      );
      setHostelForms((prevForms) =>
        prevForms.map((form) =>
          form._id === formToReview._id ? { ...form, review: true } : form
        )
      );
      setFilteredForms((prevForms) =>
        prevForms.map((form) =>
          form._id === formToReview._id ? { ...form, review: true } : form
        )
      );
      setFormToReview(null);
    } catch (error) {
      console.error("Error marking form as reviewed:", error);
      setError("Failed to mark the form as reviewed.");
    }
  };

  const toggleExpandForm = (formId) => {
    setExpandedFormId((prevId) => (prevId === formId ? null : formId));
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const resetFilters = () => {
    setFilters({
      status: "all",
      roomType: "all",
      messOption: "all",
    });
    setFilterOpen(false);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger a CSV/Excel download
      alert("Export complete! File downloaded.");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-16 h-16 text-blue-600 mb-4">
          <Icons.Loader />
        </div>
        <p className="text-slate-600 font-medium">
          Loading hostel applications...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 max-w-lg">
          <p className="text-red-700 font-medium text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-6 h-6 text-blue-600 mr-2">
                <Icons.Home />
              </div>
              <span className="font-semibold text-xl text-slate-800">
                Campus Housing
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <div className="w-6 h-6">
                  <Icons.Notification />
                </div>
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </button>
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                AD
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Hostel Applications Dashboard
              </h1>
              <p className="text-slate-500 mt-1">
                Manage and process student accommodation requests efficiently
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={handleExport}
                className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm ${
                  isExporting
                    ? "bg-blue-100 text-blue-500"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                } transition-colors shadow-sm`}
                disabled={isExporting}
              >
                <div className="w-4 h-4 mr-2">
                  {isExporting ? <Icons.Loader /> : <Icons.Download />}
                </div>
                {isExporting ? "Exporting..." : "Export Data"}
              </button>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm ${
                  filterOpen
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                } transition-colors shadow-sm`}
              >
                <div className="w-4 h-4 mr-2">
                  <Icons.Filter />
                </div>
                Filters
                {(filters.status !== "all" ||
                  filters.roomType !== "all" ||
                  filters.messOption !== "all") && (
                  <span className="ml-2 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {(filters.status !== "all" ? 1 : 0) +
                      (filters.roomType !== "all" ? 1 : 0) +
                      (filters.messOption !== "all" ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-900">
                Filter Applications
              </h3>
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reset All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending Review</option>
                  <option value="reviewed">Reviewed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Room Type
                </label>
                <select
                  value={filters.roomType}
                  onChange={(e) =>
                    setFilters({ ...filters, roomType: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                >
                  <option value="all">All Room Types</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="triple">Triple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Mess Facilities
                </label>
                <select
                  value={filters.messOption}
                  onChange={(e) =>
                    setFilters({ ...filters, messOption: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                >
                  <option value="all">All Options</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="both">Both Options</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Applications
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {hostelForms.length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <div className="w-5 h-5 text-blue-600">
                  <Icons.ClipboardCheck />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                Updated today
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-amber-600 mt-1">
                  {hostelForms.filter((form) => !form.review).length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <div className="w-5 h-5 text-amber-600">
                  <Icons.Calendar />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-amber-500 h-1.5 rounded-full"
                  style={{
                    width: `${
                      100 -
                      (hostelForms.filter((form) => !form.review).length /
                        hostelForms.length) *
                        100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Reviewed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {hostelForms.filter((form) => form.review).length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <div className="w-5 h-5 text-green-600">
                  <Icons.ClipboardCheck />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-green-600 font-medium">
                {Math.round(
                  (hostelForms.filter((form) => form.review).length /
                    hostelForms.length) *
                    100
                )}
                % completion rate
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Average Response Time
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-1">18h</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <div className="w-5 h-5 text-purple-600">
                  <Icons.Clock />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-purple-600 font-medium">
                6h faster than previous month
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5">
              <Icons.Search />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name..."
              className="w-full pl-12 pr-12 py-3 bg-white rounded-xl shadow-sm border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-600"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 w-5 h-5"
              >
                <Icons.X />
              </button>
            )}
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredForms.length > 0 ? (
            filteredForms.map((form) => (
              <div
                key={form._id}
                className={`bg-white rounded-xl shadow-sm border ${
                  expandedFormId === form._id
                    ? "border-blue-200 ring-1 ring-blue-300"
                    : "border-slate-200"
                } overflow-hidden hover:shadow-md transition-all duration-200`}
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-medium mr-4">
                        {form.studentName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {form.studentName}
                        </h3>
                        <div className="flex items-center text-slate-500 text-sm mt-1">
                          <span className="mr-3">Class {form.class}</span>
                          <span className="flex items-center">
                            <div className="w-3 h-3 mr-1">
                              <Icons.Calendar />
                            </div>
                            {new Date(form.joiningDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {form.review ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-100">
                          <div className="w-4 h-4 mr-1">
                            <Icons.ClipboardCheck />
                          </div>
                          Reviewed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleReviewClick(form)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        >
                          Review Application
                        </button>
                      )}
                      <button
                        onClick={() => toggleExpandForm(form._id)}
                        className={`p-2 rounded-lg ${
                          expandedFormId === form._id
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        } transition-colors`}
                      >
                        <div className="w-5 h-5">
                          {expandedFormId === form._id ? (
                            <Icons.ChevronUp />
                          ) : (
                            <Icons.ChevronDown />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  {expandedFormId === form._id && (
                    <div className="mt-6 animate-fadeIn">
                      <div className="rounded-lg bg-slate-50 p-5 border border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 mb-3">
                              Student Information
                            </h4>
                            <div className="space-y-3">
                              <div className="flex">
                                <div className="w-32 text-slate-500 text-sm">
                                  Student ID
                                </div>
                                <div className="text-slate-900 text-sm font-medium">
                                  {form._id.substring(0, 8)}
                                </div>
                              </div>
                              <div className="flex">
                                <div className="w-32 text-slate-500 text-sm">
                                  Class
                                </div>
                                <div className="text-slate-900 text-sm font-medium">
                                  {form.class}
                                </div>
                              </div>
                              <div className="flex">
                                <div className="w-32 text-slate-500 text-sm">
                                  Joining Date
                                </div>
                                <div className="text-slate-900 text-sm font-medium">
                                  {new Date(
                                    form.joiningDate
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-slate-500 mb-3">
                              Accommodation Details
                            </h4>
                            <div className="space-y-3">
                              <div className="flex">
                                <div className="w-32 text-slate-500 text-sm">
                                  Room Preference
                                </div>
                                <div className="text-slate-900 text-sm font-medium">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                    {form.roomPreference}
                                  </span>
                                </div>
                              </div>
                              <div className="flex">
                                <div className="w-32 text-slate-500 text-sm">
                                  Mess Facilities
                                </div>
                                <div className="text-slate-900 text-sm font-medium">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                    {form.messFacilities}
                                  </span>
                                </div>
                              </div>
                              <div className="flex">
                                <div className="w-32 text-slate-500 text-sm">
                                  Status
                                </div>
                                <div className="text-slate-900 text-sm font-medium">
                                  {form.review ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                      Reviewed
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                      Pending
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-200">
                          <h4 className="text-sm font-medium text-slate-500 mb-3">
                            Contact Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center p-3 bg-white rounded-lg border border-slate-200">
                              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                                <div className="w-4 h-4 text-blue-600">
                                  <Icons.Phone />
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-slate-500">
                                  Parent Contact
                                </div>
                                <div className="text-sm font-medium text-slate-900">
                                  {form.parentContact}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center p-3 bg-white rounded-lg border border-slate-200">
                              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                                <div className="w-4 h-4 text-purple-600">
                                  <Icons.Home />
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-slate-500">
                                  Application Date
                                </div>
                                <div className="text-sm font-medium text-slate-900">
                                  {new Date().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {form.additionalNotes && (
                          <div className="mt-6 bg-white p-4 rounded-lg border border-slate-200">
                            <h4 className="font-medium text-slate-900 mb-2">
                              Additional Notes
                            </h4>
                            <p className="text-slate-600 text-sm whitespace-pre-line">
                              {form.additionalNotes}
                            </p>
                          </div>
                        )}

                        <div className="mt-6 flex justify-end space-x-3">
                          <button
                            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
                            onClick={() => toggleExpandForm(form._id)}
                          >
                            Close Details
                          </button>
                          {!form.review && (
                            <button
                              onClick={() => handleReviewClick(form)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                            >
                              Mark as Reviewed
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto text-slate-300 mb-4">
                <Icons.Search />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No applications found
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                No applications match your current search criteria. Try
                adjusting your filters or search terms.
              </p>
              {searchQuery ||
              filters.status !== "all" ||
              filters.roomType !== "all" ||
              filters.messOption !== "all" ? (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    resetFilters();
                  }}
                  className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  Clear All Filters
                </button>
              ) : null}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredForms.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200">
            <div className="text-sm text-slate-600 mb-4 sm:mb-0">
              Showing{" "}
              <span className="font-medium">{(currentPage - 1) * 20 + 1}</span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * 20, hostelForms.length)}
              </span>{" "}
              of <span className="font-medium">{hostelForms.length}</span>{" "}
              applications
            </div>
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 text-sm text-slate-700 bg-white rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                <div className="w-4 h-4 mr-1">
                  <Icons.ChevronLeft />
                </div>
                Previous
              </button>

              {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                // Logic to show correct page numbers around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 text-sm text-slate-700 bg-white rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                Next
                <div className="w-4 h-4 ml-1">
                  <Icons.ChevronRight />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {formToReview && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-slideIn">
              <div className="mb-1">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-blue-600">
                    <Icons.ClipboardCheck />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">
                  Mark as Reviewed
                </h3>
                <p className="text-slate-600 text-center text-sm mb-6">
                  You are about to mark{" "}
                  <span className="font-medium">
                    {formToReview.studentName}'s
                  </span>{" "}
                  application as reviewed. This will update the status in the
                  system.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-800 mb-2 text-sm">
                  Application Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3">
                    <div className="text-blue-600">Student:</div>
                    <div className="col-span-2 text-blue-900 font-medium">
                      {formToReview.studentName}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-blue-600">Class:</div>
                    <div className="col-span-2 text-blue-900 font-medium">
                      {formToReview.class}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-blue-600">Room:</div>
                    <div className="col-span-2 text-blue-900 font-medium">
                      {formToReview.roomPreference}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setFormToReview(null)}
                  className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReview}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add a missing Clock icon that was referenced but not defined
Icons.Clock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

// Add these CSS animations to your global CSS or within a style tag
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}
`;

export default HostelFormContent;
