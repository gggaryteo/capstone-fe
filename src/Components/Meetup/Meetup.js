import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import MeetupCard from "./MeetupCard";
import "./Meetup.css";
import Carousel from "react-material-ui-carousel";
import useWindowSize from "../../hooks/useWindowSize";
import { Grid } from "@mui/material";

export default function Meetup() {
  const [meetupList, setMeetupList] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("All");
  const windowSize = useWindowSize();

  const { loggedUser } = useAuth();

  const getAllMeetups = async () => {
    let meetupsList = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/meetups/user/${loggedUser.id}`
    );
    console.log("meetups list in axios call: ", meetupsList.data);
    setMeetupList(meetupsList.data);
  };

  const acceptMeetup = async (tableId) => {
    await axios
      .put(`${process.env.REACT_APP_API_SERVER}/meetups/accept/${tableId}`)
      .then((response) => {
        console.log(response.data);
        getAllMeetups();
      });
  };

  const deleteOrCancelMeetup = async (tableId) => {
    await axios
      .put(`${process.env.REACT_APP_API_SERVER}/meetups/reject/${tableId}`)
      .then((response) => {
        console.log(response.data);
        getAllMeetups();
      });
  };

  useEffect(() => {
    getAllMeetups();
  }, [loggedUser]);

  const all = (meetup) => {
    return true;
  };

  const received = (meetup) => {
    return meetup.author_id !== loggedUser.id && meetup.pending;
  };

  const sent = (meetup) => {
    return meetup.author_id === loggedUser.id && meetup.pending;
  };

  const upcoming = (meetup) => {
    return meetup.accepted;
  };

  const cancelled = (meetup) => {
    return meetup.rejected;
  };

  const filters = [all, upcoming, received, sent, cancelled];

  const INITIAL_ARRAY = ["All", "Upcoming", "Received", "Sent", "Cancelled"];

  const handleClick = (filter) => {
    setCurrentFilter(filter);
  };

  return (
    <div
      style={{
        maxHeight: "800px",
        overflowY: "auto",
        overflowX: "hidden",
        marginTop: "-70px",
      }}
    >
      <div className="project-filter">
        <nav className="filter-nav">
          {INITIAL_ARRAY.map((item) => (
            <button
              className={currentFilter === item ? "active" : ""}
              key={item}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      {windowSize.width < 1232 ? (
        meetupList.length > 0 ? (
          <Carousel>
            {meetupList
              .filter(filters[INITIAL_ARRAY.indexOf(currentFilter)])
              .map((meetup) => (
                <MeetupCard
                  key={meetup.id}
                  event={meetup}
                  loggeduser={loggedUser}
                  accept={acceptMeetup}
                  reject={deleteOrCancelMeetup}
                  cancel={deleteOrCancelMeetup}
                />
              ))}
          </Carousel>
        ) : (
          <p>No meetups created 😊</p>
        )
      ) : meetupList.length > 0 ? (
        <Grid
          container
          spacing={5}
          direction="row"
          marginTop="10px"
          justifyContent="flex-start"
        >
          {meetupList
            .filter(filters[INITIAL_ARRAY.indexOf(currentFilter)])
            .map((meetup) => (
              <Grid item key={meetup.id} md={4} xs={12} sm={6}>
                <MeetupCard
                  event={meetup}
                  loggeduser={loggedUser}
                  accept={acceptMeetup}
                  reject={deleteOrCancelMeetup}
                  cancel={deleteOrCancelMeetup}
                />
              </Grid>
            ))}
        </Grid>
      ) : (
        <p>No meetups created😊</p>
      )}
    </div>
  );
}
