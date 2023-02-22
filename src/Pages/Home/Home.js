// import styles
import "./Home.css";

// import stuff
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import userLogout from "../../services/userLogout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { setAuthState, isAuth, loggedUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("User clicked");
    setOpenModal(true);
    setIsSignUp(true);
  };

  const handleSignOut = () => {
    setAuthState(userLogout(loggedUser.email))
  }

  const handleDashboard = () => {
    navigate("/main")
  }

  return (
    <>
      <Navbar
        minimal={false}
        setOpenModal={setOpenModal}
        openModal={openModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home-page">
        <h1 className="primary-title">Frienemies®</h1>
        {!isAuth ? <button className="homepage-button" onClick={handleClick}> Create Account </button> :
        <>
        <button className="homepage-button" onClick={handleSignOut}> Sign Out</button>
        <button className="homepage-button" onClick={handleDashboard}> Dashboard</button>
        </>
        }

        {openModal && (
          <AuthModal
            isSignUp={isSignUp}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </>
  );
};

export default Home;
