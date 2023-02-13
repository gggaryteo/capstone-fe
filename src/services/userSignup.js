import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function userSignUp (allUserParams) {

  console.log(allUserParams);
  try {
    const { data } = await axios({
      data: {
        user: allUserParams,
      },
      method: "POST",
      url: "http://localhost:3001/users",
    });

    const { user } = data;
    const headers = { Authorization: `Token ${user.token}` };

    const loggedIn = { headers, isAuth: true, loggedUser: user };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error) {
    errorHandler(error);
  }
}

export default userSignUp;
