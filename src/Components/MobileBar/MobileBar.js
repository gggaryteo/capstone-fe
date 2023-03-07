import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MobileBar.css";
import { useAuth } from "../../context/AuthContext";
import {
  FaCommentDots,
  FaColumns,
  FaPeopleArrows,
  FaUserFriends,
  FaIdBadge,
} from "react-icons/fa";

const MobileBar = () => {
  const { loggedUser } = useAuth();
  const { username } = loggedUser || {};
  const userInitial = username.charAt(0).toUpperCase();

  return (
    <div className="mobile-container">
      <nav className="mobile-navbar">
        <NavLink className="menu-item" to="/main">
          <FaColumns className="icons" alt="dashboard-icon" />
          <span className="menu-item-label">Main</span>
        </NavLink>

        <NavLink className="menu-item" to="/chats">
          <FaCommentDots className="icons" alt="chat-icon" />
          <span className="menu-item-label">Chats</span>
        </NavLink>

        <NavLink className="menu-item" to="/meetups">
          <FaUserFriends className="icons" alt="meetup-icon" />
          <span className="menu-item-label">Meetups</span>
        </NavLink>

        <NavLink className="menu-item" to={`/profile/${username}`}>
          <FaIdBadge className="icons" alt="request-icon" />
          <span className="menu-item-label">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default MobileBar;
