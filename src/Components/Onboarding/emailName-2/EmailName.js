import "./EmailName.css";
import { ArrowBackIos } from "@mui/icons-material";
import { useState } from "react";

const EmailName = ({ setCurrent, emailName, setEmailName }) => {
  const [firstName, setFirstName] = useState(emailName["firstname"]);
  const [email, setEmail] = useState(emailName["email"]);

  const handleContinue = (e) => {
    e.preventDefault();
    setEmailName({
      firstname: firstName,
      email: email,
    });
    setCurrent("Location");
  };

  const handleBack = () => {
    setCurrent("Credentials");
  };

  return (
    <div className="email-name">
      <ArrowBackIos className="arrowback-icon" onClick={handleBack} />
      <form className="information" onSubmit={handleContinue}>
        <h4>My name and email are...</h4>
        <input
          required
          className="username"
          type="name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          required
          className="email"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="continue-button"> Continue </button>
      </form>
    </div>
  );
};

export default EmailName;
