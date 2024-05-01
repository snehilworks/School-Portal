import React from "react";
import Appbar from "./components/ui/Appbar/Appbar";

function Layout({ children }) {
  return (
    <div className="w-full min-h-screen h-full ">
      <Appbar />

      <div className="w-full h-full pt-[64px]">{children}</div>
    </div>
  );
}

export default Layout;
