import axios from "axios";
import errorHandler from "../helpers/errorHandler";

async function userLogin({ email, password }) {
  try {
    const { data } = await axios({
      data: { user: { email, password } },
      method: "POST",
      url: "http://localhost:3001/users/login",
    });

    const { user } = data;
    const headers = { Authorization: `Token ${user.token}` };

    const loggedIn = {
      headers,
      isAuth: true,
      loggedUser: user,
      username: user.username,
    };

    localStorage.setItem("loggedUser", JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error) {
    errorHandler(error);
  }
}

export default userLogin;
