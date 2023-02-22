import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import MeetupCard from "./MeetupCard";
import './Meetup.css'

export default function Meetup() {
  const [meetupList, setMeetupList] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("All");


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

  const expiredorcancelled = (meetup) => {
    return meetup.rejected;
  };

  const filters = [all, upcoming, received, sent, expiredorcancelled];

  const INITIAL_ARRAY = [
    "All",
    "Upcoming",
    "Pending - Received",
    "Pending - Sent",
    "Expired/Cancelled",
  ];

  const handleClick = (filter) => {
    setCurrentFilter(filter);
  };

  return (
    <div>
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

      {meetupList
        .filter(filters[INITIAL_ARRAY.indexOf(currentFilter)])
        .map((meetup) => (
          <MeetupCard
            event={meetup}
            loggeduser={loggedUser}
            accept={acceptMeetup}
            reject={deleteOrCancelMeetup}
            cancel={deleteOrCancelMeetup}
          />
        ))}
    </div>
  );
}
