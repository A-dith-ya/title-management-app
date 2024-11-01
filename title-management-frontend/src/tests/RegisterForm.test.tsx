import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterForm from "../components/Auth/RegisterForm";
import apiService from "../services/apiService";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../services/apiService", () => ({
  register: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("RegisterForm Component", () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Form Validation", () => {
    it("shows error messages for empty fields", async () => {
      renderComponent();

      const submitButton = screen.getByRole("button", { name: "Register" });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Username is required")).toBeInTheDocument();
        expect(
          screen.getByText("Email address is required")
        ).toBeInTheDocument();
        expect(screen.getByText("Password is required")).toBeInTheDocument();
      });
    });

    it("validates email format", async () => {
      renderComponent();

      const emailInput = screen.getByPlaceholderText("Type your email");
      const submitButton = screen.getByRole("button", { name: "Register" });

      fireEvent.change(emailInput, { target: { value: "invalid email" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Invalid email format")).toBeInTheDocument();
      });
    });

    it("validates password length", async () => {
      renderComponent();

      const passwordInput = screen.getByPlaceholderText("Type your password");
      const submitButton = screen.getByRole("button", { name: "Register" });

      fireEvent.change(passwordInput, { target: { value: "12345" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Password must be at least 6 characters")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Form Submission", () => {
    it("submits form with valid data", async () => {
      (apiService.register as jest.Mock).mockResolvedValue({});

      renderComponent();

      const usernameInput = screen.getByPlaceholderText("Type your username");
      const emailInput = screen.getByPlaceholderText("Type your email");
      const passwordInput = screen.getByPlaceholderText("Type your password");
      const submitButton = screen.getByRole("button", { name: "Register" });

      fireEvent.change(usernameInput, { target: { value: "testuser" } });
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(apiService.register).toHaveBeenCalledWith({
          username: "testuser",
          email: "test@example.com",
          password: "password123",
        });

        expect(toast.success).toHaveBeenCalledWith("Registration successful!");

        expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
      });
    });
  });
});
