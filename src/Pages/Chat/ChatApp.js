import React, { useState, useEffect } from "react";
import FakeLogin from "./FakeLogin";
import Chat from "./Chat";
import socket from "../../socket";

const ChatApp = () => {
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);

  const onUsernameSelection = (username, userid) => {
    // username and userid is passed from FakeLogin.js
    // should i store the states here too in the main ChatApp? That means I will have to use a then function because store state first then socket.auth pull from it
    setUsernameAlreadySelected(true);
    socket.auth = { username, userID: userid };
    console.log("what is socket.auth? ", socket.auth);
    socket.connect();
  };

  const logOut = (e) => {
    e.preventDefault();
    setUsernameAlreadySelected(false);
  };

  useEffect(() => {
    // socket.on("session", ({ username, userID }) => {
    //   // attach the session ID to the next reconnection attempts
    // });
    return () => {
      socket.off("connect_error"); //include cleanup - disconnect on unmount
    };
  }, []);

  return (
    <div>
      {usernameAlreadySelected ? (
        <Chat
          username={socket.auth.username}
          userid={socket.auth.userID}
          logout={logOut}
        />
      ) : (
        <FakeLogin submit={onUsernameSelection} />
      )}
    </div>
  );
};

export default ChatApp;

// the socket io. example structures the frontend like this:
// App
//   - SelectUsername (in this case FakeLogin)
//   - Chat
//     - User (StatusIcon)
//     - MessagePanel (StatusIcon)

// 13 Feb did log
// App.css -> temporarily removed bg pic from for visibility
// index.js -> include temporary chat route
// package-json files -> npm install socket.io-client on frontend
// created new file socket.js
// created new folder "Chat" under src > Pages

// https://javascript.plainenglish.io/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-2021-edition-a7ebfc19a9d
// https://beta.reactjs.org/learn/synchronizing-with-effects
// https://beta.reactjs.org/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts
