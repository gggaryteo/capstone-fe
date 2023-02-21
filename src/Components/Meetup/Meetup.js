import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import MeetupCard from "./MeetupCard";

export default function Meetup() {
  const [meetupList, setMeetupList] = useState([]);
  const [filter, setFilter] = useState("0");

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

  const filters = [all, received, sent, upcoming, expiredorcancelled];

  return (
    <div>
      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value="0">All</option>
        <option value="1">Pending - Received</option>
        <option value="2">Pending - Sent</option>
        <option value="3">Upcoming</option>
        <option value="4">Expired/Cancelled</option>
      </select>
      <br />
      <br />
      {meetupList.filter(filters[Number(filter)]).map((meetup) => (
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
