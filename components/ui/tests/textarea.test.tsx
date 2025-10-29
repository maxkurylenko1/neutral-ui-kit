import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "../textarea";

describe("Textarea", () => {
  it("renders correctly", () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Textarea label="Description" placeholder="Enter description" />);
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter description")
    ).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(<Textarea helperText="This is a helpful message" />);
    expect(screen.getByText("This is a helpful message")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<Textarea error="This field is required" />);
    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute("role", "alert");
  });

  it("applies error styling when error is present", () => {
    render(<Textarea error="Error message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("border-destructive");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("associates error with textarea via aria-describedby", () => {
    render(<Textarea error="Error message" />);
    const textarea = screen.getByRole("textbox");
    const errorId = textarea.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    expect(screen.getByText("Error message")).toHaveAttribute("id", errorId);
  });

  it("associates helper text with textarea via aria-describedby", () => {
    render(<Textarea helperText="Helper text" />);
    const textarea = screen.getByRole("textbox");
    const helperId = textarea.getAttribute("aria-describedby");
    expect(helperId).toBeTruthy();
    expect(screen.getByText("Helper text")).toHaveAttribute("id", helperId);
  });

  it("prioritizes error over helper text", () => {
    render(<Textarea error="Error" helperText="Helper" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.queryByText("Helper")).not.toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type here" />);
    const textarea = screen.getByPlaceholderText("Type here");

    await user.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
  });

  it("calls onChange handler", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Textarea onChange={handleChange} placeholder="Type here" />);
    const textarea = screen.getByPlaceholderText("Type here");

    await user.type(textarea, "A");
    expect(handleChange).toHaveBeenCalled();
  });

  it("disables textarea when disabled prop is true", () => {
    render(<Textarea disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("applies resize variants correctly", () => {
    const { rerender } = render(<Textarea resize="none" />);
    let textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize-none");

    rerender(<Textarea resize="vertical" />);
    textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize-y");

    rerender(<Textarea resize="horizontal" />);
    textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize-x");

    rerender(<Textarea resize="both" />);
    textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize");
  });

  it("applies custom className", () => {
    render(<Textarea className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("uses custom id when provided", () => {
    render(<Textarea id="custom-id" label="Test" />);
    const textarea = screen.getByLabelText("Test");
    expect(textarea).toHaveAttribute("id", "custom-id");
  });

  it("sets default rows when not using auto-resize", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).not.toHaveAttribute("rows");
  });

  it("sets minRows when using auto-resize", () => {
    render(<Textarea autoResize minRows={5} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("disables manual resize when auto-resize is enabled", () => {
    render(<Textarea autoResize resize="vertical" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize-none");
  });

  it("handles multiline text", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type here" />);
    const textarea = screen.getByPlaceholderText("Type here");

    await user.type(textarea, "Line 1{Enter}Line 2{Enter}Line 3");
    expect(textarea).toHaveValue("Line 1\nLine 2\nLine 3");
  });

  it("applies disabled styling to label", () => {
    render(<Textarea label="Disabled" disabled />);
    const label = screen.getByText("Disabled");
    expect(label).toHaveClass("opacity-50");
  });

  it("applies error styling to label", () => {
    render(<Textarea label="Required" error="Error message" />);
    const label = screen.getByText("Required");
    expect(label).toHaveClass("text-destructive");
  });

  it("supports controlled mode", async () => {
    const TestComponent = () => {
      const [value, setValue] = React.useState("");
      return (
        <div>
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Controlled"
          />
          <span data-testid="output">{value}</span>
        </div>
      );
    };

    const user = userEvent.setup();
    render(<TestComponent />);

    const textarea = screen.getByPlaceholderText("Controlled");
    await user.type(textarea, "Test");

    expect(screen.getByTestId("output")).toHaveTextContent("Test");
  });

  it("supports uncontrolled mode with defaultValue", () => {
    render(<Textarea defaultValue="Initial value" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("Initial value");
  });

  it("handles maxLength attribute", async () => {
    const user = userEvent.setup();
    render(<Textarea maxLength={10} />);
    const textarea = screen.getByRole("textbox");

    await user.type(textarea, "12345678901234");
    expect(textarea).toHaveValue("1234567890");
  });

  it("applies container className", () => {
    render(<Textarea containerClassName="custom-container" label="Test" />);
    const container = screen.getByText("Test").closest("div");
    expect(container).toHaveClass("custom-container");
  });

  it("supports required attribute", () => {
    render(<Textarea required />);
    expect(screen.getByRole("textbox")).toHaveAttribute("required");
  });

  it("supports readOnly attribute", () => {
    render(<Textarea readOnly defaultValue="Read only" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("readonly");
  });

  it("handles placeholder correctly", () => {
    render(<Textarea placeholder="Enter your message" />);
    expect(
      screen.getByPlaceholderText("Enter your message")
    ).toBeInTheDocument();
  });
});

import * as React from "react";
