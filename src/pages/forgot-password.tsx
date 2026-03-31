import { Link } from "react-router";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { PhoneStep } from "./forgot-password/phone-step";
import { CodeStep } from "./forgot-password/code-step";

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
    return phone;
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

    // depois aqui você pode chamar sua API de reenvio
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#dfe4ec] px-4 py-10">
      <div className="relative w-full max-w-155 rounded-[20px] bg-white px-8 py-10 shadow-[0_8px_24px_rgba(15,23,42,0.08)] md:px-12 md:py-12">
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
