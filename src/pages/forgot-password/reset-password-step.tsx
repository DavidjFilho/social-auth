import { Link } from "react-router";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BaseInput } from "@/components/shared/base/base-input";

type ResetPasswordStepProps = {
  password: string;
  confirmPassword: string;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  onSubmit: () => void;
};

export function ResetPasswordStep({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  onSubmit,
}: ResetPasswordStepProps) {
  const isPasswordValid = password.trim().length >= 6;
  const isConfirmValid = confirmPassword.trim().length >= 6;
  const doPasswordsMatch = password === confirmPassword;
  const canSubmit = isPasswordValid && isConfirmValid && doPasswordsMatch;

  return (
    <div className="mx-auto flex max-w-130 flex-col items-center text-center">
      <div className="mb-8 flex size-23 items-center justify-center rounded-full bg-emerald-50">
        <LockKeyhole className="size-10 text-emerald-500" />
      </div>

      <h1 className="mb-4 text-[34px] font-bold leading-tight text-slate-900 md:text-[38px]">
        Crie uma nova senha
      </h1>

      <p className="mb-10 max-w-117.5 text-[18px] leading-8 text-slate-500">
        Digite sua nova senha e confirme para concluir a recuperação da conta.
      </p>

      <form
        className="w-full space-y-5 text-left"
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSubmit) return;
          onSubmit();
        }}
      >
        <BaseInput
          id="new-password"
          label="Nova senha"
          type="password"
          useShowPasswordToggle
          labelIsFloating
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-14.5"
        />

        <BaseInput
          id="confirm-password"
          label="Confirmar nova senha"
          type="password"
          useShowPasswordToggle
          labelIsFloating
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="h-14.5"
        />

        {confirmPassword.length > 0 && !doPasswordsMatch && (
          <p className="text-sm text-red-500">As senhas não coincidem.</p>
        )}

        <Button
          disabled={!canSubmit}
          className="h-13.5 w-full rounded-[12px] bg-emerald-600 text-[18px] font-semibold hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-50"
        >
          Redefinir Senha
        </Button>

        <Link
          to="/"
          className="block text-center text-[18px] text-slate-500 transition hover:text-slate-700 hover:underline"
        >
          Voltar para login
        </Link>
      </form>
    </div>
  );
}
