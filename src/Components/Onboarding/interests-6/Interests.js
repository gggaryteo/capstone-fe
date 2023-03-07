import React, { useState, useEffect } from "react";
import "./Interests.css";
import { ArrowBackIos } from "@mui/icons-material";
import getInterest from "../../../services/getInterest";


function Interests({ setCurrent, interests, setInterests }) {
  const [interestsList, setInterestsList] = useState([]);
  const [skillsList, setSkillsList] = useState(interests);

  useEffect(() => {
    getInterest()
      .then(setInterestsList)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFormChange = (event, index) => {
    let data = [...skillsList];
    console.log(data);
    data[index][event.target.name] = event.target.value;
    console.log(data[index][event.target.name])
    setSkillsList(data);
    console.log(skillsList);
  };

  // event.target.name === returns name of the category
  // event.target.value === returns the selected option

  const addFields = () => {
    let object = {
      interest: "",
      self_skill: "",
    };

    setSkillsList([...skillsList, object]);
  };

  const removeFields = (index) => {
    let data = [...skillsList];
    data.splice(index, 1);
    setSkillsList(data);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setInterests(skillsList);
    setCurrent("Biography");
  };

  const handleBack = () => {
    setCurrent("ProfilePic");
  };

  return (
    <div className="interests">
      <ArrowBackIos className="arrowback-icon" onClick={handleBack} />
      <h4>My preferred interests and skills are...</h4>
      <form onSubmit={handleContinue}>
        {skillsList.map((form, index) => {
          return (
            <div className="interest-skill" key={index}>
              <select
                required
                name="interest"
                className="select-interest"
                onChange={(event) => handleFormChange(event, index)}
                value={form.interest}
              >
                <option value="" selected disabled>
                  Select an interest
                </option>
                {interestsList.map((interest) => {
                  if (skillsList.find((e) => e.interest === interest)) {
                    return (
                      <option key={interest} value={interest} selected disabled>
                        {interest}
                      </option>
                    );
                  } else {
                    return (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    );
                  }
                })}
              </select>
              <select
                required
                name="self_skill"
                onChange={(event) => handleFormChange(event, index)}
                value={form.self_skill}
              >
                <option value="" selected disabled>
                  Select a skill
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {skillsList.length === 1 ? (
                <></>
              ) : (
                <button className="remove" onClick={() => removeFields(index)}>
                  x
                </button>
              )}
            </div>
          );
        })}

        {skillsList.length < 3 ? (
          <button className="add" onClick={addFields}>
            +
          </button>
        ) : (
          <></>
        )}
        <button className="continue">Continue</button>
      </form>
    </div>
  );
}

export default Interests;
