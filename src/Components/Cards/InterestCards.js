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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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

const InterestCards = ({ usersByInterests }) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const { loggedUser } = useAuth();
  const theme = useTheme();
  const breakpoints = {
    xs: theme.breakpoints.only("xs"),
    sm: theme.breakpoints.only("sm"),
    md: theme.breakpoints.only("md"),
    lg: theme.breakpoints.only("lg"),
  };

  const cardStyles = {
    maxWidth: 345,
    height: 500,
    mx: "auto",
    my: "1.3rem",
    [breakpoints.xs]: {
      maxWidth: "90vw",
      height: 450,
    },
    [breakpoints.sm]: {
      maxWidth: "80vw",
      height: 550,
    },
    [breakpoints.md]: {
      maxWidth: "70vw",
      height: 600,
    },
    [breakpoints.lg]: {
      maxWidth: "60vw",
      height: 650,
    },
  };

  const isXs = useMediaQuery(breakpoints.xs);
  const isSm = useMediaQuery(breakpoints.sm);
  const isMd = useMediaQuery(breakpoints.md);
  const isLg = useMediaQuery(breakpoints.lg);

  const swiped = async (direction, userId) => {
    setIsSwiped(async (current) => {
      if (!current) {
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
              console.log(res);
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
              console.log(respond);
            } catch (error) {
              console.log(error);
            }
            return;

          default:
            break;
        }
      }
      return true;
    });
  };

  return (
    <>
      {usersByInterests?.map((user, index) => {
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
                  ...cardStyles,
                  // Use media queries to adjust card size for different screen sizes
                  ...(isXs && {
                    maxWidth: "90vw",
                    height: 500,
                  }),
                  ...(isSm && {
                    maxWidth: "80vw",
                    height: 550,
                  }),
                  ...(isMd && {
                    maxWidth: "70vw",
                    height: 600,
                  }),
                  ...(isLg && {
                    maxWidth: "60vw",
                    height: 650,
                  }),
                  "@media (max-width: 375px)": {
                    height: "70",
                    width: "75vw",
                  },
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
                      className="img-div"
                      style={{
                        backgroundImage: `url(${user?.profilepic})`,
                        height: "330px",
                      }}
                      bg={user?.profilepic}
                    >
                      <ImageListItemBar
                        title={`${user?.username}, ${user?.gender} `}
                        subtitle={user?.course}
                      />
                      <style jsx>{`
                        @media (max-width: 375px) {
                          .img-div {
                            height: 250px;
                          }
                        }
                      `}</style>
                    </ImgDiv>
                  </ImageListItem>

                  {/* user detail  */}
                  <CardContent
                    sx={{
                      minWidth: 345,
                      mx: "auto",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: "35px",
                        "@media (max-width: 375px)": {
                          fontSize: "25px",
                        },
                      }}
                    >
                      About me
                    </Typography>
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

export default InterestCards;