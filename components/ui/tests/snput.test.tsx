import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../input";
import { Mail } from "lucide-react";

describe("Input", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Input label="Email" placeholder="you@example.com" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(<Input helperText="This is a helpful message" />);
    expect(screen.getByText("This is a helpful message")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<Input error="This field is required" />);
    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute("role", "alert");
  });

  it("applies error styling when error is present", () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-destructive");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("associates error with input via aria-describedby", () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole("textbox");
    const errorId = input.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    expect(screen.getByText("Error message")).toHaveAttribute("id", errorId);
  });

  it("associates helper text with input via aria-describedby", () => {
    render(<Input helperText="Helper text" />);
    const input = screen.getByRole("textbox");
    const helperId = input.getAttribute("aria-describedby");
    expect(helperId).toBeTruthy();
    expect(screen.getByText("Helper text")).toHaveAttribute("id", helperId);
  });

  it("prioritizes error over helper text", () => {
    render(<Input error="Error" helperText="Helper" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.queryByText("Helper")).not.toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");

    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("calls onChange handler", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");

    await user.type(input, "A");
    expect(handleChange).toHaveBeenCalled();
  });

  it("disables input when disabled prop is true", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("applies size variants correctly", () => {
    const { rerender } = render(<Input size="sm" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-9");

    rerender(<Input size="lg" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-11");
  });

  it("renders with left icon", () => {
    render(<Input leftIcon={<Mail data-testid="mail-icon" />} />);
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  });

  it("applies correct padding when icons are present", () => {
    render(<Input leftIcon={<span>L</span>} rightIcon={<span>R</span>} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pl-10", "pr-10");
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("uses custom id when provided", () => {
    render(<Input id="custom-id" label="Test" />);
    const input = screen.getByLabelText("Test");
    expect(input).toHaveAttribute("id", "custom-id");
  });
});
