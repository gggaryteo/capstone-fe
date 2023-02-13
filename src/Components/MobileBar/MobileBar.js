import React from "react";
import { NavLink } from "react-router-dom";
import "./MobileBar.css";
import { useAuth } from "../../context/AuthContext";
import {
  FaCommentDots,
  FaColumns,
  FaPeopleArrows,
  FaUserFriends,
} from "react-icons/fa";

const MobileBar = () => {
  const { loggedUser } = useAuth();
  const { username } = loggedUser || {};
  const userInitial = username.charAt(0).toUpperCase();

  return (
    <div className="mobile-navbar">
      <div className="center">
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/main">
                <FaColumns fill="true" className="icons" alt="dashboard-icon" />
                <span>Main</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/chats">
                <FaCommentDots fill="true" className="icons" alt="chat-icon" />
                <span>Chats</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/meetups">
                <FaUserFriends
                  fill="true"
                  className="icons"
                  alt="meetup-icon"
                />
                <span>Meetups</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/requests">
                <FaPeopleArrows
                  fill="true"
                  className="icons"
                  alt="request-icon"
                />
                <span>Requests</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileBar;
