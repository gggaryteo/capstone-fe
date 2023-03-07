import React, { useState } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import './SwipeCards.css'
import style from "styled-components";
import Love from "@mui/icons-material/Favorite";
import Nope from "@mui/icons-material/Clear";

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

const SwipeButton = style(animated.button)`
  position: absolute;
  bottom: 1px;
  right: 10px;
  padding: 10px;
  border: none;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const NopeButton = style(animated.button)`
  position: absolute;
  bottom: 1px;
  left: 10px;
  padding: 10px;
  border: none;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const SwipeLocationCards = ({ i, x, y, rot, scale, trans, cards, bind, usersByLocation, handleSwipeRight, handleSwipeLeft }) => {
  // Add a state to keep track of the button hover state
  const [hover, setHover] = useState(false);
  const [nopeHover, setNopeHover] = useState(false);

  // Use a spring to animate the button scale on hover
  const buttonSpring = useSpring({
    scale: hover ? 1.2 : 1,
  });

  const nopeButtonSpring = useSpring({
    scale: nopeHover ? 1.2 : 1,
  });
  const user = usersByLocation[i];

  if (!user) {
    return null; // or handle the error
  }

  const { id, firstname, profilepic, biography, location } = user;

  const MAX_BIO_LENGTH = 75;

  // Check if the biography is longer than the maximum length
  const truncatedBio =
    biography.length > MAX_BIO_LENGTH
      ? biography.slice(0, MAX_BIO_LENGTH) + "..."
      : biography;

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
          <h2 className="swipe-h2-bio">{truncatedBio}</h2>
          {/* Add the swipe button */}
          <SwipeButton
            style={buttonSpring}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleSwipeRight(id)}
          >
            <Love style={{ color: "red" }} />
          </SwipeButton>
          <NopeButton
            style={nopeButtonSpring}
            onMouseEnter={() => setNopeHover(true)}
            onMouseLeave={() => setNopeHover(false)}
            onClick={() => handleSwipeLeft(id)}
          >
            <Nope style={{ color: "#F27121" }} />
          </NopeButton>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default SwipeLocationCards;






