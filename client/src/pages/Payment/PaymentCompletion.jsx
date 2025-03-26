import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import {
  Copy,
  Check,
  Home,
  Share2,
  MessageCircle,
  Download,
  Printer,
  ArrowRight,
  Shield,
} from "lucide-react";
import downloadReceipt from "../../components/DownloadReceipt";

const PaymentCompletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId } = location.state || {};
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Mock data - in real app would come from payment response
  const paymentDetails = {
    amount: "₹20,000",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    type: "Hostel Fees",
    status: "Success",
    method: "Online Payment",
  };

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const copyToClipboard = async () => {
    if (paymentId) {
      try {
        await navigator.clipboard.writeText(paymentId);
        setCopied(true);
        showNotification("Payment ID copied successfully!");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        showNotification("Failed to copy payment ID");
      }
    }
  };

  const shareToWhatsApp = () => {
    const shareText = `Hello,\n\nI've completed my hostel fee payment.\n\nAmount: ${paymentDetails.amount}\nPayment ID: ${paymentId}\nDate: ${paymentDetails.date}\n\nThank you.`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const handleDownloadReceipt = () => {
    try {
      const fileName = downloadReceipt(paymentDetails, paymentId);
      showNotification(`Receipt downloaded: ${fileName}`);
    } catch (error) {
      console.error("Error generating receipt:", error);
      showNotification("Failed to download receipt. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Banner */}
      <div className="bg-teal-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block bg-white rounded-full p-4">
            <Check className="h-12 w-12 text-teal-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl opacity-90">
            Your hostel registration is now complete
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Payment Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
              <p className="text-2xl font-bold text-gray-900">
                {paymentDetails.amount}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Payment Date</p>
              <p className="text-lg font-medium text-gray-900">
                {paymentDetails.date}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Payment Status</p>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                <p className="text-lg font-medium text-gray-900">Successful</p>
              </div>
            </div>
          </div>

          {/* Payment ID Section */}
          <div className="border-t border-b py-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Payment ID (Save for reference)
                </p>
                <code className="text-lg font-mono bg-gray-50 px-4 py-2 rounded">
                  {paymentId}
                </code>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
                {copied ? "Copied!" : "Copy ID"}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <button
                onClick={handleDownloadReceipt}
                className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Download className="h-5 w-5" />
                Download Receipt
              </button>
              <button
                onClick={() => window.print()}
                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Printer className="h-5 w-5" />
                Print Receipt
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={shareToWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Share via WhatsApp
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Home className="h-5 w-5" />
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 font-medium">1</span>
              </div>
              <div>
                <h3 className="font-medium">Save Payment ID</h3>
                <p className="text-gray-600">
                  Keep your payment ID safe for future reference
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 font-medium">2</span>
              </div>
              <div>
                <h3 className="font-medium">Share Confirmation</h3>
                <p className="text-gray-600">
                  Share payment confirmation with your teacher
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 font-medium">3</span>
              </div>
              <div>
                <h3 className="font-medium">Download Receipt</h3>
                <p className="text-gray-600">
                  Download or print the receipt for your records
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 flex items-center justify-between">
          <div>
            <h3 className="font-medium mb-1">Need Help?</h3>
            <p className="text-gray-600">
              Contact our support team for assistance
            </p>
          </div>
          <a
            href="mailto:support@example.com"
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
          >
            Contact Support
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default PaymentCompletion;
