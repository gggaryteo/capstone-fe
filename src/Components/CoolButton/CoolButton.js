import React from "react";
import './CoolButton.css'

const CoolButton = ({ onClick, children }) => {

  return (
      <button className="cool-button" onClick={onClick}>
        {children}
      </button>
  );
};

export default CoolButton;
