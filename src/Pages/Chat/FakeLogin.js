import React, { useState } from "react";

export default function FakeLogin(props) {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit(username, userid);
    setUsername("");
    setUserid("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input
            placeholder="Your username..."
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          userid:
          <input
            placeholder="Your userid..."
            type="text"
            value={userid}
            onChange={({ target }) => setUserid(target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <br />
      UserNameField: {username}
      <br />
      Idfield: {userid}
      <br />
    </div>
  );
}
