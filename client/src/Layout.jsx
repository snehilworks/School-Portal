import React from "react";
import Appbar from "./components/ui/Appbar/Appbar";

function Layout({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-emerald-300">
      <Appbar />

      <div className="w-full">{children}</div>
    </div>
  );
}

export default Layout;
