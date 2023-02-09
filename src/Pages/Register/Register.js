import React, { useState, useEffect } from 'react';
import Credentials from '../../Components/Onboarding/credentials-1/Credentials'
import EmailName from '../../Components/Onboarding/emailName-2/EmailName';
import Location from '../../Components/Onboarding/location-3/Location';
import BirthGender from '../../Components/Onboarding/birthGender-4/BirthGender';
import ProfilePic from '../../Components/Onboarding/profilePic-5/ProfilePic';
import Interests from '../../Components/Onboarding/interests-6/Interests';
import Biography from '../../Components/Onboarding/biography-7/Biography';
import { useNavigate } from 'react-router-dom';

const userParams = {
  username: "",
  password: "",
  email: "",
  firstname: "",
  profilepic: "",
  location: "",
  gender: "",
  yearofbirth: "",
  biography: "",
  interests: [],
};

const Register= () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("Credentials")
  const [credentials, setCredentials] = useState({
    username: "Test User",
    password: "12345",
  });
  const [emailName, setEmailName] = useState({
    firstname: "Test",
    email: "testuser@gmail.com",
  });
  const [location, setLocation] = useState({ location: "" });
  const [birthGender, setBirthGender] = useState({ yearofbirth: "", gender: "" });
  const [profilePic, setProfilePic] = useState({ profilepic: "" });
  const [interests, setInterests] = useState([{ interest: "", self_skill: "" }]);
  const [biography, setBiography] = useState({ biography: "" });

  const [isPost, setIsPost] = useState(false);
  const [allUserParams, setAllUserParams] = useState(userParams);

  useEffect(() => {
    setAllUserParams({
      username: credentials["username"],
      password: credentials["password"],
      firstname: emailName["firstname"],
      email: emailName["email"],
      location: location["location"],
      yearofbirth: birthGender["yearofbirth"],
      gender: birthGender["gender"],
      profilepic: profilePic["profilepic"],
      interests: interests,
      biography: biography["biography"],
    });
    console.log(allUserParams);
  }, [
    credentials,
    emailName,
    location,
    birthGender,
    profilePic,
    interests,
    biography,
    isPost,
  ]);

  return (
    <>
      {current === "Credentials" && (
        <Credentials
          setCurrent={setCurrent}
          credentials={credentials}
          setCredentials={setCredentials}
        />
      )}
      {current === "EmailName" && (
        <EmailName
          setCurrent={setCurrent}
          emailName={emailName}
          setEmailName={setEmailName}
        />
      )}
      {current === "Location" && (
        <Location
          setCurrent={setCurrent}
          location={location}
          setLocation={setLocation}
        />
      )}
      {current === "BirthGender" && (
        <BirthGender
          setCurrent={setCurrent}
          birthGender={birthGender}
          setBirthGender={setBirthGender}
        />
      )}
      {current === "ProfilePic" && (
        <ProfilePic
          setCurrent={setCurrent}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
        />
      )}
      {current === "Interests" && (
        <Interests setCurrent={setCurrent} interests={interests} setInterests={setInterests} />
      )}
      {current === "Biography" && (
        <Biography
          setCurrent={setCurrent}
          biography={biography}
          setBiography={setBiography}
          setIsPost={setIsPost}
        />
      )}
      {/*  {current === "Last" && <Last postDetails={() => postUserDetails)} />} */}
    </>
  );
};

export default Register;
 