import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description: "Default active tab",
    },
    value: {
      control: "text",
      description: "Controlled active tab value",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Tab list orientation",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Manage your account settings and preferences.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm">Change your password and security settings.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm">Configure application settings.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithCards: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-sm text-muted-foreground">
            View a summary of your account activity and key metrics.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Detailed analytics and insights about your performance.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-2">Reports</h3>
          <p className="text-sm text-muted-foreground">
            Generate and download custom reports.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const LazyMount: Story = {
  render: () => {
    const ExpensiveComponent = ({ tab }: { tab: string }) => {
      console.log(`${tab} tab mounted`);
      return (
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm">
            This content was lazy loaded. Check console to see when it mounted.
          </p>
          <p className="text-xs text-muted-foreground mt-2">Tab: {tab}</p>
        </div>
      );
    };

    return (
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2 (Lazy)</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3 (Lazy)</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <ExpensiveComponent tab="1" />
        </TabsContent>
        <TabsContent value="tab2" lazy>
          <ExpensiveComponent tab="2" />
        </TabsContent>
        <TabsContent value="tab3" lazy>
          <ExpensiveComponent tab="3" />
        </TabsContent>
      </Tabs>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("account");

    return (
      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="space-y-4">
              <p className="text-sm">Update your account information.</p>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="space-y-4">
              <p className="text-sm">Change your password.</p>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div className="space-y-4">
              <p className="text-sm">Manage your notification preferences.</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-sm text-muted-foreground">
          Active tab: <strong>{activeTab}</strong>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("account")}
          >
            Go to Account
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("password")}
          >
            Go to Password
          </Button>
        </div>
      </div>
    );
  },
};

export const WithForms: Story = {
  render: () => (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin" className="space-y-4">
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Sign In</h3>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="space-y-4">
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Button className="w-full">Sign In</Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="signup" className="space-y-4">
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Sign Up</h3>
            <p className="text-sm text-muted-foreground">
              Create a new account to get started
            </p>
          </div>
          <div className="space-y-4">
            <Input label="Name" placeholder="John Doe" />
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Button className="w-full">Create Account</Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Enabled</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab3">Enabled</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">This tab is enabled.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm">You should not see this.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm">This tab is also enabled.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Focus the tab list and use Arrow keys to navigate between tabs
      </p>
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">First</TabsTrigger>
          <TabsTrigger value="tab2">Second</TabsTrigger>
          <TabsTrigger value="tab3">Third</TabsTrigger>
          <TabsTrigger value="tab4">Fourth</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-semibold">First Tab</p>
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-semibold">Second Tab</p>
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-semibold">Third Tab</p>
          </div>
        </TabsContent>
        <TabsContent value="tab4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-semibold">Fourth Tab</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <p className="text-sm">All items are displayed here.</p>
      </TabsContent>
      <TabsContent value="active">
        <p className="text-sm">Only active items are shown.</p>
      </TabsContent>
      <TabsContent value="archived">
        <p className="text-sm">View your archived items.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="tab1">Dashboard</TabsTrigger>
        <TabsTrigger value="tab2">Projects</TabsTrigger>
        <TabsTrigger value="tab3">Tasks</TabsTrigger>
        <TabsTrigger value="tab4">Calendar</TabsTrigger>
        <TabsTrigger value="tab5">Reports</TabsTrigger>
        <TabsTrigger value="tab6">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Dashboard overview</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm">Your projects</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm">Task list</p>
      </TabsContent>
      <TabsContent value="tab4">
        <p className="text-sm">Calendar view</p>
      </TabsContent>
      <TabsContent value="tab5">
        <p className="text-sm">Reports and analytics</p>
      </TabsContent>
      <TabsContent value="tab6">
        <p className="text-sm">Application settings</p>
      </TabsContent>
    </Tabs>
  ),
};
