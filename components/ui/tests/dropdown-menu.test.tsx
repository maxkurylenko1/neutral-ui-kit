import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import * as React from "react";

describe("DropdownMenu", () => {
  const renderDropdown = () => {
    return render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  it("renders trigger button", () => {
    renderDropdown();
    expect(
      screen.getByRole("button", { name: /open menu/i })
    ).toBeInTheDocument();
  });

  it("opens menu when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderDropdown();

    const trigger = screen.getByRole("button", { name: /open menu/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });

  it("displays menu items when open", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByRole("menuitem", { name: "Item 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("menuitem", { name: "Item 2" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("menuitem", { name: "Item 3" })
      ).toBeInTheDocument();
    });
  });

  it("closes menu when item is clicked", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("menuitem", { name: "Item 1" }));

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("closes menu when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("closes menu when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button data-testid="outside" style={{ pointerEvents: "auto" }}>
          Outside
        </button>
      </div>
    );

    await user.click(screen.getByRole("button", { name: /open/i }));

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("calls onSelect when item is clicked", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleSelect}>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("menuitem"));

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard navigation with arrow keys", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    const items = screen.getAllByRole("menuitem");

    await user.keyboard("{ArrowDown}");
    expect(items[0]).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(items[1]).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(items[0]).toHaveFocus();
  });

  it("activates item with Enter key", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleSelect}>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(handleSelect).toHaveBeenCalled();
  });

  it("renders with label", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Label</DropdownMenuLabel>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("My Label")).toBeInTheDocument();
    });
  });

  it("renders separator", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      const separator = document.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
    });
  });

  it("disables items when disabled prop is true", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onSelect={handleSelect}>
            Disabled Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("menuitem")).toBeInTheDocument();
    });

    const disabledItem = screen.getByRole("menuitem");
    expect(disabledItem).toHaveAttribute("data-disabled", "");

    await user.click(disabledItem);
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it("supports checkbox items", async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const [checked, setChecked] = React.useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={checked}
              onCheckedChange={setChecked}
            >
              Checkbox Item
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    render(<TestComponent />);

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      const checkbox = screen.getByRole("menuitemcheckbox");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("data-state", "unchecked");
    });

    const checkbox = screen.getByRole("menuitemcheckbox");
    await user.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toHaveAttribute("data-state", "checked");
    });
  });

  it("supports radio group", async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const [value, setValue] = React.useState("option1");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
              <DropdownMenuRadioItem value="option1">
                Option 1
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="option2">
                Option 2
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    render(<TestComponent />);

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      const radio1 = screen.getByRole("menuitemradio", { name: "Option 1" });
      const radio2 = screen.getByRole("menuitemradio", { name: "Option 2" });
      expect(radio1).toHaveAttribute("data-state", "checked");
      expect(radio2).toHaveAttribute("data-state", "unchecked");
    });

    const radio2 = screen.getByRole("menuitemradio", { name: "Option 2" });
    await user.click(radio2);

    await waitFor(() => {
      expect(radio2).toHaveAttribute("data-state", "checked");
    });
  });

  it("supports submenu", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Subitem 1</DropdownMenuItem>
              <DropdownMenuItem>Subitem 2</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Submenu")).toBeInTheDocument();
    });

    await user.hover(screen.getByText("Submenu"));

    await waitFor(() => {
      expect(screen.getByText("Subitem 1")).toBeInTheDocument();
      expect(screen.getByText("Subitem 2")).toBeInTheDocument();
    });
  });

  it("can be controlled", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    const ControlledDropdown = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <DropdownMenu
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            handleOpenChange(isOpen);
          }}
        >
          <DropdownMenuTrigger asChild>
            <Button>Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    render(<ControlledDropdown />);

    await user.click(screen.getByRole("button"));

    expect(handleOpenChange).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });

  it("applies custom className to content", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="custom-menu">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      const menu = screen.getByRole("menu");
      expect(menu).toHaveClass("custom-menu");
    });
  });

  it("forwards ref to trigger", () => {
    const ref = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger ref={ref} asChild>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(ref).toHaveBeenCalled();
  });
});
