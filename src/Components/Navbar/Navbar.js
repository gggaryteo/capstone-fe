// import Logos
import whiteLogo from '../../assets/whitelogo2.png'
import colorLogo from "../../assets/colorlogo2.png";

// import styles
import './Navbar.css'

const Navbar = ( { minimal, openModal, setOpenModal, setIsSignUp }) => {

  const handleClick = () => {
    setOpenModal(true);
    setIsSignUp(false);
  }

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? colorLogo : whiteLogo} alt="logo"/>
      </div>

      <button className='nav-button' onClick={handleClick} disabled={openModal}>Log in</button>
    </nav>
  );
};

export default Navbar;
