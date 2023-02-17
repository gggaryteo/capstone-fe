import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Chats.css";
import { useAuth } from "../../context/AuthContext";
import MobileBar from "../../Components/MobileBar/MobileBar";
import useWindowSize from "../../hooks/useWindowSize";
import AuthNavbar from "../../Components/AuthNavbar/AuthNavbar";
import ChatApp from "../../Components/Chat/ChatApp";

const Chats = () => {
  const { loggedUser } = useAuth();
  const windowSize = useWindowSize();

  return (
    <div className="Chats">
      {loggedUser && (windowSize.width > 768 ? <Sidebar /> : <MobileBar />)}
      <div className="container">
        <AuthNavbar/>
        <ChatApp />
      </div>
    </div>
  );
};

export default Chats;
