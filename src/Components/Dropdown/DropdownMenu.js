// import styles
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import userLogout from "../../services/userLogout";
import { Link } from "react-router-dom";

function DropdownMenu() {
  const { loggedUser, setAuthState } = useAuth();
  const { username, profilepic } = loggedUser || {};

  // for dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuthState(userLogout)
  };

  const userInitial = username.charAt(0).toUpperCase();

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: "70px" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          style={{ marginRight: "70px" }}
        >
          <Avatar
            sx={{ width: 45, height: 42 }}
            src={profilepic}
            style={{
              borderRadius: "50%",
              border: "4px solid transparent",
              overflow: "hidden",
            }}
          >
            {userInitial}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar>
            {userInitial}
          </Avatar>
          <Link to={`/profile/${username}`} style={{ textDecoration: "none" }}>
            Profile
          </Link>
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Link to="/editprofile" style={{ textDecoration: "none" }}>
            Settings
          </Link>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Link to="/" onClick={handleLogout} style={{ textDecoration: "none" }}>
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}

export default DropdownMenu;
