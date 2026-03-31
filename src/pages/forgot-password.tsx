import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { MessageSquareMore, ShieldCheck, X } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ClipboardEvent,
  type ChangeEvent,
} from "react";

type Step = "phone" | "code";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 50;

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);

  const formattedPhone = useMemo(() => {
    if (!phone.trim()) return "+55 11 91234-5678";
    return formatBrazilPhone(phone);
  }, [phone]);

  useEffect(() => {
    if (step !== "code") return;
    if (resendTimer <= 0) return;

    const timer = window.setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step, resendTimer]);

  function handleNextStep() {
    setOtp(Array(OTP_LENGTH).fill(""));
    setResendTimer(RESEND_SECONDS);
    setStep("code");
  }

  function handleResendCode() {
    if (resendTimer > 0) return;

    setOtp(Array(OTP_LENGTH).fill(""));
    setResendTimer(RESEND_SECONDS);

    // aqui depois você chama sua API de reenvio
    // await resendSmsCode(phone)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#dfe4ec] px-4 py-10">
      <div className="relative w-full max-w-[620px] rounded-[20px] bg-white px-8 py-10 shadow-[0_8px_24px_rgba(15,23,42,0.08)] md:px-12 md:py-12">
        <Link
          to="/"
          className="absolute right-6 top-6 text-slate-400 transition hover:text-slate-600"
        >
          <X className="size-7" />
        </Link>

        {step === "phone" ? (
          <PhoneStep
            phone={phone}
            setPhone={setPhone}
            onNext={handleNextStep}
          />
        ) : (
          <CodeStep
            phone={formattedPhone}
            otp={otp}
            setOtp={setOtp}
            resendTimer={resendTimer}
            onResend={handleResendCode}
          />
        )}
      </div>
    </main>
  );
}

function PhoneStep({
  phone,
  setPhone,
  onNext,
}: {
  phone: string;
  setPhone: (value: string) => void;
  onNext: () => void;
}) {
  const phoneDigits = getDigits(phone);
  const isPhoneValid = phoneDigits.length === 13;

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const digits = getDigits(event.target.value);
    setPhone(formatBrazilPhone(digits));
  }

  return (
    <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
      <div className="mb-8 flex size-[92px] items-center justify-center rounded-full bg-emerald-50">
        <MessageSquareMore className="size-10 text-emerald-500" />
      </div>

      <h1 className="mb-4 text-[34px] font-bold leading-tight text-slate-900 md:text-[38px]">
        Esqueceu sua senha?
      </h1>

      <p className="mb-10 max-w-[460px] text-[18px] leading-8 text-slate-500">
        Digite o seu número de celular para enviar um código de verificação por
        SMS.
      </p>

      <form
        className="w-full space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!isPhoneValid) return;
          onNext();
        }}
      >
        <PhoneField phone={phone} onChange={handlePhoneChange} />

        <Button
          disabled={!isPhoneValid}
          className="h-[54px] w-full rounded-[12px] bg-emerald-600 text-[18px] font-semibold hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-50"
        >
          Enviar Código
        </Button>

        <Link
          to="/login"
          className="block text-center text-[18px] text-slate-500 transition hover:text-slate-700 hover:underline"
        >
          Cancelar
        </Link>
      </form>
    </div>
  );
}

function PhoneField({
  phone,
  onChange,
}: {
  phone: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const localNumber = phone.replace(/^\+55\s?/, "");

  return (
    <div className="w-full text-left">
      <div className="flex h-[58px] w-full overflow-hidden rounded-[14px] border border-slate-200 bg-white transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
        <div className="flex min-w-[82px] items-center justify-center border-r border-slate-200 px-4 text-[18px] font-semibold text-slate-600">
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

function CodeStep({
  phone,
  otp,
  setOtp,
  resendTimer,
  onResend,
}: {
  phone: string;
  otp: string[];
  setOtp: (value: string[]) => void;
  resendTimer: number;
  onResend: () => void;
}) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isOtpComplete = otp.every((digit) => digit.trim() !== "");
  const resendDisabled = resendTimer > 0;

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function updateOtpAt(index: number, value: string) {
    const sanitized = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = sanitized;
    setOtp(nextOtp);

    if (sanitized && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace") {
      if (otp[index]) {
        const nextOtp = [...otp];
        nextOtp[index] = "";
        setOtp(nextOtp);
        return;
      }

      if (index > 0) {
        const nextOtp = [...otp];
        nextOtp[index - 1] = "";
        setOtp(nextOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedDigits) return;

    const nextOtp = Array.from({ length: OTP_LENGTH }, (_, index) => {
      return pastedDigits[index] ?? "";
    });

    setOtp(nextOtp);

    const lastFilledIndex = Math.min(pastedDigits.length, OTP_LENGTH) - 1;
    if (lastFilledIndex >= 0) {
      inputRefs.current[lastFilledIndex]?.focus();
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isOtpComplete) return;

    const code = otp.join("");

    // aqui depois você chama sua API de validação
    // await verifySmsCode({ phone, code })
    console.log("Código verificado:", code);
  }

  return (
    <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
      <div className="mb-8 flex size-[92px] items-center justify-center rounded-full bg-emerald-50">
        <ShieldCheck className="size-10 text-emerald-500" />
      </div>

      <h1 className="mb-4 text-[34px] font-bold leading-tight text-slate-900 md:text-[38px]">
        Confirme seu código
      </h1>

      <p className="mb-10 max-w-[470px] text-[18px] leading-8 text-slate-500">
        Nós enviamos um código de 6 dígitos por SMS para:{" "}
        <span className="font-semibold text-slate-700">{phone}</span>
      </p>

      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <input
              key={index}
              ref={(node) => {
                inputRefs.current[index] = node;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={otp[index]}
              onChange={(e) => updateOtpAt(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="h-[58px] w-[58px] rounded-[12px] border border-slate-200 bg-white text-center text-[22px] font-semibold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          ))}
        </div>

        <Button
          disabled={!isOtpComplete}
          className="h-[54px] w-full rounded-[12px] bg-emerald-600 text-[18px] font-semibold hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-50"
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

function getDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatBrazilPhone(value: string) {
  const digits = getDigits(value).slice(0, 13);

  let result = "";

  if (digits.startsWith("55")) {
    const ddd = digits.slice(2, 4);
    const firstPart = digits.slice(4, 9);
    const secondPart = digits.slice(9, 13);

    result = "+55";

    if (ddd) result += ` ${ddd}`;
    if (firstPart) result += ` ${firstPart}`;
    if (secondPart) result += `-${secondPart}`;

    return result.trim();
  }

  const normalized = `55${digits}`.slice(0, 13);
  const ddd = normalized.slice(2, 4);
  const firstPart = normalized.slice(4, 9);
  const secondPart = normalized.slice(9, 13);

  result = "+55";

  if (ddd) result += ` ${ddd}`;
  if (firstPart) result += ` ${firstPart}`;
  if (secondPart) result += `-${secondPart}`;

  return result.trim();
}
