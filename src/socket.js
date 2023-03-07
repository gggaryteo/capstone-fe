import { io } from "socket.io-client";

const URL = "http://localhost:3001"; //backend URL, rmb to put in .env before pushing
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log("printing whatever");
  console.log(event, args);
});

export default socket;
