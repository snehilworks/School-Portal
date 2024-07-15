import React from "react";

const PrimaryButton = ({
  variant,
  children,
  color,
  extra_styles,
  onClick,
  className,
  disabled = false,
}) => {
  let buttonColorClasses = "";
  let hoverColorClasses = "";

  // Determine background and text colors based on the 'color' prop
  if (color === "admin") {
    buttonColorClasses = "bg-gray-800 text-white";
    hoverColorClasses = "hover:bg-gray-700";
  } else if (color === "student") {
    buttonColorClasses = "bg-green-600 text-white";
    hoverColorClasses = "hover:bg-green-700";
  } else if (color === "teacher") {
    buttonColorClasses = "bg-cyan-500 text-white";
    hoverColorClasses = "hover:bg-cyan-600";
  } else if (color === "logout") {
    buttonColorClasses = "bg-red-500 text-white";
    hoverColorClasses = "hover:bg-red-600";
  } else {
    buttonColorClasses = "bg-blue-900 text-white";
    hoverColorClasses = "hover:bg-blue-800";
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-lg lg:text-xl px-6 py-3 flex items-center justify-center gap-2 rounded-lg shadow-md transition-transform transform hover:scale-105 ${buttonColorClasses} ${hoverColorClasses} ${className}`}
      style={{ ...extra_styles }}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
