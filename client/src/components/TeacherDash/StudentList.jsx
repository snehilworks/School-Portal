import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Hash,
  User,
  CreditCard,
  Calendar,
} from "lucide-react";

const StudentListContent = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const dummyStudents = [
    {
      id: 1,
      name: "John Doe",
      rollNumber: "001",
      payStatus: "Paid",
      lastPaymentDate: "2024-02-15",
      paymentAmount: "Rs.500",
      paymentDue: "2024-03-15",
      attendance: "95%",
      grade: "A",
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNumber: "002",
      payStatus: "Unpaid",
      lastPaymentDate: "2024-01-20",
      paymentAmount: "Rs.0",
      paymentDue: "2024-02-20",
      attendance: "78%",
      grade: "B",
    },
    {
      id: 3,
      name: "Alice Johnson",
      rollNumber: "003",
      payStatus: "Paid",
      lastPaymentDate: "2024-02-20",
      paymentAmount: "Rs.500",
      paymentDue: "2024-03-20",
      attendance: "100%",
      grade: "A+",
    },
    {
      id: 4,
      name: "Bob Brown",
      rollNumber: "004",
      payStatus: "Unpaid",
      lastPaymentDate: "2024-01-15",
      paymentAmount: "Rs.0",
      paymentDue: "2024-02-15",
      attendance: "85%",
      grade: "C",
    },
    {
      id: 5,
      name: "Emma Wilson",
      rollNumber: "005",
      payStatus: "Paid",
      lastPaymentDate: "2024-02-05",
      paymentAmount: "Rs.500",
      paymentDue: "2024-03-05",
      attendance: "92%",
      grade: "B+",
    },
    {
      id: 6,
      name: "Michael Davis",
      rollNumber: "006",
      payStatus: "Paid",
      lastPaymentDate: "2024-02-12",
      paymentAmount: "Rs.500",
      paymentDue: "2024-03-12",
      attendance: "98%",
      grade: "A",
    },
  ];

  useEffect(() => {
    setStudents(dummyStudents);
  }, []);

  const filteredStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || student.payStatus === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      // Handle date comparison separately
      if (sortField === "lastPaymentDate") {
        const dateA = new Date(a[sortField]);
        const dateB = new Date(b[sortField]);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }

      // Handle text fields
      const aValue = String(a[sortField]).toLowerCase();
      const bValue = String(b[sortField]).toLowerCase();
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowSidebar(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Unpaid":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "Unpaid":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div>
      <div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header section */}
          <div className="p-5 border-b border-gray-200 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Students</h1>
                <p className="text-gray-500 mt-1">
                  View all students and payment status
                </p>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-grow md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex space-x-2">
                  {["all", "Paid", "Unpaid"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        filterStatus === status
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {status === "all" ? "All" : status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Table section */}
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    {
                      label: "Student",
                      field: "name",
                      icon: <User className="w-4 h-4" />,
                    },
                    {
                      label: "Roll No",
                      field: "rollNumber",
                      icon: <Hash className="w-4 h-4" />,
                    },
                    {
                      label: "Payment Status",
                      field: "payStatus",
                      icon: <CreditCard className="w-4 h-4" />,
                    },
                    {
                      label: "Last Payment",
                      field: "lastPaymentDate",
                      icon: <Calendar className="w-4 h-4" />,
                    },
                    { label: "Details", field: null, icon: null },
                  ].map((header, index) => (
                    <th
                      key={index}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        header.field ? "cursor-pointer hover:bg-gray-100" : ""
                      }`}
                      onClick={() => header.field && handleSort(header.field)}
                    >
                      {header.field ? (
                        <div className="flex items-center gap-2">
                          {header.icon}
                          {header.label}
                          {header.field && (
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                sortField === header.field &&
                                sortDirection === "desc"
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {header.label}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {student.name
                                .split(" ")
                                .map((name) => name[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Grade: {student.grade}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {student.rollNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          Attendance: {student.attendance}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                              student.payStatus
                            )}`}
                          >
                            {getStatusIcon(student.payStatus)}
                            {student.payStatus}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Due: {student.paymentDue}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(
                            student.lastPaymentDate
                          ).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.paymentAmount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(student)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No students found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination section */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredStudents.length}</span> of{" "}
              <span className="font-medium">{students.length}</span> students
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Sidebar - Simplified */}
      {showSidebar && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Student Details
              </h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-medium text-blue-600">
                  {selectedStudent.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-gray-500">
                    Roll Number: {selectedStudent.rollNumber}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">
                      Payment Status
                    </span>
                    <div className="flex items-center mt-1">
                      <span
                        className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                          selectedStudent.payStatus
                        )}`}
                      >
                        {getStatusIcon(selectedStudent.payStatus)}
                        {selectedStudent.payStatus}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm text-gray-500">
                      Next Payment Due
                    </span>
                    <p className="font-medium text-gray-900">
                      {selectedStudent.paymentDue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Student Information
                  </h4>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">Attendance</dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">
                        {selectedStudent.attendance}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Grade</dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">
                        {selectedStudent.grade}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Payment Information
                  </h4>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Last Payment</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {new Date(
                          selectedStudent.lastPaymentDate
                        ).toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Amount</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedStudent.paymentAmount}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Next Due Date</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedStudent.paymentDue}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListContent;
