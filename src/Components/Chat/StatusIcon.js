import React from "react";
import "./StatusIcon.css";

export default function StatusIcon(props) {
  let classname = props.isOnline ? "icon-chat connected" : "icon-chat";

  return <i className={classname}></i>;
}
