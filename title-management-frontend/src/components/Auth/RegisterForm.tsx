import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Auth.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await apiService.register(data);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Username</label>
        <input
          {...register("username")}
          placeholder="Type your username"
          className={styles.input}
        />
        <p className={styles.errorMessage}>{errors.username?.message}</p>
      </div>
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
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
