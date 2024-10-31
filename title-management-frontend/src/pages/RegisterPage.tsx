import LoginForm from "../components/Auth/LoginForm";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="page-container">
      <h1>Title Management App</h1>
      <h2>Sign up</h2>
      <LoginForm />
      <Link to="/">Already have an account? Log in here</Link>
    </div>
  );
};

export default RegisterPage;