import axios from "axios";

const userLogout = async (email) => {
  localStorage.removeItem("loggedUser");
  console.log(email);
  try {
    // update the user's online status to false in the database
    await axios.post("http://localhost:3001/users/logout", { email });
    // return your response object
    return {
      headers: null,
      isAuth: false,
      loggedUser: {
        biography: null,
        email: "",
        profilepic: null,
        token: "",
        username: "",
        online: false,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

export default userLogout;
