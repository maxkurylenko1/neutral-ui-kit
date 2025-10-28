import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: "320px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch>;

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

export const WithLabel: Story = {
  args: {
    label: "Enable notifications",
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
    label: "Required setting",
    error: "This setting must be enabled to continue",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled switch",
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
        <Switch
          label="Controlled switch"
          description="Toggle to change state"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="text-sm text-muted-foreground">
          Status: {checked ? "On" : "Off"}
        </p>
      </div>
    );
  },
};

export const SettingsExample: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      emailUpdates: false,
      darkMode: false,
      analytics: true,
    });

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Preferences</h3>

          <Switch
            label="Push notifications"
            description="Receive push notifications on your device"
            checked={settings.notifications}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, notifications: checked })
            }
          />

          <Switch
            label="Email updates"
            description="Get notified about updates via email"
            checked={settings.emailUpdates}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, emailUpdates: checked })
            }
          />

          <Switch
            label="Dark mode"
            description="Use dark color scheme"
            checked={settings.darkMode}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, darkMode: checked })
            }
          />

          <Switch
            label="Analytics"
            description="Help us improve by sharing usage data"
            checked={settings.analytics}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, analytics: checked })
            }
          />
        </div>

        <div className="rounded-md bg-muted p-4">
          <p className="text-sm font-medium mb-2">Current Settings:</p>
          <pre className="text-xs">{JSON.stringify(settings, null, 2)}</pre>
        </div>
      </div>
    );
  },
};

export const FormWithValidation: Story = {
  render: () => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSubmit = () => {
      if (!agreedToTerms) {
        setShowError(true);
      } else {
        setShowError(false);
        alert("Form submitted!");
      }
    };

    return (
      <div className="space-y-4">
        <Switch
          label="I agree to the terms and conditions"
          description="Required to continue"
          checked={agreedToTerms}
          onCheckedChange={(checked) => {
            setAgreedToTerms(checked);
            setShowError(false);
          }}
          error={
            showError && !agreedToTerms
              ? "You must agree to the terms"
              : undefined
          }
        />

        <button
          onClick={handleSubmit}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
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
      <Switch label="Unchecked" checked={false} />
      <Switch label="Checked" checked={true} />
      <Switch label="Disabled" disabled checked={false} />
      <Switch label="Disabled Checked" disabled checked={true} />
      <Switch label="With Error" error="Error message" checked={false} />
    </div>
  ),
};

export const StandaloneSwitch: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch />
      <Switch checked />
      <Switch disabled />
      <Switch checked disabled />
    </div>
  ),
};

export const WithLongText: Story = {
  args: {
    label: "Enable advanced analytics tracking",
    description:
      "This will allow us to collect detailed usage statistics to help improve the product. We respect your privacy and will never share your data with third parties.",
  },
};

export const CompactList: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", label: "Feature A", enabled: true },
      { id: "2", label: "Feature B", enabled: false },
      { id: "3", label: "Feature C", enabled: true },
      { id: "4", label: "Feature D", enabled: false },
    ]);

    const toggleItem = (id: string) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, enabled: !item.enabled } : item
        )
      );
    };

    return (
      <div className="space-y-3">
        {items.map((item) => (
          <Switch
            key={item.id}
            label={item.label}
            checked={item.enabled}
            onCheckedChange={() => toggleItem(item.id)}
          />
        ))}
      </div>
    );
  },
};
