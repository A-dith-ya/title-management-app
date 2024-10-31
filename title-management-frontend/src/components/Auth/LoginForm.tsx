import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./LoginForm.module.css";

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

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
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
          placeholder="Type your password"
          className={styles.input}
        />
        <p className={styles.errorMessage}>{errors.password?.message}</p>
      </div>
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
