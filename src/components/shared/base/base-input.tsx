import { withMask } from "use-mask-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import React, { useState } from "react";

type Props = BaseInputProps &
  BaseInputPasswordProps &
  React.InputHTMLAttributes<HTMLInputElement>;

type BaseInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  icon?: LucideIcon;
  labelIsFloating?: boolean;
  mask?: string;
};

type BaseInputPasswordProps = BaseInputProps & {
  useShowPasswordToggle?: boolean;
};

export function BaseInput({
  id,
  label,
  placeholder,
  type = "text",
  useShowPasswordToggle,
  icon,
  className,
  labelIsFloating = false,
  mask = "",
  ...props
}: Props) {
  if (type === "password" && useShowPasswordToggle) {
    return (
      <PasswordInput
        id={id}
        label={label}
        placeholder={placeholder}
        icon={icon}
        className={className}
        labelIsFloating={labelIsFloating}
        {...props}
      />
    );
  }

  const hasIcon = Boolean(icon);
  const inputPlaceholder = labelIsFloating ? " " : placeholder;

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
          type={type}
          className={cn("peer", { "pl-10": hasIcon }, className)}
          ref={withMask(mask, {
            placeholder: "_",
            showMaskOnHover: false,
          })}
          {...props}
        />
        <InputFloatingLabel
          id={id}
          label={label}
          hasIcon={hasIcon}
          isFloating={labelIsFloating}
        />
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

function PasswordInput({
  id,
  label,
  placeholder,
  icon,
  className,
  labelIsFloating = false,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const hasIcon = Boolean(icon);
  const inputPlaceholder = labelIsFloating ? " " : placeholder;

  return (
    <div className="space-y-2">
      {!labelIsFloating && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2  z-10 -translate-y-1/2 text-slate-400">
            {React.createElement(icon, { className: "size-4" })}
          </span>
        )}

        <Input
          id={id}
          placeholder={inputPlaceholder}
          type={showPassword ? "text" : "password"}
          className={cn(
            "peer pr-10",
            {
              "pl-10": hasIcon,
            },
            className,
          )}
          {...props}
        />

        <InputFloatingLabel
          id={id}
          label={label}
          hasIcon={hasIcon}
          isFloating={labelIsFloating}
        />

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
      </div>
    </div>
  );
}
