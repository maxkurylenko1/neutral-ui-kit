import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../pagination";

describe("Pagination", () => {
  const defaultProps = {
    total: 100,
    page: 1,
    pageSize: 10,
    onPageChange: vi.fn(),
  };

  it("renders pagination navigation", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByLabelText("Pagination")).toBeInTheDocument();
  });

  it("does not render when total pages is 1 or less", () => {
    render(<Pagination {...defaultProps} total={5} pageSize={10} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders first and last buttons by default", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Last")).toBeInTheDocument();
  });

  it("hides first and last buttons when showFirstLast is false", () => {
    render(<Pagination {...defaultProps} showFirstLast={false} />);
    expect(screen.queryByText("First")).not.toBeInTheDocument();
    expect(screen.queryByText("Last")).not.toBeInTheDocument();
  });

  it("renders prev and next buttons by default", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
  });

  it("hides prev and next buttons when showPrevNext is false", () => {
    render(<Pagination {...defaultProps} showPrevNext={false} />);
    expect(
      screen.queryByLabelText("Go to previous page")
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Go to next page")).not.toBeInTheDocument();
  });

  it("calculates total pages correctly", () => {
    render(<Pagination {...defaultProps} total={95} pageSize={10} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("disables first and prev buttons on first page", () => {
    render(<Pagination {...defaultProps} page={1} />);
    expect(screen.getByText("First")).toBeDisabled();
    expect(screen.getByLabelText("Go to previous page")).toBeDisabled();
  });

  it("disables last and next buttons on last page", () => {
    render(<Pagination {...defaultProps} page={10} />);
    expect(screen.getByText("Last")).toBeDisabled();
    expect(screen.getByLabelText("Go to next page")).toBeDisabled();
  });

  it("calls onPageChange when clicking a page number", async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(<Pagination {...defaultProps} onPageChange={handlePageChange} />);

    await user.click(screen.getByText("2"));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when clicking next button", async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(<Pagination {...defaultProps} onPageChange={handlePageChange} />);

    await user.click(screen.getByLabelText("Go to next page"));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when clicking prev button", async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination {...defaultProps} page={3} onPageChange={handlePageChange} />
    );

    await user.click(screen.getByLabelText("Go to previous page"));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when clicking first button", async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination {...defaultProps} page={5} onPageChange={handlePageChange} />
    );

    await user.click(screen.getByText("First"));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange when clicking last button", async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(<Pagination {...defaultProps} onPageChange={handlePageChange} />);

    await user.click(screen.getByText("Last"));
    expect(handlePageChange).toHaveBeenCalledWith(10);
  });

  it("highlights current page", () => {
    render(<Pagination {...defaultProps} page={3} />);
    const currentPage = screen.getByText("3");
    expect(currentPage).toHaveClass("bg-primary");
    expect(currentPage).toHaveAttribute("aria-current", "page");
  });

  it("does not call onPageChange when clicking current page", async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination {...defaultProps} page={3} onPageChange={handlePageChange} />
    );

    await user.click(screen.getByText("3"));
    expect(handlePageChange).not.toHaveBeenCalled();
  });

  it("shows ellipsis for large page counts", () => {
    render(
      <Pagination {...defaultProps} total={200} page={10} pageSize={10} />
    );
    const ellipsis = screen.getAllByText((content, element) => {
      return !!(
        element &&
        element.querySelector("svg") !== null &&
        element.tagName === "SPAN"
      );
    });
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it("renders correct page numbers with siblingCount", () => {
    render(
      <Pagination
        {...defaultProps}
        total={200}
        page={10}
        pageSize={10}
        siblingCount={2}
      />
    );
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Pagination {...defaultProps} className="custom-class" />);
    expect(screen.getByRole("navigation")).toHaveClass("custom-class");
  });

  it("supports keyboard navigation", async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(<Pagination {...defaultProps} onPageChange={handlePageChange} />);

    const page2Button = screen.getByText("2");
    page2Button.focus();
    await user.keyboard("{Enter}");

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it("has proper aria labels", () => {
    render(<Pagination {...defaultProps} page={5} />);

    expect(screen.getByLabelText("Pagination")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to first page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to last page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to page 5")).toBeInTheDocument();
  });

  it("shows all pages when total is small", () => {
    render(<Pagination {...defaultProps} total={50} pageSize={10} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("shows correct range at start", () => {
    render(<Pagination {...defaultProps} total={200} page={1} pageSize={10} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows correct range at end", () => {
    render(
      <Pagination {...defaultProps} total={200} page={20} pageSize={10} />
    );

    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.getByText("19")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("shows correct range in middle", () => {
    render(
      <Pagination {...defaultProps} total={200} page={10} pageSize={10} />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("does not allow navigation beyond bounds", async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <Pagination {...defaultProps} page={1} onPageChange={handlePageChange} />
    );

    const prevButton = screen.getByLabelText("Go to previous page");
    await user.click(prevButton);
    expect(handlePageChange).not.toHaveBeenCalled();

    rerender(
      <Pagination {...defaultProps} page={10} onPageChange={handlePageChange} />
    );

    const nextButton = screen.getByLabelText("Go to next page");
    await user.click(nextButton);
    expect(handlePageChange).not.toHaveBeenCalled();
  });

  it("handles different page sizes correctly", () => {
    const { rerender } = render(<Pagination {...defaultProps} pageSize={20} />);
    expect(screen.getByText("5")).toBeInTheDocument();

    rerender(<Pagination {...defaultProps} pageSize={5} />);
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});
