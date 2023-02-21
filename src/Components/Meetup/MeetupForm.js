import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import DateTimePicker from "./DateTimePicker";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function MeetupForm() {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(dayjs());
  // dateTime format is "2018-01-01T00:00:00.000Z"
  const [location, setLocation] = useState("");
  //const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");

  const { loggedUser } = useAuth();

  let { chatId } = useParams();
  let navigate = useNavigate();

  const createNewMeetup = async (title, datetime, location, description) => {
    let newMeetup = {
      title: title,
      tag: null,
      datetime: datetime,
      location: location,
      comment: description,
      authorId: loggedUser.id,
    };
    console.log(process.env.REACT_APP_API_SERVER);
    console.log(process.env);
    await axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/meetups/chatroom/${chatId}`,
        newMeetup
      )
      .then((response) => {
        console.log("create meetup response", response.data);
        setTitle("");
        setDateTime(dayjs());
        setLocation("");
        //setTag("");
        setDescription("");
        navigate('/meetups')
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createNewMeetup(title, dateTime, location, description);
  };

  return (
    <div>
      Title:{" "}
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <DateTimePicker
        value={dateTime}
        onChange={(newValue) => {
          setDateTime(newValue);
        }}
      />
      <br />
      Location:{" "}
      <input
        type="text"
        value={location}
        onChange={({ target }) => setLocation(target.value)}
      />
      <br />
      {/* Tag:{" "}
      <input
        type="text"
        value={tag}
        onChange={({ target }) => setTag(target.value)}
      />
      <br /> */}
      Description:{" "}
      <input
        type="text"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <br />
      <br />
      <button onClick={onSubmit}>Submit</button>
      <br />
    </div>
  );
}

// parameters needed:
// req.params - chatId
// req.body - title, tag, datetime, location, comment, authorId
