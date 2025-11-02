import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
      hasError: {
        true: "border-destructive focus-visible:ring-destructive",
        false: "",
      },
    },
    defaultVariants: {
      resize: "vertical",
      hasError: false,
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "children">,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      containerClassName,
      id,
      disabled,
      resize,
      autoResize = false,
      minRows = 3,
      maxRows,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const hasError = !!error;

    const describedBy = [errorId, helperId].filter(Boolean).join(" ");

    const innerRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current!);

    const adjustHeight = React.useCallback(() => {
      const textarea = innerRef.current;
      if (!textarea || !autoResize) return;

      textarea.style.height = "auto";

      const lineHeight = parseInt(
        window.getComputedStyle(textarea).lineHeight,
        10
      );
      const paddingTop = parseInt(
        window.getComputedStyle(textarea).paddingTop,
        10
      );
      const paddingBottom = parseInt(
        window.getComputedStyle(textarea).paddingBottom,
        10
      );

      const minHeight = lineHeight * minRows + paddingTop + paddingBottom;
      const maxHeight = maxRows
        ? lineHeight * maxRows + paddingTop + paddingBottom
        : Infinity;

      const newHeight = Math.min(
        Math.max(textarea.scrollHeight, minHeight),
        maxHeight
      );

      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [autoResize, minRows, maxRows]);

    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight, value, defaultValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        adjustHeight();
      }
      onChange?.(e);
    };

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "mb-1.5 block text-sm font-normal",
              disabled && "opacity-50",
              hasError && "text-destructive"
            )}
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          className={cn(
            textareaVariants({
              resize: autoResize ? "none" : resize,
              hasError,
            }),
            className
          )}
          ref={innerRef}
          disabled={disabled}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={describedBy || undefined}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          rows={autoResize ? minRows : undefined}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-xs text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
