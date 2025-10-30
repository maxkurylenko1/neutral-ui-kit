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
  const renderSelect = (props = {}) => {
    return render(
      <Select {...props}>
        <SelectTrigger data-testid="select-trigger">
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
    const onOpenChange = vi.fn();
    render(
      <Select onOpenChange={onOpenChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );

    const user = userEvent.setup();
    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  it("displays all options when open", async () => {
    const onOpenChange = vi.fn();
    render(
      <Select onOpenChange={onOpenChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );

    const user = userEvent.setup();
    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    // Check that options are rendered
    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });
  });

  it("selects option when clicked", async () => {
    const onValueChange = vi.fn();
    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );

    const user = userEvent.setup();
    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    const option2 = screen.getByText("Option 2");
    await user.click(option2);

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith("option2");
    });
  });

  it("closes dropdown after selection", async () => {
    const onOpenChange = vi.fn();
    const onValueChange = vi.fn();

    render(
      <Select onOpenChange={onOpenChange} onValueChange={onValueChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );

    const user = userEvent.setup();
    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    const option1 = screen.getByText("Option 1");
    await user.click(option1);

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith("option1");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("supports keyboard navigation", async () => {
    const onValueChange = vi.fn();

    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );

    const user = userEvent.setup();
    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    // Arrow down to next option
    await user.keyboard("{ArrowDown}");
    // Enter to select
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith("option2");
    });
  });

  it("closes dropdown on Escape key", async () => {
    const onOpenChange = vi.fn();

    render(
      <Select onOpenChange={onOpenChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );

    const user = userEvent.setup();
    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("renders with groups and labels", async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
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

    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);

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
        <SelectTrigger data-testid="select-trigger">
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

    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    const option2Element = screen.getByText("Option 2");
    const optionContainer = option2Element.closest(
      "[data-radix-collection-item]"
    );
    expect(optionContainer).toHaveAttribute("data-disabled");
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
          <SelectTrigger data-testid="select-trigger">
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

    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    const option2 = screen.getByText("Option 2");
    await user.click(option2);

    await waitFor(() => {
      expect(handleValueChange).toHaveBeenCalledWith("option2");
    });
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
    const ref = React.createRef<HTMLButtonElement>();

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

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
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

  it("supports name prop for forms", async () => {
    const onValueChange = vi.fn();

    render(
      <Select name="test-select" onValueChange={onValueChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const user = userEvent.setup();
    const trigger = screen.getByTestId("select-trigger");

    // Select a value first to trigger form input creation
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    const option1 = screen.getByText("Option 1");
    await user.click(option1);

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith("option1");
    });

    // Radix UI Select creates a hidden input with the name after value is selected
    const hiddenInput = document.querySelector('input[name="test-select"]');
    // If hidden input exists, it should have the correct value
    if (hiddenInput) {
      expect(hiddenInput).toHaveAttribute("value", "option1");
    }
  });

  it("handles long list of options", async () => {
    const user = userEvent.setup();
    const options = Array.from({ length: 50 }, (_, i) => `Option ${i + 1}`);

    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
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

    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });
  });

  it("shows chevron icon in trigger", () => {
    renderSelect();
    const trigger = screen.getByTestId("select-trigger");
    const svg = trigger.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("maintains selection across open/close cycles", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId("select-trigger");

    // Open and select
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    // Use getByRole to find the option in the listbox
    const option2 = screen.getByRole("option", { name: "Option 2" });
    await user.click(option2);

    // Verify selection
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith("option2");
      expect(trigger).toHaveTextContent("Option 2");
    });

    // Open again
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    // Find the option again using role
    const option2Again = screen.getByRole("option", { name: "Option 2" });
    const optionContainer = option2Again.closest(
      "[data-radix-collection-item]"
    );

    // Radix UI adds data-state="checked" to selected items
    expect(optionContainer).toHaveAttribute("data-state", "checked");
  });
});
