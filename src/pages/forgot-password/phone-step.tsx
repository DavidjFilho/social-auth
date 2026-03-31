import type { ChangeEvent } from "react";
import { Link } from "react-router";
import { MessageSquareMore } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PhoneField } from "@/components/forgot-password/phone-field";

type PhoneStepProps = {
  phone: string;
  setPhone: (value: string) => void;
  onNext: () => void;
};

export function PhoneStep({ phone, setPhone, onNext }: PhoneStepProps) {
  const phoneDigits = getDigits(phone);
  const isPhoneValid = phoneDigits.length === 13;

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const digits = getDigits(event.target.value);
    setPhone(formatBrazilPhone(digits));
  }

  return (
    <div className="mx-auto flex max-w-130 flex-col items-center text-center">
      <div className="mb-8 flex size-23 items-center justify-center rounded-full bg-emerald-50">
        <MessageSquareMore className="size-10 text-emerald-500" />
      </div>

      <h1 className="mb-4 text-[34px] font-bold leading-tight text-slate-900 md:text-[38px]">
        Esqueceu sua senha?
      </h1>

      <p className="mb-10 max-w-115 text-[18px] leading-8 text-slate-500">
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
        <PhoneField value={phone} onChange={handlePhoneChange} />

        <Button
          disabled={!isPhoneValid}
          className="h-13.5 w-full rounded-[12px] bg-emerald-600 text-[18px] font-semibold hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-50"
        >
          Enviar Código
        </Button>

        <Link
          to="/"
          className="block text-center text-[18px] text-slate-500 transition hover:text-slate-700 hover:underline"
        >
          Cancelar
        </Link>
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
