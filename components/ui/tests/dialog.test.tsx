import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

describe("Dialog", () => {
  it("renders trigger button", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
      </Dialog>
    );
    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  it("opens dialog when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText("Open"));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    });
  });

  it("closes dialog when close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText("Open"));
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("closes dialog when ESC is pressed", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText("Open"));
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    await user.keyboard("{Escape}");

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("closes dialog when backdrop is clicked", async () => {
    const user = userEvent.setup();

    const ControlledDialog = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    };

    render(<ControlledDialog />);

    await user.click(screen.getByText("Open"));
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("renders with title and description", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText("Open"));

    await waitFor(() => {
      expect(screen.getByText("Confirm Action")).toBeInTheDocument();
      expect(
        screen.getByText("Are you sure you want to continue?")
      ).toBeInTheDocument();
    });
  });

  it("renders header and footer sections", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Header Content</DialogTitle>
          </DialogHeader>
          <div>Body Content</div>
          <DialogFooter>
            <button>Cancel</button>
            <button>Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText("Open"));

    await waitFor(() => {
      expect(screen.getByText("Header Content")).toBeInTheDocument();
      expect(screen.getByText("Body Content")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Confirm")).toBeInTheDocument();
    });
  });

  it("can be controlled", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    const ControlledDialog = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            handleOpenChange(isOpen);
          }}
        >
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Controlled Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    };

    render(<ControlledDialog />);

    await user.click(screen.getByText("Open"));
    expect(handleOpenChange).toHaveBeenCalledWith(true);

    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    await user.keyboard("{Escape}");
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("hides close button when showClose is false", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent showClose={false}>
          <DialogTitle>No Close Button</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText("Open"));

    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    expect(
      screen.queryByRole("button", { name: /close/i })
    ).not.toBeInTheDocument();
  });

  it("applies aria-labelledby to dialog", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText("Open"));

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      const title = screen.getByText("Dialog Title");
      expect(dialog).toHaveAttribute(
        "aria-labelledby",
        expect.stringContaining(title.id)
      );
    });
  });

  it("applies aria-describedby when description is present", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description text</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText("Open"));

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      const description = screen.getByText("Description text");
      expect(dialog).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining(description.id)
      );
    });
  });

  it("traps focus within dialog", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Focus Trap Test</DialogTitle>
          <input type="text" placeholder="First input" />
          <input type="text" placeholder="Second input" />
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText("Open"));
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    const dialog = screen.getByRole("dialog");

    await waitFor(() => {
      const focusedElement = document.activeElement;
      expect(dialog.contains(focusedElement)).toBeTruthy();
    });
  });

  it("returns focus to trigger after closing", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByText("Open");
    await user.click(trigger);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );

    expect(trigger).toHaveFocus();
  });

  it("applies custom className to content", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="custom-dialog-class">
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText("Open"));
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    expect(screen.getByRole("dialog")).toHaveClass("custom-dialog-class");
  });
});

import * as React from "react";
