import Sidebar from "../../Components/Sidebar/Sidebar";
import "./EditProfile.css";
import { useAuth } from "../../context/AuthContext";
import MobileBar from "../../Components/MobileBar/MobileBar";
import useWindowSize from "../../hooks/useWindowSize";
import AuthNavbar from "../../Components/AuthNavbar/AuthNavbar";
import EditProfileForm from "../../Components/EditProfileForm/EditProfileForm";

const EditProfile = () => {
  const { loggedUser } = useAuth();
  const windowSize = useWindowSize();

  return (
    <div className="EditProfile">
      {loggedUser && (windowSize.width > 768 ? <Sidebar /> : <MobileBar />)}
      <div className="container">
        <AuthNavbar />
        <EditProfileForm/>
      </div>
    </div>
  );
};

export default EditProfile;
