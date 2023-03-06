import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LocationDeck from "../Cards/LocationDeck";
import InterestDeck from "../Cards/InterestDeck";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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
          "@media (maxWidth: 375px)": { marginTop: "-200px" },
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
      <div className="mt-cards"
      >
        {selectedTab === 0 && (
          // <LocationCards
          //   usersByLocation={usersByLocation}
          //   setUsersByLocation={setUsersByLocation}
          //   usersByInterests={usersByInterests}
          //   setUsersByInterests={setUsersByInterests}
          // />
          // <CardsContainer usersByLocation={usersByLocation}/>
          <LocationDeck />
        )}
        {selectedTab === 1 && <InterestDeck />}
      </div>
    </>
  );
};

export default Dashboard;
