import React, { useState } from "react";
import { animated, to } from "@react-spring/web";
import Carousel from "nuka-carousel";
import './SwipeCards.css'
import style from "styled-components";

const ImgDiv = style.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 450px;
  height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const SwipeLocationCards = ({ i, x, y, rot, scale, trans, cards, bind, usersByLocation }) => {
  const user = usersByLocation[i];
  if (!user) {
    return null; // or handle the error
  }
  const { id, firstname, profilepic, biography, location } = user;

  return (
    <animated.div
      key={i}
      style={{
        transform: to([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
      }}
    >
      <animated.div
        {...bind(i, id)} // Pass userId as argument to bind
        style={{
          transform: to([rot, scale], trans),
        }}
      >
        <div className="card">
            <ImgDiv
              className="img-div"
              style={{
                backgroundImage: `url(${user?.profilepic})`,
                height: "330px",
              }}
              bg={user?.profilepic}
            ></ImgDiv>
          <h2 className="swipe-h2-firstname">{firstname}</h2>
          <h5>{location}</h5>
          <h2 className="swipe-h2-bio">{biography}</h2>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default SwipeLocationCards;






