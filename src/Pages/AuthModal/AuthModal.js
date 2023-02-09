import Register from '../Register/Register';
import './AuthModal.css'

const AuthModal = ( { setShowModal, isSignUp }) => {

  const handleClick = () => {
    setShowModal(false);
  }

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>ⓧ</div>
      <h2>{isSignUp ? 'CREATE ACCOUNT': 'GET STARTED'}</h2>
      {isSignUp ? <Register/> : null}
    </div>
  );
};

export default AuthModal;
