import React from "react";
import Appbar from "./components/ui/Appbar/Appbar";

function Layout({ children }) {
  return (
    <div className="w-full min-h-[91.5vh] flex flex-col items-center">
      <Appbar />

      <div className="w-full">{children}</div>
    </div>
  );
}

export default Layout;
