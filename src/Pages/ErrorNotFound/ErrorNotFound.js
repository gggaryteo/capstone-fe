import { Link } from "react-router-dom";

const ErrorNotFound = () => {
  return (
    <div className="error">
      <h1>404 Not Found</h1>
      <Link to="/">Redirect To Home</Link>
    </div>
  );
}

export default ErrorNotFound;
