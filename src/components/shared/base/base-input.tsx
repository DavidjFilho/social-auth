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
        {...props}
      />
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {React.createElement(icon, { className: "size-4" })}
          </span>
        )}

        <Input
          id={id}
          placeholder={placeholder}
          type={type}
          className={cn({ "pl-10": icon }, className)}
          {...props}
        />
      </div>
    </div>
  );
}

function PasswordInput({
  id,
  label,
  placeholder,
  icon,
  className,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {React.createElement(icon, { className: "size-4" })}
          </span>
        )}

        <Input
          id={id}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          className={cn(`pr-10`, { "pl-10": icon }, className)}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
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
