// import styles
import "./Home.css";

// import stuff
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const authToken = false;

  const handleClick = () => {
    console.log("User clicked");
    setOpenModal(true);
    setIsSignUp(true);
  };

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
        <button className="homepage-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>

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
