import Sidebar from "../../Components/Sidebar/Sidebar";
import Dashboard from "../../Components/Dashboard/Dashboard";
import "./Main.css";
import { useAuth } from "../../context/AuthContext";
import MobileBar from "../../Components/MobileBar/MobileBar";
import useWindowSize from "../../hooks/useWindowSize";
import AuthNavbar from "../../Components/AuthNavbar/AuthNavbar";

const Main = () => {
  const { loggedUser } = useAuth();
  const windowSize = useWindowSize();

  return (
    <div className="Main">
      {loggedUser && (windowSize.width > 768 ? <Sidebar /> : <MobileBar />)}
      <div className="container">
        <AuthNavbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Main;
