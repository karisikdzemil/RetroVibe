import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Home from "@/app/page";

describe("Home component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const headingElement = screen.getByText(/relive your childhood memories/i);
    expect(headingElement).toBeInTheDocument();
  });
});
