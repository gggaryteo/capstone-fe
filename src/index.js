import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

// Import Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import ErrorNotFound from "./Pages/ErrorNotFound/ErrorNotFound";
import AuthProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<App />}>
            {/* Note: render child route at the parent route level so all posts will be shown*/}
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
