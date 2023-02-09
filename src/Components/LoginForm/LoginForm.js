import { useState } from "react";
import axios from "axios";

// Styles
import './LoginForm.css'

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    console.log("Logged In")
  }

  return (
    <div className="login-form">
      <form className="information" onSubmit={login}>
        <p>
          By logging in, you agree to our Terms. Learn how we
          process your data in our Privacy and Cookie Policy.
        </p>
        <h4>My email and password are...</h4>
        <input
          className="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;