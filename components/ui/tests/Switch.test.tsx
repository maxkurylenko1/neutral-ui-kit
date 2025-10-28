import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "../Switch";

describe("Switch", () => {
  it("renders correctly", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(
      <Switch label="Notifications" description="Receive push notifications" />
    );
    expect(screen.getByText("Receive push notifications")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<Switch error="This field is required" />);
    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute("role", "alert");
  });

  it("applies error styling when error is present", () => {
    render(<Switch error="Error message" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-invalid", "true");
  });

  it("renders in checked state", () => {
    render(<Switch checked={true} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("data-state", "checked");
  });

  it("renders in unchecked state", () => {
    render(<Switch checked={false} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("data-state", "unchecked");
  });

  it("handles user clicks", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Switch label="Click me" onCheckedChange={handleChange} />);
    const switchElement = screen.getByRole("switch");

    await user.click(switchElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("handles label clicks", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Switch label="Click me" onCheckedChange={handleChange} />);
    const label = screen.getByText("Click me");

    await user.click(label);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("disables switch when disabled prop is true", () => {
    render(<Switch disabled label="Disabled" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeDisabled();
  });

  it("does not trigger onChange when disabled", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Switch disabled onCheckedChange={handleChange} />);
    const switchElement = screen.getByRole("switch");

    await user.click(switchElement);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("associates description with switch via aria-describedby", () => {
    render(<Switch label="Test" description="Test description" />);
    const switchElement = screen.getByRole("switch");
    const descriptionId = switchElement.getAttribute("aria-describedby");
    expect(descriptionId).toBeTruthy();
    expect(screen.getByText("Test description")).toHaveAttribute(
      "id",
      descriptionId
    );
  });

  it("associates error with switch via aria-describedby", () => {
    render(<Switch error="Error message" />);
    const switchElement = screen.getByRole("switch");
    const errorId = switchElement.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    expect(screen.getByText("Error message")).toHaveAttribute("id", errorId);
  });

  it("associates both description and error via aria-describedby", () => {
    render(<Switch label="Test" description="Description" error="Error" />);
    const switchElement = screen.getByRole("switch");
    const describedBy = switchElement.getAttribute("aria-describedby");
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
          <Switch checked={checked} onCheckedChange={setChecked} />
          <span>{checked ? "On" : "Off"}</span>
        </div>
      );
    };

    const user = userEvent.setup();
    render(<TestComponent />);

    expect(screen.getByText("Off")).toBeInTheDocument();

    const switchElement = screen.getByRole("switch");
    await user.click(switchElement);

    expect(screen.getByText("On")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Switch className="custom-class" />);
    expect(screen.getByRole("switch")).toHaveClass("custom-class");
  });

  it("applies container className when label is present", () => {
    render(<Switch label="Test" containerClassName="custom-container" />);
    const container = screen.getByText("Test").closest("div")?.parentElement;
    expect(container).toHaveClass("custom-container");
  });

  it("uses custom id when provided", () => {
    render(<Switch id="custom-id" label="Test" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("id", "custom-id");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Switch ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("supports keyboard navigation", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Switch onCheckedChange={handleChange} />);
    const switchElement = screen.getByRole("switch");

    switchElement.focus();
    await user.keyboard(" ");

    expect(handleChange).toHaveBeenCalled();
  });

  it("toggles state correctly", async () => {
    const user = userEvent.setup();
    render(<Switch defaultChecked={false} />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("data-state", "unchecked");

    await user.click(switchElement);
    expect(switchElement).toHaveAttribute("data-state", "checked");

    await user.click(switchElement);
    expect(switchElement).toHaveAttribute("data-state", "unchecked");
  });

  it("applies disabled styling to label", () => {
    render(<Switch label="Disabled" disabled />);
    const label = screen.getByText("Disabled");
    expect(label).toHaveClass("peer-disabled:opacity-50");
  });

  it("applies disabled styling to description", () => {
    render(<Switch label="Test" description="Description" disabled />);
    const description = screen.getByText("Description");
    expect(description).toHaveClass("opacity-50");
  });
});

// Need to import React for the controlled test
import * as React from "react";
