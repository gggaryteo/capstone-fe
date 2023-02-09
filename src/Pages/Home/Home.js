// import styles
import "./Home.css";

// import stuff
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const authToken = false;

  const handleClick = () => {
    console.log("User clicked");
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <>
      <Navbar
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home-page">
        <h1 className="primary-title">Frienemies®</h1>
        <button className="homepage-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>

        {showModal && (
          <AuthModal
            setShowModal={setShowModal}
            isSignUp={isSignUp}
          />
        )}
      </div>
    </>
  );
};

export default Home;
