import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  it("renders correctly", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(
      <Checkbox label="Newsletter" description="Receive weekly updates" />
    );
    expect(screen.getByText("Receive weekly updates")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<Checkbox error="This field is required" />);
    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute("role", "alert");
  });

  it("applies error styling when error is present", () => {
    render(<Checkbox error="Error message" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("border-destructive");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
  });

  it("renders in checked state", () => {
    render(<Checkbox checked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("renders in unchecked state", () => {
    render(<Checkbox checked={false} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  });

  it("renders in indeterminate state", () => {
    render(<Checkbox checked="indeterminate" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");
  });

  it("handles user clicks", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox label="Click me" onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("handles label clicks", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox label="Click me" onCheckedChange={handleChange} />);
    const label = screen.getByText("Click me");

    await user.click(label);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("disables checkbox when disabled prop is true", () => {
    render(<Checkbox disabled label="Disabled" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("does not trigger onChange when disabled", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox disabled onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("associates description with checkbox via aria-describedby", () => {
    render(<Checkbox label="Test" description="Test description" />);
    const checkbox = screen.getByRole("checkbox");
    const descriptionId = checkbox.getAttribute("aria-describedby");
    expect(descriptionId).toBeTruthy();
    expect(screen.getByText("Test description")).toHaveAttribute(
      "id",
      descriptionId
    );
  });

  it("associates error with checkbox via aria-describedby", () => {
    render(<Checkbox error="Error message" />);
    const checkbox = screen.getByRole("checkbox");
    const errorId = checkbox.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    expect(screen.getByText("Error message")).toHaveAttribute("id", errorId);
  });

  it("associates both description and error via aria-describedby", () => {
    render(<Checkbox label="Test" description="Description" error="Error" />);
    const checkbox = screen.getByRole("checkbox");
    const describedBy = checkbox.getAttribute("aria-describedby");
    expect(describedBy).toContain(
      screen.getByText("Description").getAttribute("id")
    );
    expect(describedBy).toContain(screen.getByText("Error").getAttribute("id"));
  });

  it("can be controlled", async () => {
    const TestComponent = () => {
      const [checked, setChecked] = React.useState(false);
      return (
        <div>
          <Checkbox
            checked={checked}
            onCheckedChange={(value) => setChecked(value === true)}
          />
          <span>{checked ? "Checked" : "Unchecked"}</span>
        </div>
      );
    };

    const user = userEvent.setup();
    render(<TestComponent />);

    expect(screen.getByText("Unchecked")).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(screen.getByText("Checked")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Checkbox className="custom-class" />);
    expect(screen.getByRole("checkbox")).toHaveClass("custom-class");
  });

  it("applies container className when label is present", () => {
    const { container } = render(
      <Checkbox label="Test" containerClassName="custom-container" />
    );
    const outerContainer = container.querySelector(".custom-container");
    expect(outerContainer).toBeInTheDocument();
    expect(outerContainer).toHaveClass("flex");
    expect(outerContainer).toHaveClass("flex-col");
    expect(outerContainer).toHaveClass("gap-2");
  });

  it("uses custom id when provided", () => {
    render(<Checkbox id="custom-id" label="Test" />);
    const checkbox = screen.getByLabelText("Test");
    expect(checkbox).toHaveAttribute("id", "custom-id");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("supports keyboard navigation", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    checkbox.focus();
    await user.keyboard(" ");

    expect(handleChange).toHaveBeenCalled();
  });
});

import * as React from "react";
