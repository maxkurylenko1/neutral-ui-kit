import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "checked"
  > {
  label?: string;
  description?: string;
  error?: string;
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  containerClassName?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      label,
      description,
      error,
      disabled,
      id,
      checked,
      onCheckedChange,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || React.useId();
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    const errorId = error ? `${checkboxId}-error` : undefined;
    const hasError = !!error;

    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");

    // Wrap the checkbox in a container if we have label or description
    if (label || description) {
      return (
        <div className={cn("flex flex-col gap-2", containerClassName)}>
          <div className="flex items-start gap-3">
            <CheckboxPrimitive.Root
              ref={ref}
              id={checkboxId}
              className={cn(
                "peer h-5 w-5 shrink-0 rounded border border-input bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
                hasError && "border-destructive",
                className
              )}
              disabled={disabled}
              checked={checked}
              onCheckedChange={onCheckedChange}
              aria-describedby={describedBy || undefined}
              aria-invalid={hasError ? "true" : undefined}
              {...props}
            >
              <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                {checked === "indeterminate" ? (
                  <Minus className="h-3.5 w-3.5" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>

            <div className="flex flex-col gap-1">
              <label
                htmlFor={checkboxId}
                className={cn(
                  "text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  !disabled && "cursor-pointer",
                  hasError && "text-destructive"
                )}
              >
                {label}
              </label>

              {description && (
                <p
                  id={descriptionId}
                  className={cn(
                    "text-xs text-muted-foreground",
                    disabled && "opacity-50"
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {error && (
            <p
              id={errorId}
              className="text-xs text-destructive pl-8"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );
    }

    // Standalone checkbox without label
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded border border-input bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
          hasError && "border-destructive",
          className
        )}
        disabled={disabled}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-describedby={describedBy || undefined}
        aria-invalid={hasError ? "true" : undefined}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          {checked === "indeterminate" ? (
            <Minus className="h-3.5 w-3.5" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
