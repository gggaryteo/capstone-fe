import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import getUsersByLocation from "../../services/getUsersByLocation";
import getUsersByInterests from "../../services/getUsersByInterests";
import { useAuth } from "../../context/AuthContext";
import LocationCards from "../Cards/LocationCards";
import InterestCards from "../Cards/InterestCards";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


const Dashboard = () => {
  const { loggedUser } = useAuth();
  const [usersByLocation, setUsersByLocation] = useState([]);
  const [usersByInterests, setUsersByInterests] = useState([])
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    async function fetchRecommendedUsers() {
      const recommendedUsers = await getUsersByLocation(loggedUser);
      setUsersByLocation(recommendedUsers);
    }
    fetchRecommendedUsers();
  }, [loggedUser]);

  useEffect(() => {
      async function fetchUsersByInterest() {
        const recommendedUsersByInt = await getUsersByInterests(loggedUser);
        setUsersByInterests(recommendedUsersByInt);
      }
      fetchUsersByInterest();
    }, [loggedUser]);

    const handleTabChange = (event, newValue) => {
      setSelectedTab(newValue);
    };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-100px",
          "@media (max-width: 375px)": { marginTop: "-200px" },
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="By Location" />
          <Tab label="By Interests" />
        </Tabs>
      </div>
      {selectedTab === 0 && <LocationCards usersByLocation={usersByLocation} />}
      {selectedTab === 1 && (
        <InterestCards usersByInterests={usersByInterests} />
      )}
    </>
  );
};

export default Dashboard;
