function AuthPageContainer({ children, error }) {
  console.log(error);
  return (
    <div>
      {error && <div className="error">{error}</div>}
      {children}
    </div>
  );
}

export default AuthPageContainer;
