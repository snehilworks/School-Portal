import React from "react";
import Appbar from "./components/ui/Appbar/Appbar";

function Layout({ children }) {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Appbar />

      <div className="w-full h-full">{children}</div>
    </div>
  );
}

export default Layout;
