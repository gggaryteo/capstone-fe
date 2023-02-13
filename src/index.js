import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

// Import Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import ErrorNotFound from "./Pages/ErrorNotFound/ErrorNotFound";
import AuthProvider, { useAuth } from "./context/AuthContext";

const RootWrapper = () => {
  const { isAuth } = useAuth();
  console.log(isAuth);

  const routes = useMemo(
    () => (
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          {isAuth ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route path="/dashboard" element={<ErrorNotFound />} />
          )}
        </Route>
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    ),
    [isAuth]
  );

  return routes;
};

const Root = () => (
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RootWrapper />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root/>);
