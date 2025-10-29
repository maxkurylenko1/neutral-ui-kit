import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "destructive", "warning"],
      description: "Visual style of the toast",
    },
    duration: {
      control: "number",
      description: "Time in ms before auto-dismiss (default: 5000)",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <Toaster />
    {children}
  </>
);

export const Default: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <Button
          onClick={() =>
            toast({
              title: "Notification",
              description: "Your message has been sent successfully.",
            })
          }
        >
          Show Toast
        </Button>
      </ToastWrapper>
    );
  },
};

export const Success: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <Button
          variant="primary"
          onClick={() =>
            toast({
              variant: "success",
              title: "Success",
              description: "Your changes have been saved.",
            })
          }
        >
          Show Success
        </Button>
      </ToastWrapper>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <Button
          variant="destructive"
          onClick={() =>
            toast({
              variant: "destructive",
              title: "Error",
              description: "Something went wrong. Please try again.",
            })
          }
        >
          Show Error
        </Button>
      </ToastWrapper>
    );
  },
};

export const Warning: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              variant: "warning",
              title: "Warning",
              description: "Your session will expire in 5 minutes.",
            })
          }
        >
          Show Warning
        </Button>
      </ToastWrapper>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <Button
          onClick={() =>
            toast({
              title: "Update available",
              description: "A new version is ready to install.",
              action: (
                <button
                  onClick={() => alert("Update started!")}
                  className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-sm font-normal transition-colors hover:bg-secondary"
                >
                  Update
                </button>
              ),
            })
          }
        >
          Show with Action
        </Button>
      </ToastWrapper>
    );
  },
};

export const TitleOnly: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <Button
          onClick={() =>
            toast({
              title: "File uploaded successfully",
            })
          }
        >
          Title Only
        </Button>
      </ToastWrapper>
    );
  },
};

export const DescriptionOnly: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <Button
          onClick={() =>
            toast({
              description: "This is a simple notification message.",
            })
          }
        >
          Description Only
        </Button>
      </ToastWrapper>
    );
  },
};

export const CustomDuration: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <div className="flex gap-3">
          <Button
            onClick={() =>
              toast({
                title: "Quick Toast",
                description: "Dismisses in 2 seconds",
                duration: 2000,
              })
            }
            size="sm"
          >
            2 seconds
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Long Toast",
                description: "Dismisses in 10 seconds",
                duration: 10000,
              })
            }
            size="sm"
          >
            10 seconds
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Persistent",
                description: "Won't auto-dismiss",
                duration: Infinity,
              })
            }
            size="sm"
          >
            Persistent
          </Button>
        </div>
      </ToastWrapper>
    );
  },
};

export const MultipleToasts: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <Button
          onClick={() => {
            toast({ title: "First notification" });
            setTimeout(() => toast({ title: "Second notification" }), 500);
            setTimeout(() => toast({ title: "Third notification" }), 1000);
          }}
        >
          Show Multiple
        </Button>
      </ToastWrapper>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              toast({
                title: "Default",
                description: "Default toast notification",
              })
            }
          >
            Default
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              toast({
                variant: "success",
                title: "Success",
                description: "Operation completed",
              })
            }
          >
            Success
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong",
              })
            }
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast({
                variant: "warning",
                title: "Warning",
                description: "Please be careful",
              })
            }
          >
            Warning
          </Button>
        </div>
      </ToastWrapper>
    );
  },
};

export const FormSubmission: Story = {
  render: () => {
    const { toast } = useToast();

    const handleSubmit = () => {
      toast({
        variant: "success",
        title: "Form submitted",
        description: "Your information has been saved successfully.",
      });
    };

    const handleError = () => {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please check your input and try again.",
      });
    };

    return (
      <ToastWrapper>
        <div className="flex gap-3">
          <Button onClick={handleSubmit}>Submit Success</Button>
          <Button variant="destructive" onClick={handleError}>
            Submit Error
          </Button>
        </div>
      </ToastWrapper>
    );
  },
};

export const WithUndo: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <Button
          variant="destructive"
          onClick={() => {
            const { dismiss } = toast({
              title: "Item deleted",
              description: "The item has been removed from your list.",
              action: (
                <button
                  onClick={() => {
                    alert("Undo action performed");
                    dismiss();
                  }}
                  className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-sm font-normal transition-colors hover:bg-secondary"
                >
                  Undo
                </button>
              ),
              duration: 5000,
            });
          }}
        >
          Delete Item
        </Button>
      </ToastWrapper>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <ToastWrapper>
        <Button
          onClick={() =>
            toast({
              title: "System Update Available",
              description:
                "A new version of the application is ready to install. This update includes important security fixes and performance improvements. Would you like to update now?",
            })
          }
        >
          Show Long Content
        </Button>
      </ToastWrapper>
    );
  },
};
