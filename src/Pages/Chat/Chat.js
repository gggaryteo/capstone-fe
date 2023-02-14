import React, { useState, useEffect } from "react";
import socket from "../../socket";
import "./Chat.css";
import MessagePanel from "./MessagePanel";
import UserPanel from "./UserPanel";

export default function Chat(props) {
  const [selectedUser, setSelectedUser] = useState(null); // for userPanel
  const [users, setUsers] = useState([]);
  //const [messages, setMessages] = useState(props.user.messages);

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

  // do this one later, for selected user on left user panel
  // const onMessage = (content) => {
  //   if (selectedUser) {
  //     console.log(selectedUser);
  //     socket.emit("private message", {
  //       content,
  //       to: selectedUser.userID,
  //       chatroomId: selectedUser.chatid,
  //     });
  //     selectedUser.messages.push({
  //       content,
  //       fromSelf: true,
  //     });
  //   }
  // };

  // const onSelectUser = (user) => {
  //   selectedUser = user
  //   user.hasNewMessages = false
  // }
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
      Current logged in username: {props.username}
      <br />
      Current logged in userid: {props.userid}
      <br />
      <button onClick={props.logout}>Logout</button>
      <br />
      {JSON.stringify(users)}
      <div className="right-panel">
        {users.map((user, index) => (
          <MessagePanel
            index={index}
            user={user}
            currentuserid={props.userid}
            pushMessage={pushMessage}
          />
        ))}
      </div>
    </div>
  );
}
