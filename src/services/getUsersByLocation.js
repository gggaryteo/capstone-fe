import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getUsersByLocation(user) {
  try {
    console.log(user);
    const response = await axios.get(
      `http://localhost:3001/recommendations/location?userid=${user.id}`
    );
    const recommendedUsers = response.data;
    return recommendedUsers;
  } catch (error) {
    errorHandler(error);
  }
}

export default getUsersByLocation;
