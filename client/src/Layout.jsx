import React from "react";
import Appbar from "./components/Appbar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout-styling">
      <Appbar />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
