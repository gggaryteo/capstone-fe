import React from "react";
import StatusIcon from "./StatusIcon";
import "./UserPanel.css";

export default function UserPanel(props) {
  let classname = props.selecteduserid
    ? props.selecteduserid.userID == props.user.userID
      ? "chatOnlineFriend selected"
      : "chatOnlineFriend"
    : "chatOnlineFriend";

  return (
    <>
      <div onClick={props.onSelect} className={classname}>
        <div className="friendWrap">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={props.user.profilepic}
              alt="ppg"
            />
            <StatusIcon isOnline={props.user.connected} />
          </div>
          <span>{props.user.firstname}</span>
        </div>

        {props.user.messages.length == 0 ? (
          <div className="yourTurnFont">Your Turn</div>
        ) : (
          props.user.messages.length > 0 &&
          props.user.messages[props.user.messages.length - 1]["from_id"] ===
            props.user.userID && <div className="yourTurnFont">Your Turn</div>
        )}
      </div>
    </>
  );
}
