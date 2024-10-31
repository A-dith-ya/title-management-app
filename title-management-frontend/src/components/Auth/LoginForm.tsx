import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import styles from "./Auth.module.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await apiService.login(data);
      dispatch(login(response.token));
      toast.success("Logged in successfully.");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email</label>
        <input
          {...register("email")}
          placeholder="Type your email"
          className={styles.input}
        />
        <p className={styles.errorMessage}>{errors.email?.message}</p>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="Type your password"
          className={styles.input}
        />
        <p className={styles.errorMessage}>{errors.password?.message}</p>
      </div>
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
