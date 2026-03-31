import type { ChangeEvent } from "react";

type PhoneFieldProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function PhoneField({ value, onChange }: PhoneFieldProps) {
  const localNumber = value.replace(/^\+55\s?/, "");

  return (
    <div className="w-full text-left">
      <div className="flex h-14.5 w-full overflow-hidden rounded-[14px] border border-slate-200 bg-white transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
        <div className="flex min-w-20.5 items-center justify-center border-r border-slate-200 px-4 text-[18px] font-semibold text-slate-600">
          +55
        </div>

        <input
          type="tel"
          inputMode="numeric"
          placeholder="11 91234-5678"
          value={localNumber}
          onChange={onChange}
          className="flex-1 bg-transparent px-4 text-[18px] font-semibold text-slate-700 outline-none placeholder:font-normal placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
