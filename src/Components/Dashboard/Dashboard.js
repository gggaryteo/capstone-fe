import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import getRandomUsers from "../../services/getRandomUsers";
import "./Dashboard.css";

const Dashboard = () => {
  const [randomUsers, setRandomUsers] = useState([]);
  const { loggedUser } = useAuth();

useEffect(() => {
  getRandomUsers(loggedUser)
    .then(setRandomUsers)
    .catch((error) => {
      console.error(error);
    });
}, [loggedUser]);


  return (
    <div>
      <div>
        <h2>Random Users</h2>
        {randomUsers.map((user) => (
          <div key={user.id}>
            <p>{user.username}</p>
            <p>{user.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
