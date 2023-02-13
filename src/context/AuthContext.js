import { createContext, useEffect, useContext, useState } from "react";
import React from "react";
import getUser from "../services/getUser";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const loggedIn = JSON.parse(localStorage.getItem("loggedUser"));

const authState = {
  headers: null,
  isAuth: false,
  loggedUser: {
    email: "",
    username: "",
    profilepic: null,
    biography: null,
    token: "",
  },
};

export default function AuthProvider({ children }) {
  const [{ headers, isAuth, loggedUser }, setAuthState] = useState(
    loggedIn || authState
  );

  useEffect(() => {
    if (!headers) return;

    getUser({ headers })
      .then((loggedUser) =>
        setAuthState((prevState) => ({ ...prevState, loggedUser }))
      )
      .catch(console.error);
  }, [headers, setAuthState]);

  return (
    <AuthContext.Provider value={{ headers, isAuth, loggedUser, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
