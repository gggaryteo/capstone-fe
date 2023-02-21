import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import style from "styled-components";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const CardDiv = style.div`
  display: flex;
  justify-content: center;
`;

const ImgDiv = style.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 345px;
  height: 400px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Cards = ({ usersByLocation }) => {
  const [nomore, setNomore] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);
  const { loggedUser } = useAuth();

  useEffect(() => {
    if (usersByLocation.length === 0) {
      setNomore(true);
    }
  }, [usersByLocation]);

const swiped = async (direction, userId) => {

  setIsSwiped(async (current)=>{
  if (!current){
    switch (direction) {
        case "right":
          const sendInfo = {
            senderId: loggedUser.id,
            recipientId: userId,
            isRejected: false,
          };
          console.log(sendInfo);
          try {
            const res = await axios.post(
              "http://localhost:3001/chats/swipe",
              sendInfo
            );
            if (res.data.matched) {
              alert(`Matched with ${res.data.username} 👏`);
            }
            usersByLocation.pop();
            if (usersByLocation.length === 0) {
              setNomore(true);
            }
          } catch (error) {
            console.log(error);
          }
          return;

        case "left":
          const sendRejectedInfo = {
            senderId: loggedUser.id,
            recipientId: userId,
            isRejected: true,
          };

          try {
            const respond = await axios.post(
              "http://localhost:3001/chats/swipe",
              sendRejectedInfo
            );
            console.log(respond)

            usersByLocation.pop();
            if (usersByLocation.length === 0) {
              setNomore(true);
            }
          } catch (error) {
            console.log(error);
          }
          return;

        default:
          break;
      }
    }
return true
})}


  return (
    <>
      {usersByLocation?.map((user, index) => {
        return (
          <CardDiv key={user.id}>
            <TinderCard
              className="swipe"
              onSwipe={(dir) => swiped(dir, user.id)}
              preventSwipe={["up", "down"]}
              swipeRequirementType={"position"}
              swipeThreshold={180}
              onCardLeftScreen={() => console.log("wee left the screen")}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  minHeight: 700,
                  mx: "auto",
                  my: "1.3rem",
                }}
              >
                <>
                  {/* image pic */}
                  <ImageListItem
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ImgDiv
                      style={{
                        backgroundImage: `url(${user?.profilepic})`,
                      }}
                      bg={user?.profilepic}
                    >
                      <ImageListItemBar
                        title={`${user?.username}, ${user?.gender} `}
                        subtitle={user?.course}
                      />
                    </ImgDiv>
                  </ImageListItem>

                  {/* user detail  */}
                  <CardContent
                    sx={{
                      minWidth: 345,
                      mx: "auto",
                    }}
                  >
                    <Typography variant="h3">About me</Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mx: "auto",
                        py: 1,
                      }}
                    >
                      {user?.biography}
                    </Typography>
                  </CardContent>
                </>
              </Card>
            </TinderCard>
          </CardDiv>
        );
      })}
    </>
  );
};

export default Cards;
