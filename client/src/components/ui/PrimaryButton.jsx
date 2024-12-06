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
    buttonColorClasses = "bg-teal-700 text-white";
    hoverColorClasses = "hover:bg-teal-800";
  } else if (color === "teacher") {
    buttonColorClasses = "bg-cyan-300 text-black";
    hoverColorClasses = "hover:bg-cyan-400";
  } else if (color === "logout") {
    buttonColorClasses = "bg-red-500 text-white";
    hoverColorClasses = "hover:bg-red-600";
  } else if (color === "fee-structure") {
    buttonColorClasses = "bg-blue-900 text-white";
    hoverColorClasses = "hover:bg-black";
  } else {
    buttonColorClasses = "bg-sky-800 text-white";
    hoverColorClasses = "hover:bg-sky-900";
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-lg lg:text-xl z-10 px-4 py-1 flex items-center justify-center gap-2 rounded-lg shadow-md transition-transform transform hover:scale-105 ${buttonColorClasses} ${hoverColorClasses} ${className}`}
      style={{ ...extra_styles }}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
