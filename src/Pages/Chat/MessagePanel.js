import React, { useEffect, useState } from "react";
import socket from "../../socket";
import StatusIcon from "./StatusIcon";
import "./MessagePanel.css";

export default function MessagePanel(props) {
  const [input, setInput] = useState("");
  //const [messages, setMessages] = useState([]);

  const onSend = (e) => {
    e.preventDefault();
    const newmessage = {
      to_id: props.user.userID,
      from_id: props.currentuserid,
      content: input,
      chatroom_id: props.user.chatid,
    };
    props.pushMessage(newmessage);
    setInput("");
    socket.emit("private message", newmessage);
    console.log("emitted");
  };

  // useEffect(() => {
  //   socket.on("private message", ({ content, from_id, to_id, chatroom_id }) => {
  //     if (from_id == props.user.userID || to_id == props.user.userID) {
  //       const newmessage = {
  //         to_id,
  //         from_id,
  //         content,
  //         chatroom_id,
  //       };
  //       props.pushMessage(props.index, newmessage);
  //     }
  //   });
  // }, []);

  return (
    <div>
      <div className="header">
        <StatusIcon isOnline={props.user.connected} />
        {props.user.username}
      </div>

      <ul className="messages">
        {props.user.messages.map((message, index) => {
          return (
            <li key={index} className="message">
              <div className="sender">
                {message.from_id == props.currentuserid
                  ? "(yourself)"
                  : props.user.username}
              </div>
              {message.content}
            </li>
          );
        })}
      </ul>

      <form onSubmit={onSend}>
        <input
          placeholder="Your message..."
          type="textarea"
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />

        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
