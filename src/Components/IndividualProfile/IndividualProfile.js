import { useEffect, useState } from "react";
import {
  NavLink,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import getProfile from "../../services/getProfile";
import {
  FaCog,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import "./IndividualProfile.css";
import EditProfileIcon from '../../assets/editprofile.svg'

const IndividualProfile = () => {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState("#about");
  const [{ biography, profilepic, location, firstname, email, online }, setAuthor] = useState(state || {});
  const { isAuth, headers, loggedUser } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.biography === biography) return;

    getProfile({ headers, username })
      .then(setAuthor)
      .catch((error) => {
        console.error(error);
        navigate("/not-found", { replace: true });
      });
  }, [username, headers, state, navigate, online]);

  const handleTabClick = (event) => {
    const newTab = event.currentTarget.dataset.state;
    setActiveTab(newTab);
  };

  return (
    <div className="card" data-state="#about">
      <div className="card-header">
        <div className="card-cover"></div>
        {loggedUser.username === username ? (
          <Link to="/editprofile">
            <img
              className="edit-profile-icon"
              src={EditProfileIcon}
              alt="editicon"
            />
          </Link>
        ) : null}
        <img className="card-avatar" src={profilepic} alt="avatar" />
        <h1 className="card-fullname">
          {online && <span className="online-user"></span>}
          {firstname}
        </h1>
      </div>
      <div className="card-main">
        <div
          className={`card-section ${
            activeTab === "" || activeTab === "#about" ? "is-active" : ""
          }`}
          id="about"
        >
          <div className="card-content">
            <div className="card-subtitle">ABOUT</div>
            <p className="card-desc">{biography}</p>
          </div>
          <div className="card-social">
            <a href="true">
              <FaInstagram className="icon" />
            </a>
            <a href="true">
              <FaFacebook className="icon" />
            </a>
            <a href="true">
              <FaTwitter className="icon" />
            </a>
            <a href="true">
              <FaGithub className="icon" />
            </a>
          </div>
        </div>
        <div
          className={`card-section ${
            activeTab === "#interests" ? "is-active" : ""
          }`}
          id="interests"
        >
          <div className="card-content">
            <div className="card-subtitle">INTERESTS</div>
            <p className="card-desc">ALL MY INTERESTS DOWN BELOW</p>
          </div>
        </div>
        <div
          className={`card-section ${
            activeTab === "#contact" ? "is-active" : ""
          }`}
          id="contact"
        >
          <div className="card-content">
            <div className="card-subtitle">CONTACT</div>
            <div className="card-contact-wrapper">
              <div className="card-contact">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {location} Singapore
              </div>
              <div className="card-contact">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                {email}
              </div>

              <button className="contact-me">Send A Request</button>
            </div>
          </div>
        </div>

        <div className="card-buttons">
          <button
            className={activeTab === "#about" ? "is-active" : ""}
            data-section="#about"
            data-state="#about"
            onClick={handleTabClick}
          >
            ABOUT
          </button>
          <button
            className={activeTab === "#interests" ? "is-active" : ""}
            data-section="#interests"
            data-state="#interests"
            onClick={handleTabClick}
          >
            INTERESTS
          </button>
          <button
            className={activeTab === "#contact" ? "is-active" : ""}
            data-section="#contact"
            data-state="#contact"
            onClick={handleTabClick}
          >
            CONTACT
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualProfile;
