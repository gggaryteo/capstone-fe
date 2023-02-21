import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket";
import "./Chat.css";
import MessagePanel from "./MessagePanel";
import UserPanel from "./UserPanel";

export default function Chat() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // for userPanel
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    //  const initReactiveProperties = (user) => {
    //    user.hasNewMessages = false;
    //  };

    socket.on("users", (users) => {
      // sort username in alphabetical order
      users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      setUsers(users);
    });

    socket.on("user connected", (user) => {
      setConnected(user.userID, true);
    });

    socket.on("user disconnected", (id) => {
      setConnected(id, false);
    });
    socket.on("private message", ({ content, from_id, to_id, chatroom_id }) => {
      const newmessage = {
        to_id,
        from_id,
        content,
        chatroom_id,
      };
      pushMessage(newmessage);
    });
    return () => {
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("private message");
    };
  }, []);

  const onSelectUser = (user) => {
    // console.log("what is e", e);
    // e.preventDefault();
    setSelectedUser(user);
  };

  const pushMessage = (newMessage) => {
    setUsers((currentuser) => {
      let copyuser = [...currentuser];
      for (let i = 0; i < currentuser.length; i++) {
        const existingUser = currentuser[i];
        if (
          existingUser.userID == newMessage.from_id ||
          existingUser.userID == newMessage.to_id
        ) {
          let messages = [...copyuser[i]["messages"], newMessage];
          copyuser[i]["messages"] = messages;
          break;
        }
      }
      return copyuser;
    });
  };

  const setConnected = (id, status) => {
    setUsers((currentuser) => {
      let copyuser = [...currentuser];
      for (let i = 0; i < copyuser.length; i++) {
        const existingUser = copyuser[i];
        if (existingUser.userID == id || existingUser.userID == id) {
          copyuser[i]["connected"] = status;
        }
      }
      return copyuser;
    });
  };
  return (
    <div>
      {isLoaded && (
        <div className="messenger">
          <div className="chatBox">
            {/* Logged in as: {socket.auth.username} of userid {socket.auth.userID} */}
            {/* {JSON.stringify(users)} */}
            <div className="chatBoxWrapper">
              {selectedUser ? (
                <MessagePanel
                  user={selectedUser}
                  currentuserid={socket.auth.userID}
                  pushMessage={pushMessage}
                  viewProfile={()=>{navigate(`/profile/${selectedUser.username}`)}}
                />
              ) : (
                <h1>Click on a conversation to begin </h1>
              )}
            </div>
          </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              {users.map((user) => (
                <UserPanel
                  user={user}
                  selecteduserid={selectedUser}
                  onSelect={() => onSelectUser(user)} // i just put onSelectUser without the callback aand it did not work, so this works now.
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
