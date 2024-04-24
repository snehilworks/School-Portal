import React from "react";
import Appbar from "./components/ui/Appbar/Appbar";

function Layout({ children }) {
  return (
    <div className="w-full min-h-screen h-full bg-white flex flex-col items-center">
      <Appbar />

      <div className="w-full h-full flex-1">{children}</div>
    </div>
  );
}

export default Layout;
