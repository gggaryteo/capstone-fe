import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function getInterest() {
  try {
    const { data } = await axios({
      url: `http://localhost:3001/interests`,
    });
    
    const interestNames = data.map(data => data.name);
    console.log(interestNames);

    return interestNames;
  } catch (error) {
    errorHandler(error);
  }
}

export default getInterest;
