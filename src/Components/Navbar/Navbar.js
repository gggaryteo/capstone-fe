// import Logos
import whiteLogo from "../../assets/whitelogo2.png";
import colorLogo from "../../assets/colorlogo2.png";

// import styles and stuff
import "./Navbar.css";
import userLogout from "../../services/userLogout";
 import { useAuth } from "../../context/AuthContext";


const Navbar = ({ minimal, openModal, setOpenModal, setIsSignUp }) => {
  const { isAuth, setAuthState, loggedUser } = useAuth();

  const handleClick = () => {
    setOpenModal(true);
    setIsSignUp(false);
  };

  const handleSignOut = () => {
    setAuthState(userLogout(loggedUser.email));
  }

  return (
    <nav>
      <div className="logo-container">
        <img
          className="logo"
          src={minimal ? colorLogo : whiteLogo}
          alt="logo"
        />
      </div>

      {!isAuth ? (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={openModal}
        >
          Log in
        </button>
      ) : (
        <button className="nav-button" onClick={handleSignOut}> Sign out </button>
      )}
    </nav>
  );
};

export default Navbar;
