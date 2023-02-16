import React from "react";
import StatusIcon from "./StatusIcon";
import "./UserPanel.css";

export default function UserPanel(props) {
  let classname = props.selecteduserid
    ? props.selecteduserid.userID == props.user.userID
      ? "user selected"
      : "user"
    : "user";
  let status = props.user.connected ? "online" : "offline";

  return (
    <div onClick={props.onSelect} className={classname}>
      <div className="description">
        <div className="name">{props.user.username}</div>
        <div className="status">
          <StatusIcon isOnline={props.user.connected} />
          {status}
        </div>
      </div>
      <div className="new-messages">!</div>
    </div>
  );
}
