import "./BirthGender.css";
import { ArrowBackIos } from "@mui/icons-material";
import React, { useState } from "react";

const genders = ["Male", "Female", "Others"];

function BirthGender({ setCurrent, birthGender, setBirthGender }) {
  const [birthYear, setBirthYear] = useState(birthGender["yearofbirth"]);
  const [gender, setGender] = useState(birthGender["gender"]);

  const handleContinue = (e) => {
    e.preventDefault();
    setBirthGender({
      yearofbirth: birthYear,
      gender: gender,
    });
    setCurrent("ProfilePic");
  };

  const handleBack = () => {
    setCurrent("Location");
  };

  return (
    <div className="birth-gender">
      <ArrowBackIos className="arrowback-icon" onClick={handleBack} />
      <form className="information" onSubmit={handleContinue}>
        <h4>My age and gender are...</h4>
        <input
          required
          className="birthYear"
          placeholder="Enter Year of Birth"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
        />
        <select
          required
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" selected disabled>
            Select gender
          </option>
          {genders.map((gender) => {
            return (
              <option key={gender} value={gender}>
                {gender}
              </option>
            );
          })}
        </select>
        <button className="continue-button">Continue</button>
      </form>
    </div>
  );
}

export default BirthGender;
