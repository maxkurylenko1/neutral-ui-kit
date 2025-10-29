import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";
import { cn } from "@/lib/utils";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    total: {
      control: "number",
      description: "Total number of items",
      table: {
        type: { summary: "number" },
      },
    },
    page: {
      control: "number",
      description: "Current page number (1-indexed)",
      table: {
        type: { summary: "number" },
      },
    },
    pageSize: {
      control: "number",
      description: "Number of items per page",
      table: {
        type: { summary: "number" },
      },
    },
    onPageChange: {
      action: "pageChange",
      description: "Callback when page changes",
      table: {
        type: { summary: "(page: number) => void" },
      },
    },
    showFirstLast: {
      control: "boolean",
      description: "Show First/Last buttons",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    showPrevNext: {
      control: "boolean",
      description: "Show Previous/Next buttons",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    siblingCount: {
      control: "number",
      description: "Number of sibling pages to show on each side",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <Pagination
        total={100}
        page={page}
        pageSize={10}
        onPageChange={setPage}
        showFirstLast={true}
        showPrevNext={true}
        siblingCount={1}
      />
    );
  },
};

export const Controlled = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const total = 100;

    return (
      <div className="space-y-4">
        <Pagination
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
        <div className="text-center text-sm text-muted-foreground">
          Page {page} of {Math.ceil(total / pageSize)}
        </div>
      </div>
    );
  },
};

export const WithoutFirstLast = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <Pagination
        total={100}
        page={page}
        pageSize={10}
        onPageChange={setPage}
        showFirstLast={false}
      />
    );
  },
};

export const WithoutPrevNext = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <Pagination
        total={100}
        page={page}
        pageSize={10}
        onPageChange={setPage}
        showPrevNext={false}
      />
    );
  },
};

export const MinimalButtons = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <Pagination
        total={100}
        page={page}
        pageSize={10}
        onPageChange={setPage}
        showFirstLast={false}
        showPrevNext={false}
      />
    );
  },
};

export const LargeDataset = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <div className="space-y-4">
        <Pagination
          total={1000}
          page={page}
          pageSize={10}
          onPageChange={setPage}
        />
        <div className="text-center text-sm text-muted-foreground">
          Showing {(page - 1) * 10 + 1}-{Math.min(page * 10, 1000)} of 1,000
          items
        </div>
      </div>
    );
  },
};

export const SmallDataset = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <div className="space-y-4">
        <Pagination
          total={50}
          page={page}
          pageSize={10}
          onPageChange={setPage}
        />
        <div className="text-center text-sm text-muted-foreground">
          Showing {(page - 1) * 10 + 1}-{Math.min(page * 10, 50)} of 50 items
        </div>
      </div>
    );
  },
};

export const MoreSiblings = {
  render: () => {
    const [page, setPage] = useState(10);

    return (
      <Pagination
        total={500}
        page={page}
        pageSize={10}
        onPageChange={setPage}
        siblingCount={2}
      />
    );
  },
};

export const FewerSiblings = {
  render: () => {
    const [page, setPage] = useState(10);

    return (
      <Pagination
        total={500}
        page={page}
        pageSize={10}
        onPageChange={setPage}
        siblingCount={0}
      />
    );
  },
};

export const DifferentPageSizes = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const total = 100;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 justify-center">
          <span className="text-sm">Items per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Pagination
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />

        <div className="text-center text-sm text-muted-foreground">
          Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)}{" "}
          of {total} items
        </div>
      </div>
    );
  },
};

export const WithTable = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const allData = Array.from({ length: 47 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      status: i % 3 === 0 ? "Active" : "Inactive",
    }));

    const currentData = allData.slice((page - 1) * pageSize, page * pageSize);

    return (
      <div className="w-full space-y-4">
        <div className="rounded-lg border border-border">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    index !== currentData.length - 1
                      ? "border-b border-border"
                      : ""
                  }
                >
                  <td className="px-4 py-3 text-sm">{item.id}</td>
                  <td className="px-4 py-3 text-sm">{item.name}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-1 text-xs font-normal",
                        item.status === "Active"
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * pageSize + 1}-
            {Math.min(page * pageSize, allData.length)} of {allData.length}{" "}
            items
          </div>
          <Pagination
            total={allData.length}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      </div>
    );
  },
};

export const KeyboardNavigation = {
  render: () => {
    const [page, setPage] = useState(5);

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">
          Use Tab to navigate, Enter/Space to select
        </p>
        <Pagination
          total={200}
          page={page}
          pageSize={10}
          onPageChange={setPage}
        />
      </div>
    );
  },
};

export const AllStates = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(5);
    const [page3, setPage3] = useState(10);

    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-normal">First Page</p>
          <Pagination
            total={100}
            page={page1}
            pageSize={10}
            onPageChange={setPage1}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-normal">Middle Page</p>
          <Pagination
            total={100}
            page={page2}
            pageSize={10}
            onPageChange={setPage2}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-normal">Last Page</p>
          <Pagination
            total={100}
            page={page3}
            pageSize={10}
            onPageChange={setPage3}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-normal">Small Dataset (5 pages)</p>
          <Pagination
            total={50}
            page={3}
            pageSize={10}
            onPageChange={() => {}}
          />
        </div>
      </div>
    );
  },
};

export const EdgeCases = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-normal">Single Page (no pagination shown)</p>
        <div className="text-xs text-muted-foreground">
          Total: 8, Page Size: 10
        </div>
        <Pagination total={8} page={1} pageSize={10} onPageChange={() => {}} />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-normal">Exactly Two Pages</p>
        <Pagination total={20} page={1} pageSize={10} onPageChange={() => {}} />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-normal">Large Page Size</p>
        <div className="text-xs text-muted-foreground">
          Total: 1000, Page Size: 100
        </div>
        <Pagination
          total={1000}
          page={5}
          pageSize={100}
          onPageChange={() => {}}
        />
      </div>
    </div>
  ),
};
