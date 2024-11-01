import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTitleForm from "../components/Dashboard/AddTitleForm";

describe("AddTitleForm Test", () => {
  test("calls onAddTitle with non-empty input and clears input after submission", () => {
    const onAddTitleMock = jest.fn();
    render(<AddTitleForm onAddTitle={onAddTitleMock} />);

    const input = screen.getByPlaceholderText("Enter new title");
    fireEvent.change(input, { target: { value: "Title 1" } });

    const addButton = screen.getByRole("button", { name: "Add Title" });
    fireEvent.click(addButton);

    expect(onAddTitleMock).toHaveBeenCalledWith("Title 1");
    expect(input).toHaveValue("");
  });
});
