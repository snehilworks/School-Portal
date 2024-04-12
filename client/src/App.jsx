import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Appbar from "./components/Appbar";
import Layout from "./layout";
import routes from "./routes";

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
