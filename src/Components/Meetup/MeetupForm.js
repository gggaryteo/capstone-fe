import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import DateTimePicker from "./DateTimePicker";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function MeetupForm() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(true);
  const [titleErrorMessage, setTitleErrorMessage] = useState(
    "Field cannot be blank."
  );

  const [dateTime, setDateTime] = useState(dayjs());
  // dateTime format is "2018-01-01T00:00:00.000Z"

  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState(true);
  const [locationErrorMessage, setLocationErrorMessage] = useState(
    "Field cannot be blank."
  );

  //const [tag, setTag] = useState("");

  const [description, setDescription] = useState("");
  const [descError, setDescError] = useState(false);
  const [descErrorMessage, setDescErrorMessage] = useState("");

  const [chatPartner, setChatPartner] = useState("");

  const { loggedUser } = useAuth();

  let { chatId } = useParams();
  let navigate = useNavigate();

  const getChatroomData = async () => {
    let details = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/chats/room/${chatId}`
    );
    console.log("chatroom details in axios call: ", details.data);
    if (details.data.user1.id == loggedUser.id) {
      setChatPartner(details.data.user2);
    } else {
      setChatPartner(details.data.user1);
    }
  };

  useEffect(() => {
    getChatroomData();
  }, [chatId]);

  const validateTitle = (titleValue) => {
    if (titleValue === "") {
      setTitleError(true);
      setTitleErrorMessage("Field cannot be blank.");
    } else if (titleValue.length > 30) {
      setTitleError(true);
      setTitleErrorMessage(
        `Max 30 char (Current: ${titleValue.length} char). `
      );
    } else {
      setTitleError(false);
    }
    setTitle(titleValue);
  };

  const validateLocation = (locationValue) => {
    if (locationValue === "") {
      setLocationError(true);
      setLocationErrorMessage("Field cannot be blank.");
    } else if (locationValue.length > 50) {
      setLocationError(true);
      setLocationErrorMessage(
        `Max 50 char (Current: ${locationValue.length} char). `
      );
    } else {
      setLocationError(false);
    }
    setLocation(locationValue);
  };

  const validateDescription = (descValue) => {
    if (descValue.length > 100) {
      setDescError(true);
      setDescErrorMessage(`Max 100 char (Current: ${descValue.length} char). `);
    } else {
      setDescError(false);
    }
    setDescription(descValue);
  };

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
        navigate("/meetups");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !titleError &&
      !locationError &&
      !descError &&
      dateTime &&
      dateTime.isValid()
    ) {
      createNewMeetup(title, dateTime, location, description);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2} mb={2}>
          <Avatar alt="userpfp1" src={loggedUser.profilepic} />
          <Avatar alt="userpfp2" src={chatPartner.profilepic} />
        </Stack>
        <Typography component="h1" variant="h5">
          Meetup with {chatPartner.firstname}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Title"
                autoFocus
                value={title}
                onChange={({ target }) => validateTitle(target.value)}
                error={titleError}
                helperText={titleError && titleErrorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                value={dateTime}
                onChange={(newValue) => {
                  setDateTime(newValue);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Location"
                value={location}
                onChange={({ target }) => validateLocation(target.value)}
                error={locationError}
                helperText={locationError && locationErrorMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={({ target }) => validateDescription(target.value)}
                error={descError}
                helperText={descError && descErrorMessage}
              />
            </Grid>
          </Grid>
          <Button
            onClick={onSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

// parameters needed:
// req.params - chatId
// req.body - title, tag, datetime, location, comment, authorId
