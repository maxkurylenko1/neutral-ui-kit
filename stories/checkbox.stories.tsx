import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
    },
    disabled: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: "280px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    checked: "indeterminate",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive emails about new products and features",
  },
};

export const WithError: Story = {
  args: {
    label: "I agree to the terms",
    error: "You must accept the terms and conditions",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    checked: true,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <Checkbox
          label="Controlled checkbox"
          description="Click to toggle"
          checked={checked}
          onCheckedChange={(value) => setChecked(value === true)}
        />
        <p className="text-sm text-muted-foreground">
          Status: {checked ? "Checked" : "Unchecked"}
        </p>
      </div>
    );
  },
};

export const IndeterminateControlled: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | "indeterminate">(false);

    return (
      <div className="space-y-4">
        <Checkbox
          label="Three-state checkbox"
          description="Cycles through unchecked → checked → indeterminate"
          checked={checked}
          onCheckedChange={() => {
            // Cycle based on current state, not the value from Radix
            if (checked === false) {
              setChecked(true);
            } else if (checked === true) {
              setChecked("indeterminate");
            } else {
              setChecked(false);
            }
          }}
        />
        <p className="text-sm text-muted-foreground">
          Status:{" "}
          {checked === "indeterminate"
            ? "Indeterminate"
            : checked
              ? "Checked"
              : "Unchecked"}
        </p>
      </div>
    );
  },
};

export const SelectAll: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", label: "Item 1", checked: false },
      { id: "2", label: "Item 2", checked: false },
      { id: "3", label: "Item 3", checked: false },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const selectAllState = allChecked
      ? true
      : someChecked
        ? "indeterminate"
        : false;

    const handleSelectAll = (checked: boolean | "indeterminate") => {
      setItems(items.map((item) => ({ ...item, checked: checked === true })));
    };

    const handleItemToggle = (id: string) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };

    return (
      <div className="space-y-4">
        <Checkbox
          label="Select all"
          description={`${items.filter((i) => i.checked).length} of ${items.length} selected`}
          checked={selectAllState}
          onCheckedChange={handleSelectAll}
        />

        <div className="border-t pt-4 space-y-3">
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onCheckedChange={() => handleItemToggle(item.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      terms: false,
      newsletter: false,
      updates: false,
    });

    const [showErrors, setShowErrors] = useState(false);

    const handleSubmit = () => {
      setShowErrors(true);
    };

    return (
      <div className="space-y-4">
        <Checkbox
          label="I agree to the terms and conditions"
          description="Required to continue"
          checked={formData.terms}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, terms: checked === true })
          }
          error={
            showErrors && !formData.terms
              ? "You must accept the terms"
              : undefined
          }
        />

        <Checkbox
          label="Subscribe to newsletter"
          description="Get weekly updates about new features"
          checked={formData.newsletter}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, newsletter: checked === true })
          }
        />

        <Checkbox
          label="Product updates"
          description="Receive notifications about product changes"
          checked={formData.updates}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, updates: checked === true })
          }
        />

        <button
          onClick={handleSubmit}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Unchecked" checked={false} />
      <Checkbox label="Checked" checked={true} />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox label="Disabled" disabled checked={false} />
      <Checkbox label="Disabled Checked" disabled checked={true} />
    </div>
  ),
};
