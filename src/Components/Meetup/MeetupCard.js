import React from "react";
import "./MeetupCard.css";
import dateTimeFormatter from "../../helpers/dateTimeFormatter";

export default function MeetupCard(props) {
  const acceptbutton = (
    <button onClick={() => props.accept(props.event.id)}>Accept</button>
  );

  const rejectbutton = (
    <button onClick={() => props.reject(props.event.id)}>Reject</button>
  );

  const cancelbutton = (
    <button onClick={() => props.cancel(props.event.id)}>Cancel</button>
  );

  return (
    <div className={props.event.rejected && "inactive"}>
      Title: {props.event.title} <br />
      Created by: {props.event.author.firstname}
      <br />
      Date & Time: {dateTimeFormatter(props.event.datetime)} <br />
      Location: {props.event.location} <br />
      Description:{props.event.comment} <br />
      Pending: {String(props.event.pending)}
      <br />
      Rejected: {String(props.event.rejected)}
      <br />
      Other Party ID:{" "}
      {props.event.chat.user1_id !== props.event.author_id
        ? props.event.chat.user1_id
        : props.event.chat.user2_id}
      <br />
      Other Party Name:{" "}
      {props.event.chat.user1_id !== props.event.author_id
        ? props.event.chat.user1.firstname
        : props.event.chat.user2.firstname}
      {!(props.event.accepted || props.event.rejected) &&
        (props.event.pending &&
        props.event.author_id === props.loggeduser.id ? (
          <div>{cancelbutton}</div>
        ) : (
          <div>
            {acceptbutton}
            {rejectbutton}
          </div>
        ))}
      <br />
      <br />
      <br />
    </div>
  );
}
