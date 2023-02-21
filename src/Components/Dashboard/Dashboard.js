import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import getUsersByLocation from "../../services/getUsersByLocation";
import { useAuth } from "../../context/AuthContext";
import Cards from "../Cards/Cards";

const Dashboard = () => {
  const { loggedUser } = useAuth();
  const [usersByLocation, setUsersByLocation] = useState([]);

  useEffect(() => {
    async function fetchRecommendedUsers() {
      const recommendedUsers = await getUsersByLocation(loggedUser);
      setUsersByLocation(recommendedUsers);
    }
    fetchRecommendedUsers();
  }, [loggedUser]);

  console.log(usersByLocation);

  return (
    <>
      <Cards usersByLocation={usersByLocation} />
    </>
  );
};

export default Dashboard;
