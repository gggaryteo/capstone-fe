import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import { useState } from "react";
import AuthPageContainer from "../../Components/AuthPageContainer/AuthPageContainer";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState();

  const handleError = (error) => {
    setErrorMessage(error);
  };

  return (
    <AuthPageContainer error={errorMessage}>
      <RegisterForm onError={handleError} />
    </AuthPageContainer>
  );
};

export default Register;
