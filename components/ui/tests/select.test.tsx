import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "../select";
import * as React from "react";

describe("Select", () => {
  const renderSelect = () => {
    return render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );
  };

  it("renders trigger button", () => {
    renderSelect();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder when no value selected", () => {
    renderSelect();
    expect(screen.getByText("Select option")).toBeInTheDocument();
  });

  it("opens dropdown when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderSelect();

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Option 1" })
      ).toBeInTheDocument();
    });
  });

  it("displays all options when open", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(screen.getByRole("combobox"));

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Option 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Option 2" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Option 3" })
      ).toBeInTheDocument();
    });
  });

  it("selects option when clicked", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(screen.getByRole("combobox"));

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Option 2" })
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole("option", { name: "Option 2" }));

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toHaveTextContent("Option 2");
    });
  });

  it("closes dropdown after selection", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(screen.getByRole("combobox"));
    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Option 1" })
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole("option", { name: "Option 1" }));

    await waitFor(() => {
      expect(
        screen.queryByRole("option", { name: "Option 1" })
      ).not.toBeInTheDocument();
    });
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    renderSelect();

    const trigger = screen.getByRole("combobox");
    trigger.focus();

    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Option 1" })
      ).toBeInTheDocument();
    });

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(trigger).toHaveTextContent("Option 2");
    });
  });

  it("closes dropdown on Escape key", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(screen.getByRole("combobox"));

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Option 1" })
      ).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(
        screen.queryByRole("option", { name: "Option 1" })
      ).not.toBeInTheDocument();
    });
  });

  it("renders with groups and labels", async () => {
    const user = userEvent.setup();

    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    await user.click(screen.getByRole("combobox"));

    await waitFor(() => {
      expect(screen.getByText("Fruits")).toBeInTheDocument();
      expect(screen.getByText("Vegetables")).toBeInTheDocument();
    });
  });

  it("disables select when disabled prop is true", () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("disables specific options", async () => {
    const user = userEvent.setup();

    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2" disabled>
            Option 2
          </SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );

    await user.click(screen.getByRole("combobox"));

    await waitFor(() => {
      const disabledOption = screen.getByRole("option", { name: "Option 2" });
      expect(disabledOption).toHaveAttribute("data-disabled", "");
    });
  });

  it("can be controlled", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    const ControlledSelect = () => {
      const [value, setValue] = React.useState("");

      return (
        <Select
          value={value}
          onValueChange={(newValue) => {
            setValue(newValue);
            handleValueChange(newValue);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );
    };

    render(<ControlledSelect />);

    await user.click(screen.getByRole("combobox"));
    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Option 2" })
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole("option", { name: "Option 2" }));

    expect(handleValueChange).toHaveBeenCalledWith("option2");
  });

  it("supports default value", () => {
    render(
      <Select defaultValue="option2">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("Option 2");
  });

  it("applies custom className to trigger", () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole("combobox")).toHaveClass("custom-trigger");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <Select>
        <SelectTrigger ref={ref}>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(ref).toHaveBeenCalled();
  });

  it("handles required attribute", () => {
    render(
      <Select required>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-required",
      "true"
    );
  });

  it("supports name prop for forms", () => {
    render(
      <Select name="test-select">
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("name", "test-select");
  });

  it("handles long list of options", async () => {
    const user = userEvent.setup();
    const options = Array.from({ length: 50 }, (_, i) => `Option ${i + 1}`);

    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, i) => (
            <SelectItem key={i} value={`option${i + 1}`}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

    await user.click(screen.getByRole("combobox"));

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Option 1" })
      ).toBeInTheDocument();
    });
  });

  it("shows chevron icon in trigger", () => {
    renderSelect();
    const trigger = screen.getByRole("combobox");
    const svg = trigger.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
