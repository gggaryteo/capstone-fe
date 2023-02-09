import './App.css';
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="overlay">
        <Outlet />
    </div>
  );
}

export default App;
