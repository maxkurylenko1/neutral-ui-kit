import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info, HelpCircle, Settings } from "lucide-react";
import { useState } from "react";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
      description: "Tooltip content",
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Which side to show the tooltip",
    },
    delayDuration: {
      control: "number",
      description: "Delay before showing tooltip (ms)",
    },
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>,
  },
};

export const Top: Story = {
  args: {
    content: "Tooltip on top",
    side: "top",
    children: <Button>Top</Button>,
  },
};

export const Right: Story = {
  args: {
    content: "Tooltip on right",
    side: "right",
    children: <Button>Right</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Tooltip on bottom",
    side: "bottom",
    children: <Button>Bottom</Button>,
  },
};

export const Left: Story = {
  args: {
    content: "Tooltip on left",
    side: "left",
    children: <Button>Left</Button>,
  },
};

export const AllSides = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </div>
  ),
};

export const WithIcon = {
  render: () => (
    <Tooltip content="More information about this feature">
      <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <Info className="h-4 w-4" />
      </button>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  args: {
    content:
      "This is a longer tooltip with more detailed information that might span multiple lines",
    children: <Button>Hover for details</Button>,
  },
};

export const CustomDelay = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Instant" delayDuration={0}>
        <Button size="sm">No delay</Button>
      </Tooltip>
      <Tooltip content="Normal" delayDuration={200}>
        <Button size="sm">200ms</Button>
      </Tooltip>
      <Tooltip content="Slow" delayDuration={1000}>
        <Button size="sm">1000ms</Button>
      </Tooltip>
    </div>
  ),
};

export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <Tooltip
          content="Controlled tooltip"
          open={open}
          onOpenChange={setOpen}
        >
          <Button>Hover or focus</Button>
        </Tooltip>
        <div className="text-sm text-muted-foreground">
          Tooltip is: {open ? "Open" : "Closed"}
        </div>
        <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
          Toggle
        </Button>
      </div>
    );
  },
};

export const OnDisabledButton = {
  render: () => (
    <Tooltip content="This button is disabled">
      <span className="inline-block">
        <Button disabled>Disabled button</Button>
      </span>
    </Tooltip>
  ),
};

export const HelpText = {
  render: () => (
    <div className="flex items-center gap-2">
      <label className="text-sm font-normal">Email address</label>
      <Tooltip content="We'll never share your email with anyone else">
        <button className="text-muted-foreground hover:text-foreground">
          <HelpCircle className="h-4 w-4" />
        </button>
      </Tooltip>
    </div>
  ),
};

export const FormExample = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-normal">Username</label>
          <Tooltip content="Must be at least 3 characters">
            <button className="text-muted-foreground hover:text-foreground">
              <Info className="h-3.5 w-3.5" />
            </button>
          </Tooltip>
        </div>
        <input
          type="text"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="johndoe"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-normal">Password</label>
          <Tooltip content="Must contain at least 8 characters, one uppercase letter, one number, and one special character">
            <button className="text-muted-foreground hover:text-foreground">
              <Info className="h-3.5 w-3.5" />
            </button>
          </Tooltip>
        </div>
        <input
          type="password"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="••••••••"
        />
      </div>
    </div>
  ),
};

export const IconButtons = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip content="Settings">
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Help">
        <Button variant="outline" size="sm">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Information">
        <Button variant="outline" size="sm">
          <Info className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  ),
};

export const KeyboardAccessible = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Tab through the buttons to see tooltips on focus
      </p>
      <div className="flex gap-3">
        <Tooltip content="First button">
          <Button>Button 1</Button>
        </Tooltip>
        <Tooltip content="Second button">
          <Button>Button 2</Button>
        </Tooltip>
        <Tooltip content="Third button">
          <Button>Button 3</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const RichContent = {
  render: () => (
    <Tooltip
      content={
        <div className="space-y-1">
          <p className="font-semibold">Keyboard Shortcuts</p>
          <p className="text-xs">⌘ + S - Save</p>
          <p className="text-xs">⌘ + P - Print</p>
        </div>
      }
    >
      <Button variant="outline">Shortcuts</Button>
    </Tooltip>
  ),
};
