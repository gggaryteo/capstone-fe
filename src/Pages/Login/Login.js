import LoginForm from "../../Components/LoginForm/LoginForm";
import { useState } from "react";
import AuthPageContainer from "../../Components/AuthPageContainer/AuthPageContainer";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState();

  const handleError = (error) => {
    setErrorMessage(error);
  };

  return (
    <AuthPageContainer error={errorMessage}>
      <LoginForm onError={handleError} />
    </AuthPageContainer>
  );
};

export default Login;
