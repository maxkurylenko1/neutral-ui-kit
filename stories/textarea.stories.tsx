import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "Resize behavior",
      table: {
        type: { summary: "none | vertical | horizontal | both" },
        defaultValue: { summary: "vertical" },
      },
    },
    autoResize: {
      control: "boolean",
      description: "Auto-resize based on content",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    minRows: {
      control: "number",
      description: "Minimum rows when auto-resize is enabled",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "3" },
      },
    },
    maxRows: {
      control: "number",
      description: "Maximum rows when auto-resize is enabled",
      table: {
        type: { summary: "number" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the textarea",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "Label text",
      table: {
        type: { summary: "string" },
      },
    },
    error: {
      control: "text",
      description: "Error message",
      table: {
        type: { summary: "string" },
      },
    },
    helperText: {
      control: "text",
      description: "Helper text",
      table: {
        type: { summary: "string" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your description...",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    helperText: "Brief description for your profile",
  },
};

export const WithError: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message",
    error: "This field is required",
    defaultValue: "",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Textarea",
    placeholder: "Cannot edit this",
    disabled: true,
    defaultValue: "This content cannot be edited",
  },
};

export const AutoResize: Story = {
  args: {
    label: "Auto-resizing Textarea",
    placeholder: "Type something and watch it grow...",
    autoResize: true,
    minRows: 3,
    maxRows: 10,
  },
};

export const AutoResizeUnlimited: Story = {
  args: {
    label: "Unlimited Growth",
    placeholder: "This textarea will grow without limit",
    autoResize: true,
    minRows: 2,
  },
};

export const ResizeNone: Story = {
  args: {
    label: "No Resize",
    placeholder: "Cannot manually resize",
    resize: "none",
  },
};

export const ResizeHorizontal: Story = {
  args: {
    label: "Horizontal Resize",
    placeholder: "Drag the corner to resize horizontally",
    resize: "horizontal",
  },
};

export const ResizeBoth: Story = {
  args: {
    label: "Resize Both",
    placeholder: "Drag the corner to resize in any direction",
    resize: "both",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const charCount = value.length;
    const maxChars = 200;

    return (
      <div className="space-y-2">
        <Textarea
          label="Controlled Textarea"
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          helperText={`${charCount}/${maxChars} characters`}
          error={charCount > maxChars ? "Character limit exceeded" : undefined}
        />
      </div>
    );
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const maxLength = 150;

    return (
      <div className="space-y-2">
        <Textarea
          label="Message"
          placeholder="Enter your message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
        />
        <div className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength}
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.title) {
        newErrors.title = "Title is required";
      }
      if (!formData.description) {
        newErrors.description = "Description is required";
      } else if (formData.description.length < 20) {
        newErrors.description = "Description must be at least 20 characters";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert("Form submitted!");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          label="Title"
          placeholder="Enter title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          resize="none"
          rows={2}
        />

        <Textarea
          label="Description"
          placeholder="Enter description (min 20 characters)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          error={errors.description}
          helperText="Provide a detailed description"
          autoResize
          minRows={4}
          maxRows={10}
        />

        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>
      </form>
    );
  },
};

export const LongContent: Story = {
  args: {
    label: "Article Content",
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Read Only",
    defaultValue: "This content is read-only and cannot be edited.",
    readOnly: true,
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    placeholder: "This field is required",
    required: true,
    helperText: "This field must be filled out",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6">
      <Textarea label="Default" placeholder="Default state" />

      <Textarea label="With Value" defaultValue="This textarea has content" />

      <Textarea
        label="With Error"
        placeholder="Error state"
        error="This field is required"
      />

      <Textarea
        label="Disabled"
        placeholder="Disabled state"
        disabled
        defaultValue="Disabled content"
      />

      <Textarea label="Read Only" defaultValue="Read-only content" readOnly />
    </div>
  ),
};

export const AutoResizeExample: Story = {
  render: () => {
    const [text, setText] = useState(
      "Start typing to see the textarea grow automatically..."
    );

    return (
      <div className="space-y-4">
        <Textarea
          label="Auto-resize Textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoResize
          minRows={3}
          maxRows={8}
          helperText="Grows from 3 to 8 rows"
        />

        <div className="flex gap-2">
          <button
            onClick={() => setText("")}
            className="rounded-md bg-secondary px-3 py-1 text-sm"
          >
            Clear
          </button>
          <button
            onClick={() =>
              setText(
                "Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8\nLine 9\nLine 10"
              )
            }
            className="rounded-md bg-secondary px-3 py-1 text-sm"
          >
            Fill with 10 lines
          </button>
        </div>
      </div>
    );
  },
};

export const CommentBox: Story = {
  render: () => {
    const [comment, setComment] = useState("");

    return (
      <div className="space-y-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3">Add a comment</h3>
          <Textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            autoResize
            minRows={2}
            maxRows={6}
            resize="none"
          />
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setComment("")}
              className="rounded-md px-3 py-1.5 text-sm hover:bg-accent"
            >
              Cancel
            </button>
            <button
              disabled={!comment.trim()}
              className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  },
};
