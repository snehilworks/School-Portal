import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Copy, Check, Home, Share2, MessageCircle } from "lucide-react";

const PaymentCompletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId } = location.state || {};
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleGoBackHome = () => {
    navigate("/");
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
        showNotification(
          "✅ Payment ID copied! Keep it safe for your records."
        );
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        showNotification("Failed to copy to clipboard");
      }
    }
  };

  const shareToWhatsApp = () => {
    const shareText = `Hello Teacher,\n\nI've completed my school fee payment. Here's my payment confirmation:\n\nPayment ID: ${paymentId}\n\nPlease let me know if you need any additional information.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, "_blank");
  };

  const sharePaymentId = async () => {
    const shareText = `Payment ID: ${paymentId}\n\nThis is my payment confirmation for school fees.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Payment Confirmation",
          text: shareText,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          await navigator.clipboard.writeText(shareText);
          showNotification(
            "Text copied! You can now paste it in your preferred app"
          );
        }
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      showNotification(
        "Text copied! You can now paste it in your preferred app"
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-400 to-teal-700">
      <div className="absolute inset-0 overflow-y-auto pt-20 pb-16">
        <div className="flex min-h-full flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl text-center text-white">
            {/* Success Animation */}
            <div className="mb-8 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-white shadow-lg sm:h-28 sm:w-28 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-14 w-14 text-teal-600 sm:h-16 sm:w-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>

            {/* Main Content */}
            <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
              Payment Successful! 🎉
            </h1>
            <p className="mb-6 text-base sm:text-lg">
              Great job! Your school fee payment has been processed
              successfully.
            </p>

            <div className="flex flex-col lg:flex-row lg:gap-3">
              <div className="flex-1">
                {/* Important Instructions */}
                <div className="mb-6 rounded-xl bg-white bg-opacity-20 p-4 text-left backdrop-blur-sm">
                  <h2 className="mb-2 text-lg font-bold">
                    📝 Important Steps:
                  </h2>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>
                      Copy your Payment ID (you'll need this for reference)
                    </li>
                    <li>
                      Share it with your teacher via WhatsApp or other apps
                    </li>
                    <li>Keep the ID safe for your records</li>
                  </ol>
                </div>

                {/* Payment ID Card */}
                {paymentId && (
                  <div className="mb-8 transform rounded-xl border-2 border-white border-opacity-20 bg-white bg-opacity-10 p-4 backdrop-blur-sm transition-transform hover:scale-105 sm:p-6">
                    <div className="mb-4 flex items-center justify-center gap-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400"></div>
                      <p className="text-sm font-semibold text-yellow-400">
                        IMPORTANT: Save this Payment ID
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <code className="break-all rounded-lg bg-white bg-opacity-20 px-4 py-3 text-base font-mono sm:px-6 sm:text-lg">
                        {paymentId}
                      </code>
                      <button
                        onClick={copyToClipboard}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-semibold text-teal-600 transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        {copied ? (
                          <>
                            <Check className="h-5 w-5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-5 w-5" />
                            Copy Payment ID
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Back to Home */}
                <button
                  onClick={handleGoBackHome}
                  className="mx-auto flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <Home className="h-5 w-5" />
                  Back to Home
                </button>
              </div>

              {/* Sharing Options - Right Side on Desktop */}
              <div className="top-20 bottom-20">
                <div className="sticky top-24 mt-8 space-y-4 lg:mt-0">
                  <h3 className="text-sm font-semibold">
                    Share with your teacher via:
                  </h3>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={shareToWhatsApp}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Share on WhatsApp
                    </button>
                    <button
                      onClick={sharePaymentId}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-teal-600 shadow-lg transition-all hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <Share2 className="h-5 w-5" />
                      Share via Other Apps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform rounded-full bg-white px-6 py-3 text-teal-800 shadow-xl">
          {toastMessage}
        </div>
      )}

      {/* Footer */}
      <div className="fixed bottom-4 left-0 right-0 text-center text-sm text-teal-100">
        Need help? Contact our{" "}
        <a
          href="mailto:support@example.com"
          className="underline transition-colors hover:text-white"
        >
          support team
        </a>
      </div>
    </div>
  );
};

export default PaymentCompletion;
