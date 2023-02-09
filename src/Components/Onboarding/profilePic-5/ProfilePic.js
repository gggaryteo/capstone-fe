import "./ProfilePic.css";
import { ArrowBackIos } from "@mui/icons-material";
import React, { useState } from "react";

function ProfilePic({ setCurrent, profilePic, setProfilePic }) {
  const [selectedImage, setSelectedImage] = useState(
    profilePic["profilepic"]
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setProfilePic({
      profilepic: selectedImage,
    });
    setCurrent("Interests");
  };

  const handleBack = () => {
    setCurrent("BirthGender");
  };

  return (
    <div className="profile-pic">
      <ArrowBackIos className="arrowback-icon" onClick={handleBack} />
      <form className="information" onSubmit={handleContinue}>
        <h4>Add a profile photo</h4>
        {selectedImage && (
          <div className="pic">
            <img
              alt="not found"
              width={"200px"}
              height={"200px"}
              src={selectedImage}
            />
          </div>
        )}
        <input
          type="file"
          name="myImage"
          onChange={handleFileChange}
          required
        />
        <button className="continue-button">Continue</button>
      </form>
    </div>
  );
}

export default ProfilePic;
