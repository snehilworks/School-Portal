import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl text-red-500 font-extrabold mb-4">404</h1>
        <h2 className="text-2xl text-gray-800 font-semibold mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Go back to Home Page
        </Link>
      </div>
      <div className="mt-8 text-gray-600 text-sm">
        <p>
          Need help? Contact support{" "}
          <a href="mailto:support@example.com">support@example.com</a>
        </p>
        <p>
          Or try searching <Link to="/search">here</Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
