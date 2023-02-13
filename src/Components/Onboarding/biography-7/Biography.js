import "./Biography.css";
import { ArrowBackIos } from "@mui/icons-material";
import React, { useState } from "react";

function Biography({ setCurrent, biography, setBiography, setIsPost }) {
  const [count, setCount] = useState(0);
  const [text, setText] = useState(biography["text"]);

  const handleFinish = (e) => {
    console.log(text)
    e.preventDefault();
    setBiography({ biography: text, });
    console.log(biography)
    setIsPost(true);
    // handle continue will be an axios.post
  };

  const handleBack = () => {
    setCurrent("Interests");
  };

  return (
    <div className="biography">
      <ArrowBackIos className="arrowback-icon" onClick={handleBack} />
      <form className="information" onSubmit={handleFinish}>
        <h4>Add a description about yourself...</h4>
        <textarea
          required
          placeholder="About yourself"
          rows="1"
          maxLength={300}
          onChange={(event) => {
            setCount(event.target.value.length);
            setText(event.target.value);
          }}
        ></textarea>
        <p>{count} / 300</p>
        <button className="finish-button-biography">Finish</button>
      </form>
    </div>
  );
}

export default Biography;
