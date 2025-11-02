"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

import { DataTable } from "@/components/ui/data-table";
import { useTheme } from "@/components/theme-provider";

type DemoUser = {
  id: string;
  name: string;
  email: string;
  status: "active" | "invited" | "suspended";
};

const USERS: DemoUser[] = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia@example.com",
    status: "active",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson@example.com",
    status: "invited",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    status: "active",
  },
  {
    id: "4",
    name: "William Kim",
    email: "william@example.com",
    status: "suspended",
  },
  { id: "5", name: "Emma Wilson", email: "emma@example.com", status: "active" },
  { id: "6", name: "Liam Brown", email: "liam@example.com", status: "active" },
  {
    id: "7",
    name: "Sophia Davis",
    email: "sophia@example.com",
    status: "invited",
  },
  { id: "8", name: "Noah Miller", email: "noah@example.com", status: "active" },
  { id: "9", name: "Ava Thompson", email: "ava@example.com", status: "active" },
  {
    id: "10",
    name: "Ethan Johnson",
    email: "ethan@example.com",
    status: "invited",
  },
  {
    id: "11",
    name: "Mia Robinson",
    email: "mia@example.com",
    status: "active",
  },
  {
    id: "12",
    name: "James Anderson",
    email: "james@example.com",
    status: "suspended",
  },
  {
    id: "13",
    name: "Charlotte Moore",
    email: "charlotte@example.com",
    status: "active",
  },
  {
    id: "14",
    name: "Benjamin Taylor",
    email: "benjamin@example.com",
    status: "invited",
  },
  {
    id: "15",
    name: "Amelia Harris",
    email: "amelia@example.com",
    status: "active",
  },
  {
    id: "16",
    name: "Lucas Clark",
    email: "lucas@example.com",
    status: "active",
  },
  {
    id: "17",
    name: "Harper Lewis",
    email: "harper@example.com",
    status: "invited",
  },
  {
    id: "18",
    name: "Henry Walker",
    email: "henry@example.com",
    status: "active",
  },
  {
    id: "19",
    name: "Evelyn Young",
    email: "evelyn@example.com",
    status: "suspended",
  },
  {
    id: "20",
    name: "Alexander King",
    email: "alexander@example.com",
    status: "active",
  },
  {
    id: "21",
    name: "Abigail Wright",
    email: "abigail@example.com",
    status: "active",
  },
  {
    id: "22",
    name: "Michael Scott",
    email: "michael@example.com",
    status: "invited",
  },
  { id: "23", name: "Ella Hill", email: "ella@example.com", status: "active" },
  {
    id: "24",
    name: "Daniel Green",
    email: "daniel@example.com",
    status: "active",
  },
  {
    id: "25",
    name: "Grace Adams",
    email: "grace@example.com",
    status: "invited",
  },
  {
    id: "26",
    name: "Sebastian Baker",
    email: "sebastian@example.com",
    status: "active",
  },
  {
    id: "27",
    name: "Lily Gonzalez",
    email: "lily@example.com",
    status: "active",
  },
  {
    id: "28",
    name: "Matthew Perez",
    email: "matthew@example.com",
    status: "invited",
  },
];

const USER_COLUMNS: any[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const value = row.getValue("status") as DemoUser["status"];
      const label =
        value === "active"
          ? "Active"
          : value === "invited"
            ? "Invited"
            : "Suspended";
      return (
        <span className="inline-flex rounded-full bg-secondary text-xs px-2 py-0.5">
          {label}
        </span>
      );
    },
  },
];

function Block({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card/70 backdrop-blur-sm p-4 space-y-4 h-full">
      <div className="space-y-1">
        <h2 className="font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default function KitchenSinkPage() {
  const [page, setPage] = React.useState(1);
  const { theme, setTheme } = useTheme();
  const PAGE_SIZE = 6;
  const total = USERS.length;

  const paginatedData = React.useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return USERS.slice(start, end);
  }, [page]);

  const startItem = (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-6 md:px-8 md:py-10 space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Neutral UI Kit
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Kitchen Sink</h1>
          <p className="text-muted-foreground max-w-2xl">
            A compact overview of all base components — forms, navigation,
            overlays, feedback and data. Ready to show in portfolio.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2 flex-col items-center">
            <Switch
              id="dark-mode"
              defaultChecked={theme === "dark"}
              checked={theme === "dark"}
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            />
            <span className="text-sm leading-none">Dark mode</span>
          </div>
          <Link href="https://github.com/maxkurylenko1" target="_blank">
            <Button variant="outline">GitHub</Button>
          </Link>
          <Button
            onClick={() =>
              toast({
                title: "Demo toast",
                description: "This is a toast from /demo.",
              })
            }
          >
            Show toast
          </Button>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground tracking-wide">
          FOUNDATION
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <Block
            title="Buttons"
            description="Primary and secondary actions, subtle and destructive."
          >
            <div className="flex gap-2 flex-wrap">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Block>

          <Block title="Inputs" description="Form fields for user input.">
            <Input placeholder="Email address" />
            <Textarea placeholder="Additional information..." rows={3} />
          </Block>

          <Block
            title="State controls"
            description="Checkboxes and switches for preferences."
          >
            <label className="flex items-center gap-2">
              <Checkbox id="notifications" />
              <span className="text-sm leading-none">
                Receive notifications
              </span>
            </label>
            <div className="flex items-center gap-2">
              <Switch id="switch" />
              <span className="text-sm leading-none">Toggle switch</span>
            </div>
          </Block>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground tracking-wide">
          NAVIGATION & FORMS
        </h2>
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <Block
            title="Tabs"
            description="Switch between related content without leaving the page."
          >
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="disabled" disabled>
                  Disabled
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="pt-3 text-sm">
                User account information.
              </TabsContent>
              <TabsContent value="password" className="pt-3 text-sm">
                Password & security settings.
              </TabsContent>
            </Tabs>
          </Block>

          <Block title="Select" description="Pick an option from a list.">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="nextjs">Next.js</SelectItem>
                <SelectItem value="vite">Vite</SelectItem>
              </SelectContent>
            </Select>
          </Block>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground tracking-wide">
          DATA & FEEDBACK
        </h2>
        <div className="rounded-xl border bg-card/70 backdrop-blur-sm p-4 space-y-4 justify-between flex flex-col">
          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold tracking-tight">Users table</h2>
                <p className="text-sm text-muted-foreground">
                  List of users with pagination. Table shows only the current
                  page.
                </p>
              </div>
            </div>

            <DataTable
              columns={USER_COLUMNS}
              data={paginatedData}
              rowClassName={""}
            />
          </div>

          <Pagination
            total={total}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={(nextPage: number) => setPage(nextPage)}
          />

          <p className="text-xs text-muted-foreground">
            Showing {startItem}-{endItem} of {total} results
          </p>
        </div>
      </section>

      <section className="space-y-4 pb-4">
        <h2 className="text-sm font-medium text-muted-foreground tracking-wide">
          OVERLAYS & MENUS
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <Block
            title="Dialog"
            description="Modal overlay with focus management."
          >
            <Dialog>
              <DialogTrigger asChild>
                <span>
                  <Button>Open profile dialog</Button>
                </span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 pt-2">
                  <Input placeholder="Full name" defaultValue="Maksym" />
                  <Input placeholder="Email" defaultValue="max@example.com" />
                  <Button className="w-full">Save changes</Button>
                </div>
              </DialogContent>
            </Dialog>
          </Block>

          <Block
            title="Dropdown menu"
            description="Quick actions and account-related commands."
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span>
                  <Button variant="outline" className="w-full justify-between">
                    Open menu
                  </Button>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Block>

          <Block
            title="Tooltip"
            description="Micro-explanations for icons and rare actions."
          >
            <Tooltip content="This action will open the details.">
              <TooltipTrigger asChild>
                <span>
                  <Button variant="outline">Hover me</Button>
                </span>
              </TooltipTrigger>
            </Tooltip>
            <p className="text-xs text-muted-foreground">
              Wrapped with <code>&lt;span&gt;</code> to keep Radix happy.
            </p>
          </Block>
        </div>
      </section>

      <section className="space-y-4 pb-10">
        <h2 className="text-sm font-medium text-muted-foreground tracking-wide">
          COMPOSED EXAMPLES
        </h2>
        <div className="grid gap-4 xl:grid-cols-3">
          <Block
            title="User settings form"
            description="Real-world form built from base inputs."
          >
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full name</label>
                <Input
                  placeholder="Your name"
                  defaultValue="Maksym Kurylenko"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select defaultValue="frontend">
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Fullstack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="newsletter" defaultChecked />
                <label htmlFor="newsletter" className="text-sm">
                  Receive product updates
                </label>
              </div>
              <Textarea
                placeholder="Short bio..."
                rows={2}
                defaultValue="React / PixiJS / UI systems."
              />
              <Button className="w-full">Save settings</Button>
            </div>
          </Block>

          <Block
            title="Toast playground"
            description="Trigger different toast configurations."
          >
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() =>
                  toast({
                    title: "Saved",
                    description: "Profile updated successfully.",
                  })
                }
              >
                Success
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  toast({
                    title: "Warning",
                    description: "This feature is not fully implemented.",
                  })
                }
              >
                Warning
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() =>
                  toast({
                    title: "Error",
                    description: "Something went wrong.",
                  })
                }
              >
                Error
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Uses the same <code>use-toast.tsx</code> hook that powers global
              toasts.
            </p>
          </Block>

          <Block
            title="Action panel"
            description="Combine dropdown and dialog for typical admin actions."
          >
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span>
                    <Button variant="outline">Row actions</Button>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() =>
                      toast({
                        title: "View",
                        description: "Opening details...",
                      })
                    }
                  >
                    View details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      toast({
                        title: "Duplicate",
                        description: "Item duplicated.",
                      })
                    }
                  >
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      toast({ title: "Delete", description: "Item deleted." })
                    }
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DialogTrigger asChild>
                  <span>
                    <Button>New record</Button>
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create item</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 pt-2">
                    <Input placeholder="Title" />
                    <Textarea placeholder="Description" rows={3} />
                    <Button
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Created",
                          description: "New item was created.",
                        });
                      }}
                    >
                      Create
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-xs text-muted-foreground">
              Good to show how overlay + menu + button work together.
            </p>
          </Block>
        </div>
      </section>
    </div>
  );
}
