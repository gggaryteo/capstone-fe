import axios from "axios";

async function getUserInterests({username}) {
  const response = await axios.get(`http://localhost:3001/user/${username}/interests`);
  const interests = response.data.interests
  return interests;
}
export default getUserInterests;
