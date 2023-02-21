// To get a list of recommended users by interests from the DB

import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getUsersByInterests(user) {
  try {
    console.log(user);
    const response = await axios.get(
      `http://localhost:3001/recommendations/interest?userid=${user.id}`
    );
    const recommendedUsers = response.data;
    return recommendedUsers;
  } catch (error) {
    errorHandler(error);
  }
}

export default getUsersByInterests;
