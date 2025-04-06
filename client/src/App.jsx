import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";
import routes from "./routes";

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
