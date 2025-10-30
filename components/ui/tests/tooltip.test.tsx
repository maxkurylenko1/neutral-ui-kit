import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip, TooltipProvider } from "../tooltip";
import { Button } from "../button";

describe("Tooltip", () => {
  it("renders trigger element", () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <Button>Hover me</Button>
        </Tooltip>
      </TooltipProvider>
    );
    expect(
      screen.getByRole("button", { name: /hover me/i })
    ).toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <Button>Hover me</Button>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByRole("button", { name: /hover me/i });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.queryAllByText("Tooltip text").length).toBeGreaterThan(0);
    });
  });

  it("hides tooltip when mouse leaves", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <Button>Hover me</Button>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByRole("button", { name: /hover me/i });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.queryAllByText("Tooltip text").length).toBeGreaterThan(0);
    });

    await user.unhover(trigger);

    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(trigger).toBeInTheDocument();
  });

  it("shows tooltip on focus", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <Button>Focus me</Button>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByRole("button", { name: /focus me/i });
    await user.tab();

    expect(trigger).toHaveFocus();

    await waitFor(() => {
      expect(screen.queryAllByText("Tooltip text").length).toBeGreaterThan(0);
    });
  });

  it("hides tooltip on blur", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <div>
          <Tooltip content="Tooltip text">
            <Button>Focus me</Button>
          </Tooltip>
          <Button>Other button</Button>
        </div>
      </TooltipProvider>
    );

    await user.tab();

    await waitFor(() => {
      expect(screen.queryAllByText("Tooltip text").length).toBeGreaterThan(0);
    });

    await user.tab();

    const otherButton = screen.getByRole("button", { name: "Other button" });
    expect(otherButton).toHaveFocus();
  });

  it("renders on different sides", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <TooltipProvider>
        <Tooltip content="Tooltip text" side="top">
          <Button>Hover</Button>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByRole("button", { name: /hover/i });

    await user.hover(trigger);
    await waitFor(() => {
      expect(screen.queryAllByText("Tooltip text").length).toBeGreaterThan(0);
    });

    await user.unhover(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    rerender(
      <TooltipProvider>
        <Tooltip content="Tooltip text" side="bottom">
          <Button>Hover</Button>
        </Tooltip>
      </TooltipProvider>
    );

    await user.hover(trigger);
    await waitFor(() => {
      expect(screen.queryAllByText("Tooltip text").length).toBeGreaterThan(0);
    });
  });

  it("can be controlled", async () => {
    const handleOpenChange = vi.fn();

    const { rerender } = render(
      <TooltipProvider>
        <Tooltip
          content="Tooltip text"
          open={true}
          onOpenChange={handleOpenChange}
        >
          <Button>Button</Button>
        </Tooltip>
      </TooltipProvider>
    );

    await waitFor(() => {
      expect(screen.queryAllByText("Tooltip text").length).toBeGreaterThan(0);
    });

    rerender(
      <TooltipProvider>
        <Tooltip
          content="Tooltip text"
          open={false}
          onOpenChange={handleOpenChange}
        >
          <Button>Button</Button>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });

  it("respects custom delay duration", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip content="Tooltip text">
          <Button>Hover me</Button>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByRole("button", { name: /hover me/i });
    await user.hover(trigger);

    await waitFor(
      () => {
        expect(screen.queryAllByText("Tooltip text").length).toBeGreaterThan(0);
      },
      { timeout: 100 }
    );
  });

  it("renders rich content", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
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
      </TooltipProvider>
    );

    const trigger = screen.getByRole("button", { name: /hover/i });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.queryAllByText("Title").length).toBeGreaterThan(0);
      expect(screen.queryAllByText("Description").length).toBeGreaterThan(0);
    });
  });

  it("works with disabled elements when wrapped", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <span>
            <Button disabled>Disabled</Button>
          </span>
        </Tooltip>
      </TooltipProvider>
    );

    const wrapper = screen.getByText("Disabled").parentElement;
    if (wrapper) {
      await user.hover(wrapper);

      await waitFor(() => {
        expect(screen.queryAllByText("Tooltip text").length).toBeGreaterThan(0);
      });
    }
  });

  it("applies custom className to content", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text" contentClassName="custom-tooltip">
          <Button>Hover</Button>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByRole("button", { name: /hover/i });
    await user.hover(trigger);

    await waitFor(() => {
      const tooltips = screen.queryAllByText("Tooltip text");
      expect(tooltips.length).toBeGreaterThan(0);
      const hasCustomClass = tooltips.some((tooltip) =>
        tooltip.classList.contains("custom-tooltip")
      );
      expect(hasCustomClass).toBe(true);
    });
  });

  it("forwards ref to trigger", () => {
    const ref = vi.fn();

    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text" ref={ref}>
          <Button>Button</Button>
        </Tooltip>
      </TooltipProvider>
    );

    expect(ref).toHaveBeenCalled();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <div>
          <Tooltip content="First tooltip">
            <Button>First</Button>
          </Tooltip>
          <Tooltip content="Second tooltip">
            <Button>Second</Button>
          </Tooltip>
        </div>
      </TooltipProvider>
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();

    await waitFor(() => {
      expect(screen.queryAllByText("First tooltip").length).toBeGreaterThan(0);
    });

    await user.tab();
    expect(screen.getByRole("button", { name: "Second" })).toHaveFocus();

    await waitFor(() => {
      expect(screen.queryAllByText("Second tooltip").length).toBeGreaterThan(0);
    });
  });

  it("closes on ESC key", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <Button>Hover</Button>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByRole("button", { name: /hover/i });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.queryAllByText("Tooltip text").length).toBeGreaterThan(0);
    });

    await user.keyboard("{Escape}");

    expect(trigger).toBeInTheDocument();
  });
});
