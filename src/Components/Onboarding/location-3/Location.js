import "./Location.css";
import { ArrowBackIos } from "@mui/icons-material";
import { useState } from "react";

// helper
const regions = ['North', 'South', 'East', 'West']

const Location = ({ setCurrent, location, setLocation }) => {
  const [region, setRegion] = useState(location["location"]);

  const handleContinue = (e) => {
    e.preventDefault();
    setLocation({
      location: region,
    });
    setCurrent("BirthGender");
  };

  const handleBack = () => {
    setCurrent("EmailName");
  };

  return (
    <div className="location">
      <ArrowBackIos className="arrowback-icon" onClick={handleBack} />
      <h4>My location is...</h4>
      <form onSubmit={handleContinue}>
      <select
        name="regions"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        required
      >
        <option value="" selected disabled>
          Select an option
        </option>
        {regions.map((region) => {
          return (
            <option key={region} value={region}>
              {region}
            </option>
          );
        })}
      </select>
      <button className="continue-button"> Continue </button>
      </form>
    </div>
  );
};

export default Location;
