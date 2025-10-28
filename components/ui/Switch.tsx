import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  description?: string;
  error?: string;
  containerClassName?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      label,
      description,
      error,
      disabled,
      id,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const switchId = id || React.useId();
    const descriptionId = description ? `${switchId}-description` : undefined;
    const errorId = error ? `${switchId}-error` : undefined;
    const hasError = !!error;

    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");

    // Wrap the switch in a container if we have label or description
    if (label || description) {
      return (
        <div className={cn("flex flex-col gap-1.5", containerClassName)}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor={switchId}
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

            <SwitchPrimitive.Root
              ref={ref}
              id={switchId}
              className={cn(
                "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input self-start",
                hasError && "data-[state=unchecked]:bg-destructive/20",
                className
              )}
              disabled={disabled}
              aria-describedby={describedBy || undefined}
              aria-invalid={hasError ? "true" : undefined}
              {...props}
            >
              <SwitchPrimitive.Thumb
                className={cn(
                  "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                )}
              />
            </SwitchPrimitive.Root>
          </div>

          {error && (
            <p id={errorId} className="text-xs text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      );
    }

    // Standalone switch without label
    return (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
          hasError && "data-[state=unchecked]:bg-destructive/20",
          className
        )}
        disabled={disabled}
        aria-describedby={describedBy || undefined}
        aria-invalid={hasError ? "true" : undefined}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
          )}
        />
      </SwitchPrimitive.Root>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
