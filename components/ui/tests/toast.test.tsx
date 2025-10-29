import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "../toaster";
import { useToast } from "../use-toast";
import { Button } from "../button";

describe("Toast", () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  const ToastTestComponent = () => {
    const { toast } = useToast();

    return (
      <div>
        <Toaster />
        <Button
          onClick={() =>
            toast({
              title: "Test Toast",
              description: "This is a test toast",
            })
          }
        >
          Show Toast
        </Button>
      </div>
    );
  };

  it("renders toaster component", () => {
    render(<Toaster />);
    expect(
      document.querySelector("[data-radix-toast-viewport]")
    ).toBeInTheDocument();
  });

  it("shows toast when triggered", async () => {
    const user = userEvent.setup({ delay: null });

    render(<ToastTestComponent />);

    await user.click(screen.getByText("Show Toast"));

    await waitFor(() => {
      expect(screen.getByText("Test Toast")).toBeInTheDocument();
      expect(screen.getByText("This is a test toast")).toBeInTheDocument();
    });
  });

  it("closes toast when close button is clicked", async () => {
    const user = userEvent.setup({ delay: null });

    render(<ToastTestComponent />);

    await user.click(screen.getByText("Show Toast"));

    await waitFor(() => {
      expect(screen.getByText("Test Toast")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: "" });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("Test Toast")).not.toBeInTheDocument();
    });
  });

  it("renders toast with different variants", async () => {
    const VariantTestComponent = () => {
      const { toast } = useToast();

      return (
        <div>
          <Toaster />
          <Button
            onClick={() =>
              toast({
                variant: "success",
                title: "Success",
              })
            }
          >
            Success Toast
          </Button>
          <Button
            onClick={() =>
              toast({
                variant: "destructive",
                title: "Error",
              })
            }
          >
            Error Toast
          </Button>
        </div>
      );
    };

    const user = userEvent.setup({ delay: null });
    render(<VariantTestComponent />);

    await user.click(screen.getByText("Success Toast"));
    await waitFor(() => {
      expect(screen.getByText("Success")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Error Toast"));
    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });

  it("renders toast with action button", async () => {
    const handleAction = vi.fn();
    const user = userEvent.setup({ delay: null });

    const ActionTestComponent = () => {
      const { toast } = useToast();

      return (
        <div>
          <Toaster />
          <Button
            onClick={() =>
              toast({
                title: "Action Required",
                description: "Click the action button",
                action: <button onClick={handleAction}>Action</button>,
              })
            }
          >
            Show Toast
          </Button>
        </div>
      );
    };

    render(<ActionTestComponent />);

    await user.click(screen.getByText("Show Toast"));

    await waitFor(() => {
      expect(screen.getByText("Action Required")).toBeInTheDocument();
    });

    const actionButton = screen.getByText("Action");
    await user.click(actionButton);

    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it("shows multiple toasts in queue", async () => {
    const user = userEvent.setup({ delay: null });

    const MultipleToastsComponent = () => {
      const { toast } = useToast();

      return (
        <div>
          <Toaster />
          <Button
            onClick={() => {
              toast({ title: "First Toast" });
              toast({ title: "Second Toast" });
              toast({ title: "Third Toast" });
            }}
          >
            Show Multiple
          </Button>
        </div>
      );
    };

    render(<MultipleToastsComponent />);

    await user.click(screen.getByText("Show Multiple"));

    await waitFor(() => {
      expect(screen.getByText("First Toast")).toBeInTheDocument();
      expect(screen.getByText("Second Toast")).toBeInTheDocument();
      expect(screen.getByText("Third Toast")).toBeInTheDocument();
    });
  });

  it("limits toast queue to maximum", async () => {
    const user = userEvent.setup({ delay: null });

    const QueueLimitComponent = () => {
      const { toast } = useToast();

      return (
        <div>
          <Toaster />
          <Button
            onClick={() => {
              for (let i = 1; i <= 10; i++) {
                toast({ title: `Toast ${i}` });
              }
            }}
          >
            Show Many
          </Button>
        </div>
      );
    };

    render(<QueueLimitComponent />);

    await user.click(screen.getByText("Show Many"));

    await waitFor(() => {
      // Should only show last 5 toasts (TOAST_LIMIT = 5)
      expect(screen.getByText("Toast 10")).toBeInTheDocument();
      expect(screen.getByText("Toast 9")).toBeInTheDocument();
      expect(screen.getByText("Toast 8")).toBeInTheDocument();
      expect(screen.getByText("Toast 7")).toBeInTheDocument();
      expect(screen.getByText("Toast 6")).toBeInTheDocument();
      expect(screen.queryByText("Toast 5")).not.toBeInTheDocument();
    });
  });

  it("dismisses toast programmatically", async () => {
    const DismissTestComponent = () => {
      const { toast, dismiss } = useToast();
      const [toastId, setToastId] = React.useState<string>("");

      return (
        <div>
          <Toaster />
          <Button
            onClick={() => {
              const { id } = toast({ title: "Dismissible Toast" });
              setToastId(id);
            }}
          >
            Show Toast
          </Button>
          <Button onClick={() => dismiss(toastId)}>Dismiss</Button>
        </div>
      );
    };

    const user = userEvent.setup({ delay: null });
    render(<DismissTestComponent />);

    await user.click(screen.getByText("Show Toast"));

    await waitFor(() => {
      expect(screen.getByText("Dismissible Toast")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Dismiss"));

    await waitFor(() => {
      expect(screen.queryByText("Dismissible Toast")).not.toBeInTheDocument();
    });
  });

  it("renders toast without description", async () => {
    const user = userEvent.setup({ delay: null });

    const SimpleToastComponent = () => {
      const { toast } = useToast();

      return (
        <div>
          <Toaster />
          <Button onClick={() => toast({ title: "Simple Toast" })}>
            Show Toast
          </Button>
        </div>
      );
    };

    render(<SimpleToastComponent />);

    await user.click(screen.getByText("Show Toast"));

    await waitFor(() => {
      expect(screen.getByText("Simple Toast")).toBeInTheDocument();
    });
  });

  it("renders toast with only description", async () => {
    const user = userEvent.setup({ delay: null });

    const DescriptionOnlyComponent = () => {
      const { toast } = useToast();

      return (
        <div>
          <Toaster />
          <Button onClick={() => toast({ description: "Description only" })}>
            Show Toast
          </Button>
        </div>
      );
    };

    render(<DescriptionOnlyComponent />);

    await user.click(screen.getByText("Show Toast"));

    await waitFor(() => {
      expect(screen.getByText("Description only")).toBeInTheDocument();
    });
  });

  it("handles custom duration", async () => {
    const user = userEvent.setup({ delay: null });

    const DurationTestComponent = () => {
      const { toast } = useToast();

      return (
        <div>
          <Toaster />
          <Button
            onClick={() =>
              toast({
                title: "Auto Dismiss",
                duration: 1000,
              })
            }
          >
            Show Toast
          </Button>
        </div>
      );
    };

    render(<DurationTestComponent />);

    await user.click(screen.getByText("Show Toast"));

    await waitFor(() => {
      expect(screen.getByText("Auto Dismiss")).toBeInTheDocument();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.queryByText("Auto Dismiss")).not.toBeInTheDocument();
    });
  });
});

import * as React from "react";
