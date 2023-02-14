// styles and images
import "./AuthNavbar.css";
import ProjectLogo from "../../assets/colorlogo2.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userLogout from "../../services/userLogout";
import { useAuth } from "../../context/AuthContext";

export default function AuthNavbar() {
  const navigate = useNavigate();
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedUser, setAuthState} = useAuth();

  const handleLogout = async () => {
    setError(null);
    setIsLoading(true);

    // Log the user out
    try {
      await setAuthState(userLogout);
      navigate('/');
      setIsLoading(false);

      if (!isCancelled) {
        //update states
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={ProjectLogo} alt="project-logo" />
        </li>

        {!loggedUser && (
          <>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/">Signup</Link>
            </li>
          </>
        )}

        {loggedUser && (
          <>
            {!isLoading && (
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            )}
            {isLoading && (
              <button className="btn" onClick={handleLogout} disabled>
                Logging Out
              </button>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
