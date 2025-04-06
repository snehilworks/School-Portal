import React, { useState, useEffect } from "react";
import {
  School,
  AlertCircle,
  X,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Info,
  IndianRupee,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const FeeForm = () => {
  const [classes, setClasses] = useState([]);
  const [feeData, setFeeData] = useState({
    name: "",
    description: "",
    amount: 0,
    currency: "INR",
    type: "Annual",
    selectedClass: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedClassName, setSelectedClassName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axiosInstance.get(`/api/admin/classes`);
      setClasses(response.data);
    } catch (error) {
      setError("Failed to fetch classes. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeeData({ ...feeData, [name]: value });
    if (name === "selectedClass") {
      const className =
        classes.find((cls) => cls._id === value)?.className || "";
      setSelectedClassName(className);
    }
  };

  const handleSubmitInitial = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/admin/set-fees`,
        {
          class: feeData.selectedClass,
          amount: feeData.amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setShowConfirmModal(false);
        setTimeout(() => setSubmitted(false), 5000);
        setFeeData({ ...feeData, amount: 0, selectedClass: "" });
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to set fees for classes"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <IndianRupee className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
          <p className="mt-2 text-gray-600">
            Set and update annual fees for classes
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmitInitial} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <School className="w-4 h-4 mr-2" />
                Select Class
              </label>
              <select
                name="selectedClass"
                value={feeData.selectedClass}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                required
              >
                <option value="">Choose a class...</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.className}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <IndianRupee className="w-4 h-4 mr-2" />
                Amount
              </label>
              <div className="relative">
                <input
                  name="amount"
                  type="number"
                  min="0"
                  value={feeData.amount}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  INR
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Update Fees
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
            <p className="text-green-700">
              Fees have been successfully updated for {selectedClassName}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError("")}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                  <Info className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Confirm Fee Update
                </h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to update the annual fees for{" "}
                  <span className="font-medium text-gray-900">
                    {selectedClassName}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-gray-900">
                    Rs. {feeData.amount}
                  </span>
                  ?
                </p>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Confirm Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeForm;

// import React, { useState, useEffect } from "react";
// import {
//   School,
//   AlertCircle,
//   X,
//   CheckCircle2,
//   Loader2,
//   ArrowRight,
//   Info,
//   IndianRupee,
//   Lock,
//   Eye,
//   EyeOff,
//   ShieldCheck,
//   CreditCard,
//   Calendar,
// } from "lucide-react";
// import axiosInstance from "../../utils/axiosInstance";

// const FeeForm = () => {
//   const [classes, setClasses] = useState([]);
//   const [feeData, setFeeData] = useState({
//     name: "",
//     description: "",
//     amount: 0,
//     currency: "INR",
//     type: "Annual",
//     selectedClass: "",
//   });
//   const [adminKey, setAdminKey] = useState("");
//   const [showAdminKey, setShowAdminKey] = useState(false);
//   const [adminKeyError, setAdminKeyError] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [selectedClassName, setSelectedClassName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [keyValidated, setKeyValidated] = useState(false);

//   // Simulated admin key - In a real app, this would be verified on the server side
//   const ADMIN_SECRET_KEY = "ADM_2025_FEE";

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.get(`/api/admin/classes`);
//       setClasses(response.data);
//     } catch (error) {
//       setError("Failed to fetch classes. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFeeData({ ...feeData, [name]: value });
//     if (name === "selectedClass") {
//       const className =
//         classes.find((cls) => cls._id === value)?.className || "";
//       setSelectedClassName(className);
//     }
//   };

//   const handleKeyChange = (e) => {
//     setAdminKey(e.target.value);
//     setAdminKeyError("");
//   };

//   const validateAdminKey = () => {
//     if (adminKey === ADMIN_SECRET_KEY) {
//       setKeyValidated(true);
//       setAdminKeyError("");
//       return true;
//     } else {
//       setAdminKeyError("Invalid admin key. Please check and try again.");
//       return false;
//     }
//   };

//   const handleSubmitInitial = (e) => {
//     e.preventDefault();

//     // Validate admin key first
//     if (!keyValidated && !validateAdminKey()) {
//       return;
//     }

//     setShowConfirmModal(true);
//   };

//   const handleConfirmSubmit = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.post(
//         `/api/admin/set-fees`,
//         {
//           class: feeData.selectedClass,
//           amount: feeData.amount,
//           adminKey: adminKey,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         setSubmitted(true);
//         setShowConfirmModal(false);
//         setTimeout(() => setSubmitted(false), 5000);
//         setFeeData({ ...feeData, amount: 0, selectedClass: "" });
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.message || "Failed to set fees for classes"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] bg-gradient-to-b from-gray-50 to-gray-100 py-3 px-2 sm:px-2 lg:px-2">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <div className="p-4 bg-indigo-100 rounded-full shadow-md">
//               <CreditCard className="w-10 h-10 text-indigo-600" />
//             </div>
//           </div>
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
//             Fee Management
//           </h1>
//           <p className="mt-3 text-xl text-gray-600">
//             Set and update annual fees for classes
//           </p>
//         </div>

//         {/* Main Form */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           <div className="border-b border-gray-200 pb-5 mb-6">
//             <div className="flex items-center">
//               <Lock className="w-5 h-5 text-indigo-500 mr-2" />
//               <h2 className="text-lg font-medium text-gray-900">
//                 Admin Authentication Required
//               </h2>
//             </div>
//             <p className="mt-1 text-sm text-gray-500">
//               Please enter your admin key to authorize fee updates
//             </p>
//           </div>

//           {/* Admin Key Section */}
//           <div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
//             <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//               <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" />
//               Admin Security Key
//             </label>
//             <div className="relative">
//               <input
//                 type={showAdminKey ? "text" : "password"}
//                 value={adminKey}
//                 onChange={handleKeyChange}
//                 className={`block w-full px-4 py-3 pr-10 bg-white border ${
//                   adminKeyError
//                     ? "border-red-300 focus:ring-red-500 focus:border-red-500"
//                     : keyValidated
//                     ? "border-green-300 focus:ring-green-500 focus:border-green-500"
//                     : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
//                 } rounded-xl transition-colors text-gray-900`}
//                 placeholder="Enter admin key"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowAdminKey(!showAdminKey)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               >
//                 {showAdminKey ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//             {adminKeyError && (
//               <p className="mt-2 text-sm text-red-600 flex items-center">
//                 <AlertCircle className="w-4 h-4 mr-1" /> {adminKeyError}
//               </p>
//             )}
//             {keyValidated && (
//               <p className="mt-2 text-sm text-green-600 flex items-center">
//                 <CheckCircle2 className="w-4 h-4 mr-1" /> Admin key verified
//               </p>
//             )}
//             {!keyValidated && !adminKeyError && (
//               <p className="mt-2 text-sm text-gray-500 italic">
//                 This key is required for security purposes
//               </p>
//             )}
//           </div>

//           <form onSubmit={handleSubmitInitial} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                   <School className="w-4 h-4 mr-2 text-indigo-500" />
//                   Select Class
//                 </label>
//                 <select
//                   name="selectedClass"
//                   value={feeData.selectedClass}
//                   onChange={handleInputChange}
//                   className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
//                   required
//                   disabled={!keyValidated}
//                 >
//                   <option value="">Choose a class...</option>
//                   {classes.map((cls) => (
//                     <option key={cls._id} value={cls._id}>
//                       {cls.className}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                   <IndianRupee className="w-4 h-4 mr-2 text-indigo-500" />
//                   Fee Amount
//                 </label>
//                 <div className="relative">
//                   <input
//                     name="amount"
//                     type="number"
//                     min="0"
//                     value={feeData.amount}
//                     onChange={handleInputChange}
//                     className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
//                     required
//                     disabled={!keyValidated}
//                   />
//                   <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
//                     INR
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                 <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
//                 Fee Type
//               </label>
//               <select
//                 name="type"
//                 value={feeData.type}
//                 onChange={handleInputChange}
//                 className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
//                 disabled={!keyValidated}
//               >
//                 <option value="Annual">Annual Fee</option>
//                 <option value="Term">Term Fee</option>
//                 <option value="Monthly">Monthly Fee</option>
//                 <option value="OneTime">One-time Fee</option>
//               </select>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={!keyValidated || isLoading}
//                 className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white ${
//                   keyValidated
//                     ? "bg-indigo-600 hover:bg-indigo-700"
//                     : "bg-gray-400 cursor-not-allowed"
//                 } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md`}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 w-5 h-5 animate-spin" />
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     Update Fees
//                     <ArrowRight className="ml-2 w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Success Message */}
//         {submitted && (
//           <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 flex items-center shadow-sm animate-fade-in">
//             <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
//             <div>
//               <p className="text-green-800 font-medium">
//                 Fee Updated Successfully
//               </p>
//               <p className="text-green-700 text-sm">
//                 {selectedClassName}'s fee has been set to ₹{feeData.amount} (
//                 {feeData.type})
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200 flex items-start shadow-sm">
//             <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
//             <p className="text-red-700 flex-1">{error}</p>
//             <button
//               onClick={() => setError("")}
//               className="ml-auto text-red-400 hover:text-red-600 p-1"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         )}

//         {/* Confirmation Modal */}
//         {showConfirmModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-scale-in">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <div className="text-center mb-6">
//                 <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-yellow-100 mb-4">
//                   <Info className="h-7 w-7 text-yellow-600" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   Confirm Fee Update
//                 </h3>
//                 <div className="text-sm text-gray-600 space-y-2">
//                   <p>
//                     You are about to update the fee for the following class:
//                   </p>
//                   <div className="p-3 bg-gray-50 rounded-lg">
//                     <p className="font-medium text-gray-900 text-lg">
//                       {selectedClassName}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3 mt-3">
//                     <div className="p-3 bg-gray-50 rounded-lg">
//                       <p className="text-gray-500 text-xs">New Fee Amount</p>
//                       <p className="font-medium text-gray-900">
//                         ₹{feeData.amount}
//                       </p>
//                     </div>
//                     <div className="p-3 bg-gray-50 rounded-lg">
//                       <p className="text-gray-500 text-xs">Fee Type</p>
//                       <p className="font-medium text-gray-900">
//                         {feeData.type}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowConfirmModal(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirmSubmit}
//                   disabled={isLoading}
//                   className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 shadow-sm"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Updating...
//                     </>
//                   ) : (
//                     "Confirm Update"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeeForm;
