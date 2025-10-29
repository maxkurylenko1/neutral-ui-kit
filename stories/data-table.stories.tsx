import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
  joinedDate: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    joinedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
    joinedDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "Inactive",
    joinedDate: "2024-03-10",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Editor",
    status: "Active",
    joinedDate: "2024-01-25",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Viewer",
    status: "Pending",
    joinedDate: "2024-04-05",
  },
];

const basicColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

const sortableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-1 text-xs font-normal",
            status === "Active" && "bg-success/10 text-success",
            status === "Inactive" && "bg-muted text-muted-foreground",
            status === "Pending" && "bg-warning/10 text-warning"
          )}
        >
          {status}
        </span>
      );
    },
  },
];

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
      description: "Show loading state",
    },
    pagination: {
      control: "boolean",
      description: "Enable pagination",
    },
    pageSize: {
      control: "number",
      description: "Rows per page",
    },
    emptyMessage: {
      control: "text",
      description: "Message when no data",
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => <DataTable columns={basicColumns} data={sampleData} />,
};

export const WithSorting = {
  render: () => <DataTable columns={sortableColumns} data={sampleData} />,
};

export const Loading = {
  render: () => <DataTable columns={basicColumns} data={[]} loading />,
};

export const Empty = {
  render: () => <DataTable columns={basicColumns} data={[]} />,
};

export const CustomEmptyMessage = {
  render: () => (
    <DataTable
      columns={basicColumns}
      data={[]}
      emptyMessage="No users found. Try adjusting your filters."
    />
  ),
};

export const NoPagination = {
  render: () => (
    <DataTable columns={sortableColumns} data={sampleData} pagination={false} />
  ),
};

export const CustomPageSize = {
  render: () => (
    <DataTable columns={sortableColumns} data={sampleData} pageSize={3} />
  ),
};

export const LargeDataset = {
  render: () => {
    const largeData: User[] = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "Editor", "Viewer"][i % 3],
      status: (["Active", "Inactive", "Pending"] as const)[i % 3],
      joinedDate: `2024-0${(i % 9) + 1}-${(i % 28) + 1}`,
    }));

    return (
      <DataTable columns={sortableColumns} data={largeData} pageSize={10} />
    );
  },
};

export const VeryLargeDataset = {
  render: () => {
    const veryLargeData: User[] = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "Editor", "Viewer"][i % 3],
      status: (["Active", "Inactive", "Pending"] as const)[i % 3],
      joinedDate: `2024-0${(i % 9) + 1}-${(i % 28) + 1}`,
    }));

    return (
      <DataTable columns={sortableColumns} data={veryLargeData} pageSize={20} />
    );
  },
};

export const WithCustomStyling = {
  render: () => (
    <DataTable
      columns={sortableColumns}
      data={sampleData}
      rowClassName={(row) => (row.status === "Inactive" ? "opacity-60" : "")}
    />
  ),
};

export const Controlled = {
  render: () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 5,
    });

    return (
      <div className="space-y-4">
        <DataTable
          columns={sortableColumns}
          data={sampleData}
          pageSize={5}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
        />
        <div className="rounded-md bg-muted p-4">
          <p className="text-sm font-normal mb-2">State:</p>
          <pre className="text-xs">
            {JSON.stringify({ sorting, pagination }, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const AdvancedColumns = {
  render: () => {
    const advancedColumns: ColumnDef<User>[] = [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
        cell: ({ row }) => (
          <span className="font-mono text-xs text-muted-foreground">
            #{row.original.id.toString().padStart(4, "0")}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-normal">{row.original.name}</span>
            <span className="text-xs text-muted-foreground">
              {row.original.email}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        enableSorting: true,
        cell: ({ row }) => {
          const role = row.original.role;
          return (
            <span
              className={cn(
                "inline-flex rounded-md px-2 py-1 text-xs font-normal",
                role === "Admin" && "bg-primary/10 text-primary",
                role === "Editor" &&
                  "bg-secondary/10 text-secondary-foreground",
                role === "Viewer" && "bg-muted text-muted-foreground"
              )}
            >
              {role}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-normal",
                status === "Active" && "bg-success/10 text-success",
                status === "Inactive" && "bg-muted text-muted-foreground",
                status === "Pending" && "bg-warning/10 text-warning"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  status === "Active" && "bg-success",
                  status === "Inactive" && "bg-muted-foreground",
                  status === "Pending" && "bg-warning"
                )}
              />
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "joinedDate",
        header: "Joined",
        enableSorting: true,
        cell: ({ row }) => {
          const date = new Date(row.original.joinedDate);
          return (
            <span className="text-sm">
              {date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          );
        },
      },
    ];

    return <DataTable columns={advancedColumns} data={sampleData} />;
  },
};

export const SimulatedServerMode = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(sampleData);
    const [sorting, setSorting] = useState<SortingState>([]);

    const handleSortingChange = (newSorting: any) => {
      setSorting(newSorting);
      setLoading(true);

      setTimeout(() => {
        const sortedData = [...sampleData];
        if (newSorting.length > 0) {
          const { id, desc } = newSorting[0];
          sortedData.sort((a, b) => {
            const aVal = a[id as keyof User];
            const bVal = b[id as keyof User];
            if (aVal < bVal) return desc ? 1 : -1;
            if (aVal > bVal) return desc ? -1 : 1;
            return 0;
          });
        }
        setData(sortedData);
        setLoading(false);
      }, 800);
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click column headers to see simulated server-side sorting
        </p>
        <DataTable
          columns={sortableColumns}
          data={data}
          loading={loading}
          manualSorting
          onSortingChange={handleSortingChange}
        />
      </div>
    );
  },
};

export const AllFeatures = {
  render: () => {
    const fullColumns: ColumnDef<User>[] = [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
      },
      {
        accessorKey: "role",
        header: "Role",
        enableSorting: true,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <span
              className={cn(
                "inline-flex rounded-full px-2 py-1 text-xs font-normal",
                status === "Active" && "bg-success/10 text-success",
                status === "Inactive" && "bg-muted text-muted-foreground",
                status === "Pending" && "bg-warning/10 text-warning"
              )}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "joinedDate",
        header: "Joined",
        enableSorting: true,
      },
    ];

    const fullData: User[] = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "Editor", "Viewer"][i % 3],
      status: (["Active", "Inactive", "Pending"] as const)[i % 3],
      joinedDate: `2024-0${(i % 9) + 1}-${(i % 28) + 1}`,
    }));

    return (
      <DataTable
        columns={fullColumns}
        data={fullData}
        pageSize={10}
        rowClassName={(row) => (row.status === "Inactive" ? "opacity-60" : "")}
      />
    );
  },
};
