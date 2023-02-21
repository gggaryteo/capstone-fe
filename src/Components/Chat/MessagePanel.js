import React, { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import StatusIcon from "./StatusIcon";
import "./MessagePanel.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function MessagePanel(props) {
  const [input, setInput] = useState("");
  const scrollRef = useRef();
  const { loggedUser } = useAuth();

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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.user.messages]);

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
    <>
      <div className="chatBoxBanner">
        <div
          onClick={props.viewProfile}
          className="chatBoxFriend"
        >
          <div className="chatBoxBannerImgContainer">
            <img
              className="chatBoxBannerImg"
              src={props.user.profilepic}
              alt="pfp"
            />
            <StatusIcon isOnline={props.user.connected} />
          </div>
          <span className="chatOnlineName">{props.user.firstname}</span>
        </div>
        <div>
          <Link to={`/meetupform/${props.user.chatid}`}>Add meetup</Link>
        </div>
      </div>
      <div className="chatBoxTop">
        {props.user.messages &&
          props.user.messages.map((message, index) => {
            return (
              <div ref={scrollRef}>
                <div
                  key={index}
                  className={
                    message.from_id == props.currentuserid
                      ? "message own"
                      : "message"
                  }
                >
                  <div className="messageTop">
                    <img
                      className="messageImg"
                      src={
                        message.from_id == props.currentuserid
                          ? loggedUser.profilepic
                          : props.user.profilepic
                      }
                      alt="ppg"
                    />
                    <p className="messageText">{message.content}</p>
                  </div>
                  <div className="messageBottom">1 hour ago</div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="chatBoxBottom">
        <textarea
          className="chatMessageInput"
          placeholder="Your message..."
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
        <button className="chatSubmitButton" onClick={onSend}>
          Send
        </button>
      </div>
    </>
  );
}
