
const userLogout = () => {
  localStorage.removeItem("loggedUser");

  return {
    headers: null,
    isAuth: false,
    loggedUser: {
      biography: null,
      email: "",
      profilepic: null,
      token: "",
      username: "",
      online: false
    },
  };
}

export default userLogout;
