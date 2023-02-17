import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import Chat from "./Chat";
import socket from "../../socket";

const ChatApp = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { loggedUser } = useAuth();

  useEffect(() => {
    console.log("what is loggedUser? ", loggedUser);
    socket.auth = { username: loggedUser.username, userID: loggedUser.id };
    console.log("what is socket.auth? ", socket.auth);
    socket.connect();
    setIsLoaded(true);
    return () => {
      socket.off("connect_error"); //include cleanup - disconnect on unmount
      socket.disconnect();
      setIsLoaded(false);
    };
  }, [loggedUser]);

  return (
    <div>
      {isLoaded && (
        <Chat username={socket.auth.username} userid={socket.auth.userID} />
      )}
    </div>
  );
};

export default ChatApp;

// ChatApp
//   - Chat
//     - User (StatusIcon)
//     - MessagePanel (StatusIcon)

// https://javascript.plainenglish.io/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-2021-edition-a7ebfc19a9d
// https://beta.reactjs.org/learn/synchronizing-with-effects
// https://beta.reactjs.org/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts
