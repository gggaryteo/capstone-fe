import React, { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import StatusIcon from "./StatusIcon";
import dateTimeFormatter from "../../helpers/dateTimeFormatter";
import "./MessagePanel.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import { pink } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";

export default function MessagePanel(props) {
  const [input, setInput] = useState("");
  const scrollRef = useRef();
  const { loggedUser } = useAuth();

  //const [messages, setMessages] = useState([]);

  const onSend = (e) => {
    e.preventDefault();
    if (input) {
      const newmessage = {
        to_id: props.user.userID,
        from_id: props.currentuserid,
        content: input,
        chatroom_id: props.user.chatid,
        createdAt: new Date().toISOString(),
      };
      props.pushMessage(newmessage);
      setInput("");
      socket.emit("private message", newmessage);
      console.log("emitted");
      console.log("newmessageeee", newmessage);
    } else {
      return;
    }
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
        <Tooltip title="View profile" placement="bottom">
          <div onClick={props.viewProfile} className="chatBoxFriend">
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
        </Tooltip>

        <div>
          <Tooltip title="Add meetup" placement="bottom">
            <Link to={`/meetupform/${props.user.chatid}`}>
              <EventIcon sx={{ color: pink[500] }} fontSize="large" />
            </Link>
          </Tooltip>
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
                  <div className="messageBottom">
                    {dateTimeFormatter(message.createdAt)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="chatBoxBottom">
        <textarea
          className="chatMessageInput"
          required
          placeholder="Your message..."
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
        <button
          className={
            input ? "chatSubmitButton" : "chatSubmitButton btn-disabled"
          }
          onClick={onSend}
        >
          Send
        </button>
      </div>
    </>
  );
}
