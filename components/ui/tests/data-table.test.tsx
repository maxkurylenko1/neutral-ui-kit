import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "../data-table";
import type { ColumnDef } from "@tanstack/react-table";

interface TestData {
  id: number;
  name: string;
  status: string;
  amount: number;
}

const mockData: TestData[] = [
  { id: 1, name: "Item 1", status: "Active", amount: 100 },
  { id: 2, name: "Item 2", status: "Inactive", amount: 200 },
  { id: 3, name: "Item 3", status: "Active", amount: 150 },
  { id: 4, name: "Item 4", status: "Pending", amount: 300 },
  { id: 5, name: "Item 5", status: "Active", amount: 250 },
];

const columns: ColumnDef<TestData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

const sortableColumns: ColumnDef<TestData>[] = [
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
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableSorting: true,
  },
];

// Helper to extract amounts from current table state
const getAmountsFromTable = () => {
  const rows = screen.getAllByRole("row").slice(1); // Skip header
  return rows.map((row) => {
    const cells = row.querySelectorAll('[role="cell"]');
    return parseInt(cells[3]?.textContent || "0", 10);
  });
};

describe("DataTable", () => {
  it("renders table with data", () => {
    render(<DataTable columns={columns} data={mockData} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(<DataTable columns={columns} data={mockData} />);

    expect(
      screen.getByRole("columnheader", { name: /ID/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Status/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Amount/i })
    ).toBeInTheDocument();
  });

  it("displays all rows", () => {
    render(<DataTable columns={columns} data={mockData} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(6); // 1 header + 5 data rows
  });

  it("shows loading state", () => {
    render(<DataTable columns={columns} data={[]} loading />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("shows empty state when no data", () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("shows custom empty message", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyMessage="No items available"
      />
    );

    expect(screen.getByText("No items available")).toBeInTheDocument();
  });

  it("enables sorting on sortable columns", async () => {
    const user = userEvent.setup();

    render(<DataTable columns={sortableColumns} data={mockData} />);

    const nameHeader = screen.getByRole("columnheader", { name: /Name/i });
    expect(nameHeader).toHaveAttribute("aria-sort", "none");

    await user.click(nameHeader);

    await waitFor(() => {
      expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
    });

    await user.click(nameHeader);

    await waitFor(() => {
      expect(nameHeader).toHaveAttribute("aria-sort", "descending");
    });
  });

  it("does not sort non-sortable columns", async () => {
    const user = userEvent.setup();

    render(<DataTable columns={sortableColumns} data={mockData} />);

    const statusHeader = screen.getByRole("columnheader", { name: /Status/i });
    expect(statusHeader).not.toHaveAttribute("tabIndex");

    await user.click(statusHeader);

    expect(statusHeader).toHaveAttribute("aria-sort", "none");
  });

  it("supports keyboard navigation for sorting", async () => {
    const user = userEvent.setup();

    render(<DataTable columns={sortableColumns} data={mockData} />);

    const nameHeader = screen.getByRole("columnheader", { name: /Name/i });
    nameHeader.focus();

    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
    });

    await user.keyboard(" ");

    await waitFor(() => {
      expect(nameHeader).toHaveAttribute("aria-sort", "descending");
    });
  });

  it("renders pagination when enabled", () => {
    const largeData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      status: "Active",
      amount: (i + 1) * 100,
    }));

    render(<DataTable columns={columns} data={largeData} pagination />);

    expect(
      screen.getByRole("navigation", { name: /Pagination/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Showing 1-10 of 50 results/i)).toBeInTheDocument();
  });

  it("hides pagination when disabled", () => {
    render(<DataTable columns={columns} data={mockData} pagination={false} />);

    expect(
      screen.queryByRole("navigation", { name: /Pagination/i })
    ).not.toBeInTheDocument();
  });

  it("changes page when pagination is clicked", async () => {
    const user = userEvent.setup();
    const largeData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      status: "Active",
      amount: (i + 1) * 100,
    }));

    render(<DataTable columns={columns} data={largeData} pageSize={10} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 11")).not.toBeInTheDocument();

    const nextButton = screen.getByLabelText("Go to next page");
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
      expect(screen.getByText("Item 11")).toBeInTheDocument();
    });
  });

  it("respects custom page size", () => {
    const largeData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      status: "Active",
      amount: (i + 1) * 100,
    }));

    render(<DataTable columns={columns} data={largeData} pageSize={5} />);

    expect(screen.getByText(/Showing 1-5 of 50 results/i)).toBeInTheDocument();
    expect(screen.getByText("Item 5")).toBeInTheDocument();
    expect(screen.queryByText("Item 6")).not.toBeInTheDocument();
  });

  it("calls onSortingChange when sorting changes", async () => {
    const user = userEvent.setup();
    const handleSortingChange = vi.fn();

    render(
      <DataTable
        columns={sortableColumns}
        data={mockData}
        onSortingChange={handleSortingChange}
      />
    );

    const nameHeader = screen.getByRole("columnheader", { name: /Name/i });
    await user.click(nameHeader);

    await waitFor(() => {
      expect(handleSortingChange).toHaveBeenCalledWith([
        { id: "name", desc: false },
      ]);
    });
  });

  it("calls onPaginationChange when page changes", async () => {
    const user = userEvent.setup();
    const handlePaginationChange = vi.fn();

    const largeData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      status: "Active",
      amount: (i + 1) * 100,
    }));

    render(
      <DataTable
        columns={columns}
        data={largeData}
        onPaginationChange={handlePaginationChange}
      />
    );

    const nextButton = screen.getByLabelText("Go to next page");
    await user.click(nextButton);

    await waitFor(() => {
      expect(handlePaginationChange).toHaveBeenCalled();
    });
  });

  it("applies custom className", () => {
    render(
      <DataTable columns={columns} data={mockData} className="custom-table" />
    );

    const container =
      screen.getByRole("table").parentElement?.parentElement?.parentElement;
    expect(container).toHaveClass("custom-table");
  });

  it("applies row className", () => {
    render(
      <DataTable columns={columns} data={mockData} rowClassName="custom-row" />
    );

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveClass("custom-row");
  });

  it("applies dynamic row className based on data", () => {
    render(
      <DataTable
        columns={columns}
        data={mockData}
        rowClassName={(row) => (row.status === "Active" ? "active-row" : "")}
      />
    );

    const rows = screen.getAllByRole("row");
    const firstDataRow = rows[1];
    expect(firstDataRow).toHaveClass("active-row");
  });

  it("handles large datasets", () => {
    const largeData = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      status: i % 2 === 0 ? "Active" : "Inactive",
      amount: (i + 1) * 100,
    }));

    render(<DataTable columns={columns} data={largeData} pageSize={10} />);

    expect(
      screen.getByText(/Showing 1-10 of 1000 results/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<DataTable columns={columns} data={mockData} />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(4);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(6);
  });

  it("shows hover state on rows", () => {
    render(<DataTable columns={columns} data={mockData} />);

    const rows = screen.getAllByRole("row");
    const firstDataRow = rows[1];
    expect(firstDataRow).toHaveClass("hover:bg-muted/50");
  });

  it("handles empty data gracefully", () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: /Pagination/i })
    ).not.toBeInTheDocument();
  });
});
