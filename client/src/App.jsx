import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Appbar from "./components/Appbar";
import Layout from "./Layout";
import routes from "./routes";

function App() {
  return (
    <Router>
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
