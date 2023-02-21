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
    <div onClick={props.onSelect} className={classname}>
      <div className="chatOnlineImgContainer">
        <img className="chatOnlineImg" src={props.user.profilepic} alt="ppg" />
        <StatusIcon isOnline={props.user.connected} />
      </div>
      <span className="chatOnlineName">{props.user.firstname}</span>
    </div>
  );
}
