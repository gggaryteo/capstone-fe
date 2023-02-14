import React from "react";
import "./StatusIcon.css";

export default function StatusIcon(props) {
  let classname = props.isOnline ? "icon connected" : "icon";

  return <i className={classname}></i>;
}
