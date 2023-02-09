import "./Credentials.css";
import { useState } from "react";

const Credentials = ({ setCurrent, credentials, setCredentials }) => {
  const [username, setUsername] = useState(credentials["username"]);
  const [password, setPassword] = useState(credentials["password"]);

  const handleContinue = (e) => {
    e.preventDefault();
    setCredentials({
      username: username,
      password: password,
    });
    setCurrent("EmailName")
  }
  return (
    <div className="credentials">
      <form className="information" onSubmit={handleContinue}>
        <p>
          By submitting your information, you agree to our Terms. Learn how we
          process your data in our Privacy and Cookie Policy.
        </p>
        <h4>My username and password are...</h4>
        <input
          className="username"
          type="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="continue-button">Continue</button>
      </form>
    </div>
  );
};

export default Credentials;
