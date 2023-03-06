import React, { useState, useEffect } from "react";
import { useSprings } from "@react-spring/web";
import { useGesture } from "react-with-gesture";
import { useAuth } from "../../context/AuthContext";
import SwipeInterestCards from "./SwipeInterestCards";
import getUsersByInterests from "../../services/getUsersByInterests";
import axios from "axios";

const cards = [1, 2, 3, 4];

const to = (i) => ({
  x: 0,
  y: i * -500,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i) => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function InterestDeck() {
  const { loggedUser } = useAuth();
  const [usersByInterests, setUsersByInterests] = useState([]);

  useEffect(() => {
    async function fetchRecommendedUsers() {
      const recommendedUsers = await getUsersByInterests(loggedUser);
      setUsersByInterests(recommendedUsers);
    }
    fetchRecommendedUsers();
  }, [loggedUser]);

  const handleSwipeRight = async (userId) => {
    const sendInfo = {
      senderId: loggedUser.id,
      recipientId: userId,
      isRejected: false,
    };
    console.log(sendInfo);
    const res = await axios.post("http://localhost:3001/chats/swipe", sendInfo);
    console.log(res);

    setUsersByInterests((users) => users.filter((user) => user.id !== userId));
  };

  const handleSwipeLeft = async (userId) => {
    const sendInfo = {
      senderId: loggedUser.id,
      recipientId: userId,
      isRejected: true,
    };
    console.log(sendInfo);
    const res = await axios.post("http://localhost:3001/chats/swipe", sendInfo);
    console.log(res);

    setUsersByInterests((users) => users.filter((user) => user.id !== userId));
  };

  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useGesture(
    ({
      args: [index, userId],
      down,
      delta: [xDelta],
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) {
        gone.add(index);
        if (dir > 0) {
          // If user swipes right
          console.log(usersByInterests);
          handleSwipeRight(userId); // Send userId to the backend
        } else if (dir < 0) {
          handleSwipeLeft(userId);
        }
      }

      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );

  return props.map(({ x, y, rot, scale }, i) => (
    <div className="icard-deck">
      <SwipeInterestCards
        i={i}
        x={x}
        y={y}
        rot={rot}
        scale={scale}
        trans={trans}
        cards={cards}
        usersByInterests={usersByInterests}
        bind={bind}
      />
    </div>
  ));
}

export default InterestDeck;
