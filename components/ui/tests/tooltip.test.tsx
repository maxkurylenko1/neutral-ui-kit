import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "../tooltip";
import { Button } from "../button";

describe("Tooltip", () => {
  it("renders trigger element", () => {
    render(
      <Tooltip content="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>
    );
    expect(
      screen.getByRole("button", { name: /hover me/i })
    ).toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });
  });

  it("hides tooltip when mouse leaves", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });

    await user.unhover(trigger);

    await waitFor(() => {
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });
  });

  it("shows tooltip on focus", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Tooltip text">
        <Button>Focus me</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button");
    await user.tab();

    expect(trigger).toHaveFocus();

    await waitFor(() => {
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });
  });

  it("hides tooltip on blur", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Tooltip content="Tooltip text">
          <Button>Focus me</Button>
        </Tooltip>
        <Button>Other button</Button>
      </div>
    );

    await user.tab();

    await waitFor(() => {
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });

    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });
  });

  it("renders on different sides", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Tooltip content="Tooltip text" side="top">
        <Button>Hover</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button");

    await user.hover(trigger);
    await waitFor(() => {
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });

    await user.unhover(trigger);

    rerender(
      <Tooltip content="Tooltip text" side="bottom">
        <Button>Hover</Button>
      </Tooltip>
    );

    await user.hover(trigger);
    await waitFor(() => {
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });
  });

  it("can be controlled", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <Tooltip
        content="Tooltip text"
        open={true}
        onOpenChange={handleOpenChange}
      >
        <Button>Button</Button>
      </Tooltip>
    );

    await waitFor(() => {
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    expect(handleOpenChange).toHaveBeenCalled();
  });

  it("respects custom delay duration", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Tooltip text" delayDuration={0}>
        <Button>Hover me</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    // With 0 delay, should appear almost immediately
    await waitFor(
      () => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      },
      { timeout: 100 }
    );
  });

  it("renders rich content", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip
        content={
          <div>
            <p>Title</p>
            <p>Description</p>
          </div>
        }
      >
        <Button>Hover</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  it("works with disabled elements when wrapped", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Tooltip text">
        <span>
          <Button disabled>Disabled</Button>
        </span>
      </Tooltip>
    );

    const wrapper = screen.getByText("Disabled").parentElement;
    if (wrapper) {
      await user.hover(wrapper);

      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });
    }
  });

  it("applies custom className to content", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Tooltip text" contentClassName="custom-tooltip">
        <Button>Hover</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      const tooltip = screen.getByText("Tooltip text");
      expect(tooltip).toHaveClass("custom-tooltip");
    });
  });

  it("forwards ref to trigger", () => {
    const ref = vi.fn();

    render(
      <Tooltip content="Tooltip text" ref={ref}>
        <Button>Button</Button>
      </Tooltip>
    );

    expect(ref).toHaveBeenCalled();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Tooltip content="First tooltip">
          <Button>First</Button>
        </Tooltip>
        <Tooltip content="Second tooltip">
          <Button>Second</Button>
        </Tooltip>
      </div>
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();

    await waitFor(() => {
      expect(screen.getByText("First tooltip")).toBeInTheDocument();
    });

    await user.tab();
    expect(screen.getByRole("button", { name: "Second" })).toHaveFocus();

    await waitFor(() => {
      expect(screen.queryByText("First tooltip")).not.toBeInTheDocument();
      expect(screen.getByText("Second tooltip")).toBeInTheDocument();
    });
  });

  it("closes on ESC key", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Tooltip text">
        <Button>Hover</Button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });
  });

  it("handles multiple tooltips simultaneously", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Tooltip content="First" skipDelayDuration={0}>
          <Button>Button 1</Button>
        </Tooltip>
        <Tooltip content="Second" skipDelayDuration={0}>
          <Button>Button 2</Button>
        </Tooltip>
      </div>
    );

    const button1 = screen.getByRole("button", { name: "Button 1" });
    await user.hover(button1);

    await waitFor(() => {
      expect(screen.getByText("First")).toBeInTheDocument();
    });

    await user.unhover(button1);

    const button2 = screen.getByRole("button", { name: "Button 2" });
    await user.hover(button2);

    await waitFor(() => {
      expect(screen.getByText("Second")).toBeInTheDocument();
    });
  });
});
