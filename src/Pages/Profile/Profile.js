import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import MobileBar from "../../Components/MobileBar/MobileBar";
import useWindowSize from "../../hooks/useWindowSize";
import AuthNavbar from "../../Components/AuthNavbar/AuthNavbar";
import IndividualProfile from "../../Components/IndividualProfile/IndividualProfile";

const Profile = () => {
  const { loggedUser } = useAuth();
  const windowSize = useWindowSize();

  return (
    <div className="Profile">
      {loggedUser && (windowSize.width > 768 ? <Sidebar /> : <MobileBar />)}
      <div className="container">
        <AuthNavbar />
        <IndividualProfile/>
      </div>
    </div>
  );
};

export default Profile;
