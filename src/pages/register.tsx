import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "./auth-layout";
import { SocialLoginPanel } from "./social-login-painel";
import { BaseInput } from "@/components/shared/base/base-input";

type RegisterFormData = {
  email: string;
  confirmEmail: string;
  cpf: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
      confirmEmail: "",
      cpf: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: RegisterFormData) {
    console.log(data);
  }

  return (
    <AuthLayout
      minHeight="min-h-[520px]"
      leftContent={
        <>
          <p className="text-xs text-muted-foreground mb-2">Crie sua conta</p>

          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            Faça seu cadastro
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <BaseInput
              id="email"
              label="Seu e-mail"
              type="email"
              placeholder="Digite seu e-mail"
              labelIsFloating
              {...register("email")}
            />

            <BaseInput
              id="confirmEmail"
              label="Confirme seu e-mail"
              type="email"
              labelIsFloating
              {...register("confirmEmail")}
            />

            <BaseInput
              id="cpf"
              label="CPF"
              labelIsFloating
              mask="999.999.999-99"
              {...register("cpf")}
            />
            <BaseInput
              id="phone"
              label="telefone"
              labelIsFloating
              mask="(99) 99999-9999"
              {...register("phone")}
            />

            <BaseInput
              id="password"
              label="Senha"
              type="password"
              useShowPasswordToggle
              labelIsFloating
              {...register("password")}
            />

            <BaseInput
              id="confirmPassword"
              label="Confirme sua senha"
              type="password"
              useShowPasswordToggle
              labelIsFloating
              {...register("confirmPassword")}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <p className="text-center text-sm text-slate-600 pt-2">
              Já tem conta?{" "}
              <Link to="/" className="text-emerald-600 hover:underline">
                Faça login
              </Link>
            </p>
          </form>
        </>
      }
      rightContent={
        <SocialLoginPanel topText="Você também pode" title="Entrar com:" />
      }
    />
  );
}
