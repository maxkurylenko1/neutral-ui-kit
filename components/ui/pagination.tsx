import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  siblingCount?: number;
  className?: string;
}

const Pagination = ({
  total,
  page,
  pageSize,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  siblingCount = 1,
  className,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    onPageChange(newPage);
  };

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "dots", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, "dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
    }

    return [];
  }, [page, siblingCount, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1", className)}
    >
      {showFirstLast && (
        <PaginationButton
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          aria-label="Go to first page"
        >
          First
        </PaginationButton>
      )}

      {showPrevNext && (
        <PaginationButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </PaginationButton>
      )}

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "dots") {
          return (
            <PaginationEllipsis key={`dots-${index}`} aria-hidden="true" />
          );
        }

        return (
          <PaginationButton
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber as number)}
            isActive={pageNumber === page}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={pageNumber === page ? "page" : undefined}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}

      {showPrevNext && (
        <PaginationButton
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </PaginationButton>
      )}

      {showFirstLast && (
        <PaginationButton
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          aria-label="Go to last page"
        >
          Last
        </PaginationButton>
      )}
    </nav>
  );
};

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const PaginationButton = React.forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(({ className, isActive = false, disabled, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50",
      isActive
        ? "bg-primary text-primary-foreground hover:bg-primary/90"
        : "hover:bg-accent hover:text-accent-foreground",
      className
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
));
PaginationButton.displayName = "PaginationButton";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export { Pagination, PaginationButton, PaginationEllipsis };
