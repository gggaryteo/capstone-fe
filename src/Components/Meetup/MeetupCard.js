import React from "react";
import "./MeetupCard.css";
import dateTimeFormatter from "../../helpers/dateTimeFormatter";
import CoolButton from "../CoolButton/CoolButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RejectedLogo from "../../assets/rejected.png"

export default function MeetupCard(props) {
  const acceptbutton = (
    <CoolButton onClick={() => props.accept(props.event.id)}>Accept</CoolButton>
  );

  const rejectbutton = (
    <CoolButton onClick={() => props.reject(props.event.id)}>Reject</CoolButton>
  );

  const cancelbutton = (
    <CoolButton onClick={() => props.cancel(props.event.id)}>Cancel</CoolButton>
  );

  return (
    <Card
      className={props.event.rejected && "inactive"}
      sx={{
        borderStyle: "none",
        margin: "5px",
        borderWidth: "1px",
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
        borderRadius: "10px",
      }}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <CardContent className="wrapper">
        {props.event.rejected && (
          <div className="rejected-overlay">
            <img
              className="rejected-logo"
              src={RejectedLogo}
              alt="rejectedlogo"
            />
          </div>
        )}
        <h2 className="upper">Your Next Meetup</h2>
        <Typography variant="p" className="meetup">
          {props.event.title}
        </Typography>
        <h3 className="group">{props.event.comment}</h3>
        <div className="details">
          <div className="row">
            <EventIcon className="meetup-card-icon" />
            <div className="row-item">
              <Typography variant="subtitle1">
                <time>{dateTimeFormatter(props.event.datetime)}</time>
              </Typography>
            </div>
          </div>

          <div className="row">
            <LocationOnIcon className="meetup-card-icon" />
            <div className="row-item">
              <Typography variant="subtitle1">
                <strong>{props.event.location}</strong>
              </Typography>
            </div>
          </div>

          <div className="row">
            <PersonIcon className="meetup-card-icon" />
            <div className="row-item">
              <Typography variant="subtitle1">
                Created: {props.event.author.firstname}
              </Typography>
            </div>
          </div>

          <div className="row">
            <PersonAddIcon className="meetup-card-icon" />
            <div className="row-item">
              <Typography variant="subtitle1">
                Invited: {""}
                {props.event.chat.user1_id !== props.event.author_id
                  ? props.event.chat.user1.firstname
                  : props.event.chat.user2.firstname}
              </Typography>
            </div>
          </div>
        </div>

        <div className="button-container" style={{display: "flex", marginTop: "50px"}}>
          {!(props.event.accepted || props.event.rejected) &&
            (props.event.pending &&
            props.event.author_id === props.loggeduser.id ? (
              <div>{cancelbutton}</div>
            ) : (
              <>
                <div className="a-btn">{acceptbutton}</div>
                <div>{rejectbutton}</div>
              </>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
