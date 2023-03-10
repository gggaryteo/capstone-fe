import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Meetups.css";
import { useAuth } from "../../context/AuthContext";
import MobileBar from "../../Components/MobileBar/MobileBar";
import useWindowSize from "../../hooks/useWindowSize";
import AuthNavbar from "../../Components/AuthNavbar/AuthNavbar";
import MeetupForm from "../../Components/Meetup/MeetupForm";

const Meetups = () => {
  const { loggedUser } = useAuth();
  const windowSize = useWindowSize();

  return (
    <div className="Meetups">
      {loggedUser && (windowSize.width > 768 ? <Sidebar /> : <MobileBar />)}
      <div className="container">
        <AuthNavbar />
        <MeetupForm />
      </div>
    </div>
  );
};

export default Meetups;
