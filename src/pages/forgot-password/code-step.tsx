import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/forgot-password/otp-input";

type CodeStepProps = {
  phone: string;
  otp: string[];
  setOtp: (value: string[]) => void;
  resendTimer: number;
  onResend: () => void;
};

export function CodeStep({
  phone,
  otp,
  setOtp,
  resendTimer,
  onResend,
}: CodeStepProps) {
  const isOtpComplete = otp.every((digit) => digit.trim() !== "");
  const resendDisabled = resendTimer > 0;

  useEffect(() => {
    // espaço reservado caso depois você queira auto foco no mount
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isOtpComplete) return;

    const code = otp.join("");

    console.log("Código verificado:", code);
  }

  return (
    <div className="mx-auto flex max-w-130 flex-col items-center text-center">
      <div className="mb-8 flex size-23 items-center justify-center rounded-full bg-emerald-50">
        <ShieldCheck className="size-10 text-emerald-500" />
      </div>

      <h1 className="mb-4 text-[34px] font-bold leading-tight text-slate-900 md:text-[38px]">
        Confirme seu código
      </h1>

      <p className="mb-10 max-w-117.5 text-[18px] leading-8 text-slate-500">
        Nós enviamos um código de 6 dígitos por SMS para:{" "}
        <span className="font-semibold text-slate-700">{phone}</span>
      </p>

      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <OtpInput value={otp} onChange={setOtp} />

        <Button
          disabled={!isOtpComplete}
          className="h-13.5 w-full rounded-[12px] bg-emerald-600 text-[18px] font-semibold hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-50"
        >
          Verificar Código
        </Button>

        <button
          type="button"
          onClick={onResend}
          disabled={resendDisabled}
          className="text-[18px] text-sky-600 transition hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
        >
          {resendDisabled
            ? `Reenviar código (${resendTimer}s)`
            : "Reenviar código"}
        </button>
      </form>
    </div>
  );
}
