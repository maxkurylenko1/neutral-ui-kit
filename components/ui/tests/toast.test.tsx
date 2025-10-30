import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "../toaster";
import { useToast } from "../use-toast";
import { Button } from "../button";
import * as React from "react";

describe("Toast", () => {
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

  it("shows toast when triggered", async () => {
    const user = userEvent.setup();

    render(<ToastTestComponent />);

    await user.click(screen.getByText("Show Toast"));

    await waitFor(() => {
      expect(screen.getByText("Test Toast")).toBeInTheDocument();
    });
  });

  it("renders toast with different variants", async () => {
    const user = userEvent.setup();

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

    render(<VariantTestComponent />);

    await user.click(screen.getByText("Success Toast"));

    await waitFor(() => {
      expect(screen.getByText("Success")).toBeInTheDocument();
    });
  });

  it("renders toast with action button", async () => {
    const handleAction = vi.fn();
    const user = userEvent.setup();

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
    const user = userEvent.setup();

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

  it("renders toast without description", async () => {
    const user = userEvent.setup();

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
    const user = userEvent.setup();

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
});
