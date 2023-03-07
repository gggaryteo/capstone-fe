import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import updateUser from "../../services/updateUser";
import { ArrowBackIos } from "@mui/icons-material";
import { Link } from "react-router-dom";

import "./EditProfileForm.css";

const EditProfileForm = () => {
  const { headers, isAuth, loggedUser, setAuthState } = useAuth();
  const [
    { biography, email, profilepic, password, username, location },
    setForm,
  ] = useState({
    biography: loggedUser.biography || "",
    email: loggedUser.email,
    profilepic: loggedUser.profilepic || "",
    password: loggedUser.password || "",
    username: loggedUser.username,
    location: loggedUser.location,
  });

  const [inactive, setInactive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, loggedUser, navigate]);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
    setInactive(false);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (inactive) return;

    const updatedUser = { biography, email, profilepic, username, location };

    if (password) {
      updatedUser.password = password;
    } else {
      delete updatedUser.password;
    }

    updateUser({
      headers,
      biography,
      email,
      profilepic,
      password,
      username,
      location,
    })
      .then(setAuthState)
      .catch(console.error);
    setInactive(true);
  };

  return (
    isAuth && (
      <form className="settings-form" onSubmit={formSubmit}>
        <Link className="back-icon" to={`/profile/${username}`}>
          🔙
        </Link>
        {/* <label>
          <span>Profile URL:</span>
          <input
            name="profilepic"
            required
            value={profilepic}
            onChange={inputHandler}
          />
        </label> */}

        <label className="label-form">
          <span>Your Username:</span>
          <input
            name="username"
            required
            value={username}
            onChange={inputHandler}
          />
        </label>

        <label className="label-form">
          <span>About yourself:</span>
          <textarea
            name="biography"
            required
            rows="8"
            value={biography}
            onChange={inputHandler}
          ></textarea>
        </label>

        <label className="label-form">
          <span>Update Email:</span>
          <input name="email" required value={email} onChange={inputHandler} />
        </label>

        <label className="label-form">
          <span>Update Password:</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={inputHandler}
          />
        </label>

        <label className="label-form">
          <span>Update Location:</span>
          <input
            name="location"
            type="location"
            value={location}
            onChange={inputHandler}
          />
        </label>

        {!inactive && <button className="btn"> Update Profile </button>}
      </form>
    )
  );
};

export default EditProfileForm;
