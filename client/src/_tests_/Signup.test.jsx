import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "@/app/signup/page";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
useRouter.mockReturnValue({ push: jest.fn() });

describe("Signup page", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
  });

  it("renders the signup form", () => {
    expect(screen.getByText("Create Your Account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Create a password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Repeat your password")).toBeInTheDocument();
  });

  it("shows error if passwords don't match", () => {
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat your password"), {
      target: { value: "654321" },
    });

    fireEvent.click(screen.getByText("Sign Up"));

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });
});
