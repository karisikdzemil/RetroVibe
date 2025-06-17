import { render, screen } from "@testing-library/react";
import Login from "@/app/login/page";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@testing-library/jest-dom";

describe("Login component", () => {
  it("renders login form inputs and button", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();

    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });
});
