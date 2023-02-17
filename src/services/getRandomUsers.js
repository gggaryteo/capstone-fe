import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getRandomUsers(user) {
  try {
    console.log(user);
    const response = await axios.get(
      `http://localhost:3001/users/random-users?location=${user.location}&id=${user.id}`
    );
    const randomUsers = response.data;
    return randomUsers;
  } catch (error) {
    errorHandler(error);
  }
}

export default getRandomUsers;