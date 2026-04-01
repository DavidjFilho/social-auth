import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import React, { useImperativeHandle, useRef, useState } from "react";
import { withMask } from "use-mask-input";

type Props = BaseInputProps & React.InputHTMLAttributes<HTMLInputElement>;

type BaseInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  icon?: LucideIcon;
  labelIsFloating?: boolean;
  useShowPasswordToggle?: boolean;
  mask?: string;
  error?: string;
};

export const BaseInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      placeholder,
      type = "text",
      icon,
      className,
      labelIsFloating = false,
      useShowPasswordToggle = false,
      mask,
      error,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const innerRef = useRef<HTMLInputElement | null>(null);

    const hasIcon = Boolean(icon);
    const isPasswordWithToggle = type === "password" && useShowPasswordToggle;

    const inputType = isPasswordWithToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    const inputPlaceholder = labelIsFloating ? " " : placeholder;

    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

    const handleInputRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;

      if (!isPasswordWithToggle && mask && node) {
        withMask(mask, {
          placeholder: "_",
          showMaskOnHover: false,
        })(node);
      }

      if (typeof ref === "function") {
        ref(node);
      }
    };

    return (
      <div className="space-y-1">
        {!labelIsFloating && <Label htmlFor={id}>{label}</Label>}

        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {React.createElement(icon, { className: "size-4" })}
            </span>
          )}

          <Input
            id={id}
            placeholder={inputPlaceholder}
            type={inputType}
            aria-invalid={!!error}
            className={cn(
              "peer",
              {
                "pl-10": hasIcon,
                "pr-10": isPasswordWithToggle,
                "border-red-500 focus-visible:ring-red-500": !!error,
              },
              className,
            )}
            ref={handleInputRef}
            {...props}
          />

          {labelIsFloating && (
            <Label
              htmlFor={id}
              className={cn(
                "pointer-events-none absolute transition-all duration-200",
                "top-1/2 -translate-y-1/2 text-sm",
                "peer-focus:top-0 peer-focus:text-xs",
                "peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs",
                hasIcon ? "left-10" : "left-3",
                error ? "text-red-500" : "text-slate-500",
              )}
            >
              {label}
            </Label>
          )}

          {isPasswordWithToggle && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

BaseInput.displayName = "BaseInput";
