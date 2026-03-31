import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";

type OtpInputProps = {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
};

export function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  function updateOtpAt(index: number, inputValue: string) {
    const sanitized = inputValue.replace(/\D/g, "").slice(-1);
    const nextOtp = [...value];
    nextOtp[index] = sanitized;
    onChange(nextOtp);

    if (sanitized && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace") {
      if (value[index]) {
        const nextOtp = [...value];
        nextOtp[index] = "";
        onChange(nextOtp);
        return;
      }

      if (index > 0) {
        const nextOtp = [...value];
        nextOtp[index - 1] = "";
        onChange(nextOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pastedDigits) return;

    const nextOtp = Array.from({ length }, (_, index) => {
      return pastedDigits[index] ?? "";
    });

    onChange(nextOtp);

    const lastFilledIndex = Math.min(pastedDigits.length, length) - 1;
    if (lastFilledIndex >= 0) {
      inputRefs.current[lastFilledIndex]?.focus();
    }
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(node) => {
            inputRefs.current[index] = node;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={value[index] ?? ""}
          onChange={(e) => updateOtpAt(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="h-14.5 w-14.5 rounded-[12px] border border-slate-200 bg-white text-center text-[22px] font-semibold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      ))}
    </div>
  );
}
