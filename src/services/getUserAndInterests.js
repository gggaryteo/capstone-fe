import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getUserInterests({username}) {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/${username}/interests`
    );
    const interests = response.data.interests;
    return interests;
  } catch (error) {
    errorHandler(error)
  }
}
export default getUserInterests;
