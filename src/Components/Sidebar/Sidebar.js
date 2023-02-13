import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useAuth } from "../../context/AuthContext";
import {
  FaCommentDots,
  FaColumns,
  FaPeopleArrows,
  FaUserFriends,
} from "react-icons/fa";
import DropdownMenu from "../Dropdown/DropdownMenu";

const Sidebar = () => {
  const { loggedUser } = useAuth();
  const { username } = loggedUser || {};
  const userInitial = username.charAt(0).toUpperCase();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <DropdownMenu src={loggedUser.profilepic}>
            {userInitial}
          </DropdownMenu>
          <p> Hello {loggedUser.username}! </p>
        </div>
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

export default Sidebar;
