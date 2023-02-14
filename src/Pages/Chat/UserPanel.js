import React, { useState } from "react";
import StatusIcon from "./StatusIcon";
import "./UserPanel.css";

export default function UserPanel(props) {
  const [isSelected, setIsSelected] = useState(false);

  let classname = isSelected ? "user selected" : "user";
  let status = props.user.connected ? "online" : "offline";

  const onSelect = (e) => {
    e.preventDefault();
    setIsSelected(true);
  };

  return (
    <div onClick={onSelect} className={classname}>
      <div className="description">
        <div className="name">
          {props.user.username === props.user.self
            ? "yourself"
            : props.user.username}
        </div>
        <div className="status">
          <StatusIcon isOnline={props.user.connected} />
          {status}
        </div>
      </div>
      <div className="new-messages">!</div>
    </div>
  );
}
