import LoginForm from "../components/Auth/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="page-container">
      <h1>Title Management App</h1>
      <h2>Login</h2>
      <LoginForm />
      <Link to="/register">Don't have an account? Sign up here</Link>
    </div>
  );
};

export default LoginPage;
