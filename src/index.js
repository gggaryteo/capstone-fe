import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

// Import Pages
import Home from "./Pages/Home/Home";
import ErrorNotFound from "./Pages/ErrorNotFound/ErrorNotFound";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Main from "./Pages/Main/Main";
import Chats from "./Pages/Chats/Chats";
import Meetups from "./Pages/Meetups/Meetups";
import Requests from "./Pages/Requests/Requests";
import Profile from "./Pages/Profile/Profile";

const RootWrapper = () => {
  const { isAuth } = useAuth();
  console.log(isAuth);

  const routes = useMemo(
    () => (
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          {isAuth ? (
            <>
              <Route path="/main" element={<Main />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/meetups" element={<Meetups />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/profile/:username" element={<Profile />} />
            </>
          ) : (
            <Route path="/" element={<ErrorNotFound />} />
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
