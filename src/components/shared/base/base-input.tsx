import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import React, { useState } from "react";
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
};

export function BaseInput({
  id,
  label,
  placeholder,
  type = "text",
  icon,
  className,
  labelIsFloating = false,
  useShowPasswordToggle = false,
  mask,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const hasIcon = Boolean(icon);
  const isPasswordWithToggle = type === "password" && useShowPasswordToggle;
  const inputType = isPasswordWithToggle
    ? showPassword
      ? "text"
      : "password"
    : type;
  const inputPlaceholder = labelIsFloating ? " " : placeholder;

  const { ref: registerRef, ...inputProps } = props;

  const handleInputRef = (node: HTMLInputElement | null) => {
    if (!isPasswordWithToggle && mask && node) {
      withMask(mask, {
        placeholder: "_",
        showMaskOnHover: false,
      })(node);
    }

    if (typeof registerRef === "function") {
      registerRef(node);
    } else if (registerRef && typeof registerRef === "object") {
      (registerRef as React.MutableRefObject<HTMLInputElement | null>).current =
        node;
    }
  };

  return (
    <div className="space-y-2">
      {!labelIsFloating && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
            {React.createElement(icon, { className: "size-4" })}
          </span>
        )}

        <Input
          id={id}
          placeholder={inputPlaceholder}
          type={inputType}
          className={cn(
            "peer",
            {
              "pl-10": hasIcon,
              "pr-10": isPasswordWithToggle,
            },
            className,
          )}
          ref={handleInputRef}
          {...inputProps}
        />

        <InputFloatingLabel
          id={id}
          label={label}
          hasIcon={hasIcon}
          isFloating={labelIsFloating}
        />

        {isPasswordWithToggle && (
          <button
            tabIndex={-1}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-slate-500 hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function InputFloatingLabel({
  id,
  label,
  hasIcon,
  isFloating,
}: {
  id: string;
  label: string;
  hasIcon: boolean;
  isFloating: boolean;
}) {
  if (!isFloating || !label) return null;

  return (
    <Label
      htmlFor={id}
      className={cn(
        "pointer-events-none absolute z-20 transition-all duration-200",
        "top-1/2 -translate-y-1/2 text-sm text-slate-500",
        "peer-focus:top-0 peer-focus:text-xs peer-focus:font-medium",
        "peer-focus:bg-background peer-focus:px-1",
        "peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-medium",
        "peer-not-placeholder-shown:bg-background peer-not-placeholder-shown:px-1",
        hasIcon
          ? "left-10 peer-focus:left-5 peer-not-placeholder-shown:left-5"
          : "left-3 peer-focus:left-3 peer-not-placeholder-shown:left-3",
      )}
    >
      {label}
    </Label>
  );
}
